# StockPro - Design Guidelines

## Design Approach
**Selected Framework:** Material Design with logistics-focused customization
**Justification:** StockPro is a utility-focused, data-intensive inventory management application requiring clear information hierarchy, efficient workflows, and professional aesthetics suitable for business operations.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Primary Blue: 210 100% 45% (professional logistics blue)
- Primary Blue Light: 210 95% 65% (hover states)
- Primary Blue Dark: 210 100% 35% (active states)

**Neutral Scale:**
- Background: 0 0% 100% (white)
- Surface: 210 20% 98% (light blue-gray)
- Border: 210 15% 90%
- Text Primary: 210 25% 15%
- Text Secondary: 210 15% 45%

**Semantic Colors:**
- Success: 142 76% 36% (stock available)
- Warning: 38 92% 50% (low stock alert)
- Error: 0 84% 60% (out of stock)
- Info: 210 100% 50%

**Dark Mode:** Not required for this business application

### B. Typography

**Font Family:**
- Primary: 'Inter' via Google Fonts (clean, professional, excellent readability)
- Monospace: 'JetBrains Mono' for SKU/ID numbers

**Type Scale:**
- Headings H1: text-3xl font-bold (Dashboard title)
- Headings H2: text-2xl font-semibold (Section headers)
- Headings H3: text-xl font-semibold (Card titles)
- Body Large: text-base font-medium (Primary content)
- Body: text-sm (Lists, descriptions)
- Caption: text-xs (Metadata, timestamps)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section spacing: gap-6 to gap-8
- Page margins: px-4 md:px-6 lg:px-8
- Card spacing: p-6

**Grid System:**
- Mobile: Single column stacked layout
- Tablet: 2-column for metrics, single for lists
- Desktop: 4-column metrics grid, 2-column for forms, table for product lists

**Breakpoints:**
- Mobile-first approach
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px

### D. Component Library

**Navigation:**
- Top navbar: Logo left, user profile/logout right, height 16
- Mobile: Hamburger menu with slide-out drawer
- Active states: blue background with white text

**Dashboard Metrics Cards:**
- Elevated cards with shadow-sm, rounded-lg, white background
- Icon + metric number + label + trend indicator
- Grid of 2 on mobile, 4 on desktop
- Icons from Heroicons (outline style)
- Metrics: Total Products, Total Value, Low Stock Items, Recent Activity

**Product List/Table:**
- Desktop: Data table with sortable columns (Product Name, SKU, Quantity, Price, Client/Company, Actions)
- Mobile: Card-based list with key info visible, tap to expand
- Row hover: bg-blue-50
- Alternating row backgrounds on mobile cards for readability

**Forms & Inputs:**
- Input fields: border-gray-300, focus:ring-2 focus:ring-blue-500, rounded-md
- Labels: text-sm font-medium text-gray-700, mb-2
- Required fields: asterisk in error color
- Sheet ID input: monospace font, placeholder with example format

**Buttons:**
- Primary: bg-blue-600 text-white, px-4 py-2, rounded-md
- Secondary: border-blue-600 text-blue-600, bg-white
- Destructive: bg-red-600 text-white (delete actions)
- Icon buttons: p-2, rounded-md, hover:bg-gray-100

**Data Display:**
- Empty states: Centered icon + message + CTA to add first product
- Loading states: Skeleton screens with pulsing animation
- Error states: Alert banner with error icon and retry action
- Success states: Toast notification (top-right, auto-dismiss)

**Modals/Dialogs:**
- Add Product: Full-screen on mobile, centered modal on desktop (max-w-2xl)
- Delete Confirmation: Smaller modal (max-w-md) with clear action buttons
- Backdrop: bg-black/50

**Stock Status Indicators:**
- Visual badges: rounded-full px-3 py-1 text-xs font-medium
- In Stock: green background
- Low Stock: amber background  
- Out of Stock: red background

### E. Responsive Behavior

**Mobile Optimization (Critical):**
- Bottom navigation bar for main actions (Dashboard, Products, Add)
- Swipe gestures for delete actions on product cards
- Fixed header with Sheet ID status indicator
- Collapsible filters/search
- Large touch targets (min 44px height)

**Dashboard Mobile Layout:**
- Metrics: 2-column grid, scrollable
- Quick actions: Fixed bottom sheet with primary CTAs
- Product preview: Last 5 items with "View All" link

**Desktop Layout:**
- Sidebar navigation (optional, can use top nav)
- Full data table with inline editing
- Multi-select for bulk actions
- Advanced filters in collapsible panel

## Key Interactions

**Connection Flow:**
- Landing: Logo + tagline + "Connect Google Sheets" CTA
- Auth modal: Sheet ID input with validation + instructions
- Empty state check: Verify sheet is empty before connection
- Success: Redirect to dashboard with welcome message

**Product Management:**
- Add: Floating action button (mobile) or primary button (desktop)
- Edit: Inline editing on desktop, modal on mobile
- Delete: Swipe-to-delete (mobile) or icon button with confirmation
- Batch operations: Checkbox selection with action toolbar

**Real-time Sync:**
- Auto-save indicator when data updates to Sheets
- Refresh button to pull latest from Sheets
- Optimistic UI updates with rollback on error

## Images
No hero images required. This is a data-focused business application. Use icons from Heroicons for:
- Metric cards (cube, currency-dollar, exclamation-triangle, clock)
- Empty states (document-text, table)
- Navigation (view-grid, clipboard-list, plus-circle)