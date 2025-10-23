# Modern Design Best Practices

## Philosophy

Create unique, memorable experiences while maintaining consistency through modern design principles. Every project should feel distinct yet professional, innovative yet intuitive.

---

## Landing Pages & Marketing Sites

### Hero Sections
**Go beyond static backgrounds:**
- Animated gradients with subtle movement
- Particle systems or geometric shapes floating
- Interactive canvas backgrounds (Three.js, WebGL)
- Video backgrounds with proper fallbacks
- Parallax scrolling effects
- Gradient mesh animations
- Morphing blob animations


### Layout Patterns
**Use modern grid systems:**
- Bento grids (asymmetric card layouts)
- Masonry layouts for varied content
- Feature sections with diagonal cuts or curves
- Overlapping elements with proper z-index
- Split-screen designs with scroll-triggered reveals

**Avoid:** Traditional 3-column equal grids

### Scroll Animations
**Engage users as they scroll:**
- Fade-in and slide-up animations for sections
- Scroll-triggered parallax effects
- Progress indicators for long pages
- Sticky elements that transform on scroll
- Horizontal scroll sections for portfolios
- Text reveal animations (word by word, letter by letter)
- Number counters animating into view

**Avoid:** Static pages with no scroll interaction

### Call-to-Action Areas
**Make CTAs impossible to miss:**
- Gradient buttons with hover effects
- Floating action buttons with micro-interactions
- Animated borders or glowing effects
- Scale/lift on hover
- Interactive elements that respond to mouse position
- Pulsing indicators for primary actions

---

## Dashboard Applications

### Layout Structure
**Always use collapsible side navigation:**
- Sidebar that can collapse to icons only
- Smooth transition animations between states
- Persistent navigation state (remember user preference)
- Mobile: drawer that slides in/out
- Desktop: sidebar with expand/collapse toggle
- Icons visible even when collapsed

**Structure:**
```
/dashboard (layout wrapper with sidebar)
  /dashboard/overview
  /dashboard/analytics
  /dashboard/settings
  /dashboard/users
  /dashboard/projects
```

All dashboard pages should be nested inside the dashboard layout, not separate routes.

### Data Tables
**Modern table design:**
- Sticky headers on scroll
- Row hover states with subtle elevation
- Sortable columns with clear indicators
- Pagination with items-per-page control
- Search/filter with instant feedback
- Selection checkboxes with bulk actions
- Responsive: cards on mobile, table on desktop
- Loading skeletons, not spinners
- Empty states with illustrations or helpful text

**Use modern table libraries:**
- TanStack Table (React Table v8)
- AG Grid for complex data
- Data Grid from MUI (if using MUI)

### Charts & Visualizations
**Use the latest charting libraries:**
- Recharts (for React, simple charts)
- Chart.js v4 (versatile, well-maintained)
- Apache ECharts (advanced, interactive)
- D3.js (custom, complex visualizations)
- Tremor (for dashboards, built on Recharts)

**Chart best practices:**
- Animated transitions when data changes
- Interactive tooltips with detailed info
- Responsive sizing
- Color scheme matching design system
- Legend placement that doesn't obstruct data
- Loading states while fetching data

### Dashboard Cards
**Metric cards should stand out:**
- Gradient backgrounds or colored accents
- Trend indicators (↑ ↓ with color coding)
- Sparkline charts for historical data
- Hover effects revealing more detail
- Icon representing the metric
- Comparison to previous period

---

## Color & Visual Design

### Color Palettes
**Create depth with gradients:**
- Primary gradient (not just solid primary color)
- Subtle background gradients
- Gradient text for headings
- Gradient borders on cards
- Elevated surfaces for depth

**Color usage:**
- 60-30-10 rule (dominant, secondary, accent)
- Consistent semantic colors (success, warning, error)
- Accessible contrast ratios (WCAG AA minimum)

### Typography
**Create hierarchy through contrast:**
- Large, bold headings (48-72px for heroes)
- Clear size differences between levels
- Variable font weights (300, 400, 600, 700)
- Letter spacing for small caps
- Line height 1.5-1.7 for body text
- Inter, Poppins, or DM Sans for modern feel

### Shadows & Depth
**Layer UI elements:**
- Multi-layer shadows for realistic depth
- Colored shadows matching element color
- Elevated states on hover
- Neumorphism for special elements (sparingly)

---

## Interactions & Micro-animations

### Button Interactions
**Every button should react:**
- Scale slightly on hover (1.02-1.05)
- Lift with shadow on hover
- Ripple effect on click
- Loading state with spinner or progress
- Disabled state clearly visible
- Success state with checkmark animation

### Card Interactions
**Make cards feel alive:**
- Lift on hover with increased shadow
- Subtle border glow on hover
- Tilt effect following mouse (3D transform)
- Smooth transitions (200-300ms)
- Click feedback for interactive cards

### Form Interactions
**Guide users through forms:**
- Input focus states with border color change
- Floating labels that animate up
- Real-time validation with inline messages
- Success checkmarks for valid inputs
- Error states with shake animation
- Password strength indicators
- Character count for text areas

### Page Transitions
**Smooth between views:**
- Fade + slide for page changes
- Skeleton loaders during data fetch
- Optimistic UI updates
- Stagger animations for lists
- Route transition animations

---

## Mobile Responsiveness

### Mobile-First Approach
**Design for mobile, enhance for desktop:**
- Touch targets minimum 44x44px
- Generous padding and spacing
- Sticky bottom navigation on mobile
- Collapsible sections for long content
- Swipeable cards and galleries
- Pull-to-refresh where appropriate

### Responsive Patterns
**Adapt layouts intelligently:**
- Hamburger menu → full nav bar
- Card grid → stack on mobile
- Sidebar → drawer
- Multi-column → single column
- Data tables → card list
- Hide/show elements based on viewport

---

## Loading & Empty States

### Loading States
**Never leave users wondering:**
- Skeleton screens matching content layout
- Progress bars for known durations
- Animated placeholders
- Spinners only for short waits (<3s)
- Stagger loading for multiple elements
- Shimmer effects on skeletons

### Empty States
**Make empty states helpful:**
- Illustrations or icons
- Helpful copy explaining why it's empty
- Clear CTA to add first item
- Examples or suggestions
- No "no data" text alone

---

## Unique Elements to Stand Out

### Distinctive Features
**Add personality:**
- Custom cursor effects on landing pages
- Animated page numbers or section indicators
- Unusual hover effects (magnification, distortion)
- Custom scrollbars
- Glassmorphism for overlays
- Animated SVG icons
- Typewriter effects for hero text
- Confetti or celebration animations for actions

### Interactive Elements
**Engage users:**
- Drag-and-drop interfaces
- Sliders and range controls
- Toggle switches with animations
- Progress steps with animations
- Expandable/collapsible sections
- Tabs with slide indicators
- Image comparison sliders
- Interactive demos or playgrounds

---

## Consistency Rules

### Maintain Consistency
**What should stay consistent:**
- Spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Border radius values
- Animation timing (200ms, 300ms, 500ms)
- Color system (primary, secondary, accent, neutrals)
- Typography scale
- Icon style (outline vs filled)
- Button styles across the app
- Form element styles

### What Can Vary
**Project-specific customization:**
- Color palette (different colors, same system)
- Layout creativity (grids, asymmetry)
- Illustration style
- Animation personality
- Feature-specific interactions
- Hero section design
- Card styling variations
- Background patterns or textures

---

## Technical Excellence

### Performance
- Optimize images (WebP, lazy loading)
- Code splitting for faster loads
- Debounce search inputs
- Virtualize long lists
- Minimize re-renders
- Use proper memoization

### Accessibility
- Keyboard navigation throughout
- ARIA labels where needed
- Focus indicators visible
- Screen reader friendly
- Sufficient color contrast
- Respect reduced motion preferences

---

## Key Principles

1. **Be Bold** - Don't be afraid to try unique layouts and interactions
2. **Be Consistent** - Use the same patterns for similar functions
3. **Be Responsive** - Design works beautifully on all devices
4. **Be Fast** - Animations are smooth, loading is quick
5. **Be Accessible** - Everyone can use what you build
6. **Be Modern** - Use current design trends and technologies
7. **Be Unique** - Each project should have its own personality
8. **Be Intuitive** - Users shouldn't need instructions


---

# Project-Specific Customizations

**IMPORTANT: This section contains the specific design requirements for THIS project. The guidelines above are universal best practices - these customizations below take precedence for project-specific decisions.**

## User Design Requirements

# DressMe - Development Blueprint

DressMe is a mobile-first app that lets users upload a photo of a person wearing an outfit, uses AI to deconstruct the look into constituent garments and attributes, matches those items to products from user-selected stores, and returns buy links, prices, alternatives, and outfit composition suggestions. The product focuses on fast visual analysis, user-configurable store connectors, affiliate monetization, saved wardrobes, and feedback-driven accuracy improvements.

## 1. Pages (UI Screens)

- Landing Page (Public marketing)
  - Purpose: Convey value propositions, convert visitors to signups or demo users.
  - Key sections/components: Hero banner (tagline, screenshot carousel, primary CTA Sign Up, secondary CTA Try Demo), Feature blocks (AI analysis, store matching, saved looks, premium), Store partners carousel, How it works 3-step, Pricing CTA, Footer (About, Help, Terms, Privacy, Social).

- Login / Signup
  - Purpose: Authenticate users, capture minimal profile and start onboarding.
  - Key sections/components: Email/password form (validation, show/hide password), Social login buttons (Google, Apple, Facebook), SSO options, Forgot password link, Signup toggle, lightweight onboarding modal (store selection checklist, style preference tags, budget slider).

- Password Reset
  - Purpose: Securely allow password reset via emailed token.
  - Key sections/components: Request form (email input, validation), Success confirmation, Reset form (token link — new password, confirm, strength meter), security notices (expiry).

- Email Verification
  - Purpose: Show verification status and next steps.
  - Key sections/components: Status message (pending/verified), Resend button (cooldown), Next Steps CTA to Dashboard.

- Dashboard (User home)
  - Purpose: Central hub: recent activity, quick upload, saved looks, recommendations.
  - Key sections/components: Header (avatar, notifications, quick upload), Recent uploads carousel, Saved looks grid, Recommendations strip, Quick filters (style tags, budget, stores), Empty state guidance.

- Upload & Analyze
  - Purpose: Capture/upload image and start AI analysis; provide privacy controls and manual overrides.
  - Key sections/components: Image capture/upload (camera, gallery, drag-and-drop for web), Crop & person selection (bounding box, segmentation mask preview), manual attribute overrides (occasion, brands, budget), Analyze button, Analysis progress UI (stepper Detection → Matching → Results), Privacy toggle (private/share for model improvement).

- Analysis Results
  - Purpose: Present detected garments, attributes, and matched products with buy links.
  - Key sections/components: Detected items list (cards with confidence and edit), Item detail pane (attributes, filters), Product match cards (image, store logo, price, availability, buy link, affiliate badge), Compare & add-to-cart buttons, Feedback controls (thumbs up/down), Filter bar (sort by price/relevance/store/shipping).

- Product Detail (External Redirect/In-app preview)
  - Purpose: Show product preview and redirect to store or in-app checkout.
  - Key sections/components: Product summary (carousel, title, brand, price, size options), Store info (trusted badge, shipping ETA, returns), Buy CTA (Open in Store / In-app checkout), Similar items carousel, Affiliate disclosure.

- Saved Looks
  - Purpose: Manage saved outfit compositions for later purchase or sharing.
  - Key sections/components: Saved looks grid (thumbnail, title, store coverage indicator), Look detail modal (items list, buy buttons, price summary), Edit look flow (replace items, change stores), Share button (link/social), Delete/archive.

- Shopping Cart
  - Purpose: Aggregate selected matched products across stores and orchestrate checkout.
  - Key sections/components: Cart items list (image, size, store), Price breakdown (subtotal, per-store shipping estimates, taxes), Checkout buttons (per-store redirect or consolidated if supported), Promo code field, Save for later/remove actions.

- Checkout / Payment
  - Purpose: Complete purchases via in-app checkout where supported or redirect to store.
  - Key sections/components: Order summary (grouped by store), Payment methods (saved card, new card, wallets), Billing & shipping form, Place order CTA, Success & error states, webhooks handling.

- Order History
  - Purpose: Show past purchases, receipts, and allow reorders.
  - Key sections/components: Orders list (date, total, stores, status), Order detail view (items, store receipts, tracking link), Reorder/Contact store CTA, Support ticket link.

- User Profile
  - Purpose: Manage account details, connected stores, payment methods, preferences, subscription.
  - Key sections/components: Profile info (edit), Connected stores (connect/disconnect/test), Payment methods, Preferences (style tags, size profile, currency), Subscription & billing, Delete account (data export/deletion).

- Settings & Preferences
  - Purpose: App-wide settings including privacy and developer options.
  - Key sections/components: Notification toggles, Privacy controls (image retention, opt-in), Currency & locale selector, Developer settings (API keys), Save & reset.

- About & Help
  - Purpose: Documentation, FAQs, contact support, partnership info.
  - Key sections/components: Searchable FAQ, How-to guides, Contact form with file upload, Affiliate/partnership info, Changelog.

- Admin Dashboard (internal)
  - Purpose: Manage users, connectors, model performance, flagged content, analytics.
  - Key sections/components: User management table, Model performance KPIs, Flagged content queue (moderation tools), Store connectors management, Analytics & reports exports.

- Terms of Service / Privacy Policy / Cookie Policy
  - Purpose: Legal and compliance pages.
  - Key sections/components: Full searchable texts, data request buttons (export/delete), cookie consent manager.

- 404 Not Found / 500 Server Error
  - Purpose: Friendly error handling.
  - Key sections/components: Illustrations/messages, search bar or navigation CTAs, retry/contact support, report diagnostics.

- Loading / Success States (reusable)
  - Purpose: Global UX states for async operations.
  - Key sections/components: Global loading overlay (skeletons), progress toasts, success toasts, empty state components.

## 2. Features

- User Authentication
  - Technical details: OAuth2 for Google/Apple/Facebook; JWT access & refresh tokens; secure storage (HttpOnly cookies on web, secure storage/keystore for mobile); password hashing (bcrypt or argon2); email verification via signed tokens; rate-limiting and brute-force protections; device/session listing and revocation.
  - Implementation notes: Use refresh-token rotation, short-lived access tokens, session revocation endpoint, and security logging.

- Image Upload & Management
  - Technical details: Client-side resize/normalize (WebP/AVIF) before upload; upload via signed URLs to S3/GCS; optional EXIF removal; virus scanning (server-side or storage lifecycle hook); retention policies and user-initiated deletion APIs.
  - Implementation notes: Use multipart upload for large images, store segmentation masks optionally, and persist minimal metadata (uploader, timestamp, privacy flag).

- AI Outfit Analysis (Vision)
  - Technical details: Pipeline: person detection → instance segmentation for garments → attribute extraction classifiers (type, color, pattern, fabric, fit) → confidence scoring. Serve via GPU-backed inference (K8s pods or managed endpoints). Asynchronous job queue (e.g., RabbitMQ/SQS + workers). Progress via WebSocket or polling.
  - Implementation notes: Normalize attributes to controlled vocabularies, expose manual-edit endpoints, low-confidence results go to human-in-the-loop queue.

- Store Matching Engine
  - Technical details: Connector adapter framework supporting REST APIs, product feeds, and scraping. Normalize into unified product schema. Index products in search engine (Elasticsearch/Algolia) for fast queries. Matching algorithm: weighted scoring (attribute similarity + price proximity + availability + user preferences). Caching + rate-limiting per connector. Affiliate parameter injection at link generation.
  - Implementation notes: Maintain connector health checks and sync logs; store mapping tables for brand synonyms and size conversions.

- Search & Filter
  - Technical details: Full-text and facets in ES/Algolia; autocomplete; cursor-based pagination; server-side validation; client-side filter components.
  - Implementation notes: Precompute facets for performance; throttle frequent queries.

- Cart & Checkout Orchestration
  - Technical details: Group by merchant for shipping/tax calculations; Stripe integration for supported merchants; redirect flows for unsupported merchants with affiliate tracking; webhook endpoints for payment confirmations.
  - Implementation notes: Handle partial failures (e.g., item unavailable), optimistic locking for stock-sensitive items, and record click-through / conversion events.

- Notifications & Communication
  - Technical details: SendGrid/Mailgun for emails; APNs/FCM for push; in-app notification store (read/unread); transactional templates for verification, reset, analysis complete, and orders.
  - Implementation notes: Respect user notification preferences; implement unsubscribe; backoff/retry for send failures.

- Admin & Moderation Tools
  - Technical details: RBAC for admin roles; audit logs; moderation queue (flagging, redaction, user suspension); connector configuration UI; analytics dashboards.
  - Implementation notes: Provide bulk actions and export capabilities.

- Analytics & Reporting
  - Technical details: Event pipeline (segment or direct) to data warehouse (BigQuery/Snowflake); dashboards for DAU, conversion, ARPU, latency, match accuracy; GDPR-compliant retention.
  - Implementation notes: Tag events for A/B testing and model training; secure access for admin dashboards.

- Affiliate Tracking & Link Generator
  - Technical details: Service that appends affiliate params, records click/impression, and tracks conversion events. Expose short-click endpoints that redirect with tracking.
  - Implementation notes: Store mapping of partner affiliate tokens; ensure link integrity and privacy-preserving redirects.

- Billing & Subscription
  - Technical details: Stripe products/plans for free/premium tiers; webhooks for subscription lifecycle; invoice management and trials.
  - Implementation notes: Gate premium features server-side using entitlement checks.

- Privacy & Compliance
  - Technical details: Image retention controls, deletion/export APIs, consent recording, data processing records, GDPR/CCPA support.
  - Implementation notes: Default to private storage; require explicit opt-in for model improvement sharing.

## 3. User Journeys

- New User Onboarding (End-user)
  1. Visit Landing Page → Tap Sign Up.
  2. Choose signup method (email/social). Complete auth and email verification.
  3. Onboarding modal: select preferred stores (checkbox list), pick style tags, set budget range.
  4. Redirect to Dashboard with starter tutorial and quick upload CTA.

- Quick Match Flow (End-user)
  1. From Dashboard, tap Upload → choose camera/gallery/web upload.
  2. Crop/select person region; confirm privacy toggle.
  3. Optionally override attributes (occasion/brands/budget). Tap Analyze.
  4. Progress indicator shows detection → matching → results.
  5. View detected items list; edit any misdetections (change type/color).
  6. Browse matched products per item; sort/filter by price/store.
  7. Add desired matches to cart or save look.
  8. Checkout: per-store redirect or in-app checkout for supported merchants.
  9. After purchase, user sees order confirmation and order saved in Order History. Optionally rate match.

- Save & Share Look (End-user)
  1. From Analysis Results, tap Save Look → name and add notes.
  2. Saved Look is visible on Dashboard.
  3. Share via link or social; recipients open a preview with buy links.

- Preference Update Flow (End-user)
  1. Go to Profile → Connected stores → add/remove stores.
  2. Update preferences (size profile, currency, budgets).
  3. Future matches prioritize updated preferences.

- Feedback Loop (End-user)
  1. After viewing matches, submit thumbs up/down and correct attributes.
  2. Feedback recorded; low-confidence images may be queued for human review.
  3. Feedback updates model training datasets per data governance rules.

- Password Reset (End-user)
  1. Click Forgot Password → enter email → receive token link.
  2. Use token to set new password; receive confirmation email.

- Admin Moderation Flow (Admin)
  1. Admin logs into Admin Dashboard (RBAC).
  2. Review flagged content queue → redaction/suspend user if needed.
  3. Monitor model performance KPIs and connector health.
  4. Update connector settings or push fixes; review analytics exports.

- Partner Onboarding (Store partner)
  1. Partner visits Partner Portal → authenticate.
  2. Connect store via API keys/feeds; configure affiliate tokens and product mapping.
  3. Sync catalog; fix mapping errors via Store Connectors UI.
  4. Monitor traffic and conversions in reports.

## 4. UI Guide

Implementation instructions: apply the Visual Style and Key Design Elements consistently. Use mobile-first responsive layouts. All components should adhere to color, typography, spacing, and interaction rules below.

Visual Style

### Color Palette:
- Primary: #FFFFFF (backgrounds, cards)
- Secondary: #F4F4F4 (subtle card backgrounds/page contrast)
- Accent: #000000 (primary text, key actions)
- Muted Accent: #6E6E6E (secondary text, icons)
- Highlight: #FF5757 (notifications, action buttons, price highlights)
- Supporting: #E5E5E5 (borders/dividers)
- Occasional: #D2B48C (product swatches), #E9E9E9 (input fields)
- Gradients: Minimal; flat monochrome with accent pops.

### Typography & Layout:
- Font family: modern sans-serif (Inter / SF Pro / Helvetica Neue).
- Weights: Regular 400, Medium 500, Bold 700.
- Hierarchy: Large bold headers; medium section titles; regular descriptions; accent color for pricing/important actions.
- Spacing: Outer padding 16–24px; inner 8–16px. Use generous whitespace.
- Alignment: Left-aligned text; center CTAs/icons where appropriate.
- Typography treatments: subtle letter spacing on headings.

Key Design Elements

Card Design:
- Rounded 12px radius, subtle shadow #00000010.
- Thin border #E5E5E5 or no border.
- Hover: slight shadow intensification and minor upward move.
- Layout: image top, bold title, supporting text, CTA.

Navigation:
- Bottom navigation bar (icons + labels); top bar for search/filter/profile.
- Slide-out drawer for settings/account.
- Active states: black or accent highlight; filled icon or bolder label.
- Collapsible filter panels and shopping bag modal sheet with rounded top corners.

Data Visualization:
- Rating bars and star ratings: flat, stars in #FFD600.
- Horizontal bar charts for ratings; simple badges for notifications.

Interactive Elements:
- Buttons: pill-shaped or rounded rectangles. High contrast:
  - Primary: black fill, white text.
  - Secondary: white fill, black outline/black text.
- Form elements: rounded inputs, light gray backgrounds, clear focus state (darker border/shadow).
- Micro-interactions: smooth transitions (opacity, color fill), subtle hover effects.

Design Philosophy:
- Modern, minimalist, strong whitespace, clear CTAs, user-centric quick-scan layouts. Use friendly rounded shapes for approachability.

Implementation Notes:
- Use design tokens for color, spacing, typography, and radii.
- Create a UI Component Kit: Button, Input, Card, Modal, BottomNav, TopBar, Avatar, Skeleton loaders, Toasts, FilterPanel, ProductCard, DetectedItemCard, SavedLookCard, and Admin components.
- Accessibility: ensure contrast ratios meet WCAG AA for text; accessible labels for buttons and forms; focus states for keyboard navigation; ARIA attributes for dynamic regions.
- Localization: support RTL and make text containers flexible.
- Performance: optimize images, lazy-load lists (infinite scroll or pagination), use skeleton loaders for async states.

Instructions to AI Development Tool
After every development step, refer back to this blueprint to ensure correct implementation. Verify all features and pages are built according to specifications before completing the project. Pay special attention to the UI Guide section and ensure all visual elements follow the design system exactly.

## Implementation Notes

When implementing this project:

1. **Follow Universal Guidelines**: Use the design best practices documented above as your foundation
2. **Apply Project Customizations**: Implement the specific design requirements stated in the "User Design Requirements" section
3. **Priority Order**: Project-specific requirements override universal guidelines when there's a conflict
4. **Color System**: Extract and implement color values as CSS custom properties in RGB format
5. **Typography**: Define font families, sizes, and weights based on specifications
6. **Spacing**: Establish consistent spacing scale following the design system
7. **Components**: Style all Shadcn components to match the design aesthetic
8. **Animations**: Use Motion library for transitions matching the design personality
9. **Responsive Design**: Ensure mobile-first responsive implementation

## Implementation Checklist

- [ ] Review universal design guidelines above
- [ ] Extract project-specific color palette and define CSS variables
- [ ] Configure Tailwind theme with custom colors
- [ ] Set up typography system (fonts, sizes, weights)
- [ ] Define spacing and sizing scales
- [ ] Create component variants matching design
- [ ] Implement responsive breakpoints
- [ ] Add animations and transitions
- [ ] Ensure accessibility standards
- [ ] Validate against user design requirements

---

**Remember: Always reference this file for design decisions. Do not use generic or placeholder designs.**
