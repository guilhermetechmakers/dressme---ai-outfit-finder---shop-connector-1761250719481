import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Product } from '@/types';

// Query keys
const RECOMMENDATIONS_KEYS = {
  all: ['recommendations'] as const,
  dashboard: () => [...RECOMMENDATIONS_KEYS.all, 'dashboard'] as const,
  personalized: () => [...RECOMMENDATIONS_KEYS.all, 'personalized'] as const,
  trending: () => [...RECOMMENDATIONS_KEYS.all, 'trending'] as const,
  category: (category: string) => [...RECOMMENDATIONS_KEYS.all, 'category', category] as const,
};

// Fetch personalized recommendations for dashboard
export function useDashboardRecommendations() {
  return useQuery({
    queryKey: RECOMMENDATIONS_KEYS.dashboard(),
    queryFn: () => api.get<Product[]>('/recommendations/dashboard?limit=8'),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Fetch personalized recommendations based on user preferences
export function usePersonalizedRecommendations(filters?: {
  category?: string;
  priceRange?: { min: number; max: number };
  limit?: number;
}) {
  return useQuery({
    queryKey: [...RECOMMENDATIONS_KEYS.personalized(), filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters?.category) {
        params.append('category', filters.category);
      }
      if (filters?.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString());
        params.append('maxPrice', filters.priceRange.max.toString());
      }
      if (filters?.limit) {
        params.append('limit', filters.limit.toString());
      }

      const queryString = params.toString();
      const endpoint = queryString ? `/recommendations/personalized?${queryString}` : '/recommendations/personalized';
      
      return api.get<Product[]>(endpoint);
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
}

// Fetch trending products
export function useTrendingProducts(limit = 12) {
  return useQuery({
    queryKey: [...RECOMMENDATIONS_KEYS.trending(), limit],
    queryFn: () => api.get<Product[]>(`/recommendations/trending?limit=${limit}`),
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
}

// Fetch recommendations by category
export function useCategoryRecommendations(category: string, limit = 8) {
  return useQuery({
    queryKey: RECOMMENDATIONS_KEYS.category(category),
    queryFn: () => api.get<Product[]>(`/recommendations/category/${category}?limit=${limit}`),
    enabled: !!category,
    staleTime: 20 * 60 * 1000, // 20 minutes
    retry: 2,
  });
}

// Fetch similar products based on a specific product
export function useSimilarProducts(productId: string, limit = 6) {
  return useQuery({
    queryKey: [...RECOMMENDATIONS_KEYS.all, 'similar', productId, limit],
    queryFn: () => api.get<Product[]>(`/recommendations/similar/${productId}?limit=${limit}`),
    enabled: !!productId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
}