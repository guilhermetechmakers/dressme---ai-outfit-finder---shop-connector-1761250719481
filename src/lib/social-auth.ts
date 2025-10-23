// Social Authentication Service
// This service handles OAuth flows for Google, Apple, and Facebook

export interface SocialAuthConfig {
  google: {
    clientId: string;
    redirectUri: string;
  };
  apple: {
    clientId: string;
    redirectUri: string;
  };
  facebook: {
    appId: string;
    redirectUri: string;
  };
}

// Configuration from environment variables
const config: SocialAuthConfig = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/callback/google`,
  },
  apple: {
    clientId: import.meta.env.VITE_APPLE_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/callback/apple`,
  },
  facebook: {
    appId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
    redirectUri: `${window.location.origin}/auth/callback/facebook`,
  },
};

export class SocialAuthService {
  // Google OAuth
  static async initiateGoogleAuth(): Promise<void> {
    const params = new URLSearchParams({
      client_id: config.google.clientId,
      redirect_uri: config.google.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    window.location.href = authUrl;
  }

  // Apple OAuth
  static async initiateAppleAuth(): Promise<void> {
    const params = new URLSearchParams({
      client_id: config.apple.clientId,
      redirect_uri: config.apple.redirectUri,
      response_type: 'code',
      scope: 'name email',
      response_mode: 'form_post',
    });

    const authUrl = `https://appleid.apple.com/auth/authorize?${params.toString()}`;
    window.location.href = authUrl;
  }

  // Facebook OAuth
  static async initiateFacebookAuth(): Promise<void> {
    const params = new URLSearchParams({
      client_id: config.facebook.appId,
      redirect_uri: config.facebook.redirectUri,
      response_type: 'code',
      scope: 'email,public_profile',
      auth_type: 'rerequest',
    });

    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
    window.location.href = authUrl;
  }

  // Handle OAuth callback
  static async handleCallback(provider: 'google' | 'apple' | 'facebook', code: string): Promise<{ token: string; idToken?: string }> {
    try {
      const response = await fetch('/api/auth/social/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider,
          code,
          redirectUri: config[provider].redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error(`Social auth failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        token: data.accessToken,
        idToken: data.idToken,
      };
    } catch (error) {
      console.error('Social auth callback error:', error);
      throw error;
    }
  }

  // Check if social auth is available
  static isAvailable(provider: 'google' | 'apple' | 'facebook'): boolean {
    switch (provider) {
      case 'google':
        return !!config.google.clientId;
      case 'apple':
        return !!config.apple.clientId;
      case 'facebook':
        return !!config.facebook.appId;
      default:
        return false;
    }
  }
}

// Utility function to get URL parameters
export function getUrlParameter(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Utility function to get hash parameters (for some OAuth flows)
export function getHashParameter(name: string): string | null {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get(name);
}

// Check if we're in a social auth callback
export function isSocialAuthCallback(): { provider: string; code: string } | null {
  const path = window.location.pathname;
  const match = path.match(/^\/auth\/callback\/(google|apple|facebook)$/);
  
  if (match) {
    const provider = match[1];
    const code = getUrlParameter('code') || getHashParameter('code');
    
    if (code) {
      return { provider, code };
    }
  }
  
  return null;
}
