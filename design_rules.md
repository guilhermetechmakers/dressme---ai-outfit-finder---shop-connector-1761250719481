# Design Rules for This Project

## Project Design Pattern: ---

## Visual Style

### Color Palette:
- Primary: #FFFFFF (pure white, dominant for backgrounds and cards)
- Secondary: #F4F4F4 (soft light gray, used for subtle card backgrounds and page contrast)
- Accent: #000000 (deep black, for primary text and key actions)
- Muted Accent: #6E6E6E (mid-gray, secondary text and icons)
- Highlight: #FF5757 (vivid red, for notifications, action buttons, and price highlights)
- Supporting: #E5E5E5 (very light gray, borders/dividers)
- Occasional: #D2B48C (tan/beige, for product color indicators/swatches), #E9E9E9 (input fields and subtle containers)
- Gradients: Not prominently used; the palette is largely flat and monochrome with minimal accent pops.

### Typography & Layout:
- Font Families: Clean, modern sans-serif (similar to Inter, SF Pro, or Helvetica Neue)
- Font Weights: Regular (400), Medium (500), Bold (700) for headers and prices
- Hierarchy: Large, bold headers for titles/product names; medium for section titles; regular for descriptions and metadata; accent colors for pricing and important actions
- Spacing: Consistent padding (16–24px outer, 8–16px inner); generous white space around cards and sections for clarity
- Alignment: Mostly left-aligned text with centered elements for CTAs and icons
- Typography Treatments: Subtle letter spacing on headings, clear contrast between header and body text, restrained use of color for emphasis

### Key Design Elements
#### Card Design:
- Style: Rounded corners (12px radius), subtle drop shadow (#00000010, very light for elevation)
- Borders: Thin, light gray (#E5E5E5) or no border; shadow provides separation
- Hover States: Slight shadow intensification and minor upward movement
- Hierarchy: Image dominant at top, bold title, supporting text, then CTA button; clear separation with padding

#### Navigation:
- Patterns: Bottom navigation bar with icons and labels; top bar for search/filter/profile
- Sidebar: Slide-out drawer for settings/account; rounded corners and soft shadow
- Active States: Black or accent highlight for active nav item; filled icon or bolder label
- Collapsible Elements: Filter panels and shopping bag/modal sheets slide up/down with rounded top corners

#### Data Visualization:
- Chart Styles: Rating bars and star ratings—flat, monochrome with gold/yellow (#FFD600) for stars
- Visual Treatments: Minimalist, icon-driven; no heavy charting, but clear, flat progress bars for reviews/ratings
- Patterns: Horizontal bar charts for user ratings; simple badges for notifications

#### Interactive Elements:
- Button Styles: Pill-shaped or rounded rectangles, high contrast (black fill, white text; or white fill, black outline/black text)
- Form Elements: Rounded input fields with light gray backgrounds, clear focus state (darker border or shadow)
- Interactive States: Smooth transitions (opacity, color fill) on hover/tap; subtle micro-interactions for feedback
- Hover Effects: Slight shadow, color pop, or icon animation; minimal but noticeable

### Design Philosophy
This interface embodies:
- A modern, minimalist, and clean aesthetic—prioritizing clarity and ease of use
- Strong focus on whitespace, visual hierarchy, and intuitive navigation to enhance discoverability
- User-centric design: quick-scanning layouts, clear CTAs, and easily digestible information
- Soft, approachable, and fashion-forward—balancing utility with a sense of aspirational style
- Visual strategy centers on simplicity, speed, and trust—building confidence with restrained color, friendly rounded shapes, and seamless interactive flows

---

This project follows the "---

## Visual Style

### Color Palette:
- Primary: #FFFFFF (pure white, dominant for backgrounds and cards)
- Secondary: #F4F4F4 (soft light gray, used for subtle card backgrounds and page contrast)
- Accent: #000000 (deep black, for primary text and key actions)
- Muted Accent: #6E6E6E (mid-gray, secondary text and icons)
- Highlight: #FF5757 (vivid red, for notifications, action buttons, and price highlights)
- Supporting: #E5E5E5 (very light gray, borders/dividers)
- Occasional: #D2B48C (tan/beige, for product color indicators/swatches), #E9E9E9 (input fields and subtle containers)
- Gradients: Not prominently used; the palette is largely flat and monochrome with minimal accent pops.

### Typography & Layout:
- Font Families: Clean, modern sans-serif (similar to Inter, SF Pro, or Helvetica Neue)
- Font Weights: Regular (400), Medium (500), Bold (700) for headers and prices
- Hierarchy: Large, bold headers for titles/product names; medium for section titles; regular for descriptions and metadata; accent colors for pricing and important actions
- Spacing: Consistent padding (16–24px outer, 8–16px inner); generous white space around cards and sections for clarity
- Alignment: Mostly left-aligned text with centered elements for CTAs and icons
- Typography Treatments: Subtle letter spacing on headings, clear contrast between header and body text, restrained use of color for emphasis

### Key Design Elements
#### Card Design:
- Style: Rounded corners (12px radius), subtle drop shadow (#00000010, very light for elevation)
- Borders: Thin, light gray (#E5E5E5) or no border; shadow provides separation
- Hover States: Slight shadow intensification and minor upward movement
- Hierarchy: Image dominant at top, bold title, supporting text, then CTA button; clear separation with padding

#### Navigation:
- Patterns: Bottom navigation bar with icons and labels; top bar for search/filter/profile
- Sidebar: Slide-out drawer for settings/account; rounded corners and soft shadow
- Active States: Black or accent highlight for active nav item; filled icon or bolder label
- Collapsible Elements: Filter panels and shopping bag/modal sheets slide up/down with rounded top corners

#### Data Visualization:
- Chart Styles: Rating bars and star ratings—flat, monochrome with gold/yellow (#FFD600) for stars
- Visual Treatments: Minimalist, icon-driven; no heavy charting, but clear, flat progress bars for reviews/ratings
- Patterns: Horizontal bar charts for user ratings; simple badges for notifications

#### Interactive Elements:
- Button Styles: Pill-shaped or rounded rectangles, high contrast (black fill, white text; or white fill, black outline/black text)
- Form Elements: Rounded input fields with light gray backgrounds, clear focus state (darker border or shadow)
- Interactive States: Smooth transitions (opacity, color fill) on hover/tap; subtle micro-interactions for feedback
- Hover Effects: Slight shadow, color pop, or icon animation; minimal but noticeable

### Design Philosophy
This interface embodies:
- A modern, minimalist, and clean aesthetic—prioritizing clarity and ease of use
- Strong focus on whitespace, visual hierarchy, and intuitive navigation to enhance discoverability
- User-centric design: quick-scanning layouts, clear CTAs, and easily digestible information
- Soft, approachable, and fashion-forward—balancing utility with a sense of aspirational style
- Visual strategy centers on simplicity, speed, and trust—building confidence with restrained color, friendly rounded shapes, and seamless interactive flows

---" design pattern.
All design decisions should align with this pattern's best practices.

## General Design Principles

## Color & Visual Design

### Color Palettes
**Create depth with gradients:**
- Primary gradient (not just solid primary color)
- Subtle background gradients
- Gradient text for headings
- Gradient borders on cards
- Dark mode with elevated surfaces

**Color usage:**
- 60-30-10 rule (dominant, secondary, accent)
- Consistent semantic colors (success, warning, error)
- Accessible contrast ratios (WCAG AA minimum)
- Test colors in both light and dark modes

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
- Adjust shadow intensity based on theme (lighter in dark mode)

---

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
- Sufficient color contrast (both themes)
- Respect reduced motion preferences

---

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
9. **Be Themeable** - Support both dark and light modes seamlessly

---

