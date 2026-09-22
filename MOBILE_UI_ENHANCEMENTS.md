# Mobile App Enhancements — Web Dashboard Parity Brief

This document describes UI/UX and feature work just completed on the **Beboys mobile app**
(React Native / Expo, staff & admin facing — Clerk org roles `org:admin` / `org:staff`).
It is meant to be handed to whoever maintains the **web dashboard/POS** so equivalent UX can be
brought over where it makes sense. It is a feature/behavior spec, not a code diff — the web
app's stack (presumably Next.js) is different, so translate the *intent*, not the file layout.

Reference: the shared API contract is `beboys-api-docs.md` (same backend serves both web and
mobile — Next.js Route Handlers under `app/api/`, Clerk-authenticated).

---

## 1. What changed, in one paragraph

The mobile app previously rendered entirely from hardcoded mock data with no network calls,
no cart, and dead-end buttons (console.log stubs). It's now a working client against the real
API: browsing dishes/categories, a persistent cart with checkout via `POST /api/pos`, live order
tracking with staff status transitions via `PATCH /api/orders/{id}`, a real Clerk-backed profile
with sign-out, and an admin-only low-stock alert sourced from `GET /api/dashboard/low-stock`.
Loading, empty, and error states were added everywhere data is fetched.

---

## 2. New feature: Cart & Checkout flow

- A cart is now a first-class concept (previously the "Add to Cart" button did nothing).
- Tapping "Add to Cart" anywhere (menu grid, dish detail sheet, home screen's top-seller/featured
  cards) adds the dish to an in-memory cart, capped at that dish's `servings_left` so you can't
  add more than what's in stock.
- A **floating cart bar** appears at the bottom of the Menu screen whenever the cart is non-empty,
  showing item count + running total, tapping it opens the cart.
- **Cart screen** (presented as a modal, not a tab): line items with quantity +/- steppers (capped
  at remaining stock) and a remove button, a running total, and a "Place order" button.
- Checkout calls `POST /api/pos` with `source: "mobile"` and the cart's line items, per the API
  doc. On success: cart clears, a success toast fires, and the user is routed to the Orders tab.
  On failure (e.g. "not enough servings_left" from a concurrent sale): an error toast shows the
  server's message verbatim rather than a generic failure.
- Cart state does **not** persist across app restarts (no local storage wired up yet) — it's
  session-only. Flag if the web cart (if any) should behave differently.

**Web parity suggestion:** if the web POS doesn't already have a lightweight "build an order,
then submit" cart affordance for staff, this is the pattern — quantity stepper per line, a
sticky order summary, single submit hitting `/api/pos`.

## 3. New feature: Dish detail view

- Tapping the eye icon on a menu card opens a bottom sheet with: full-size image, name, price,
  an availability badge (Available / low-stock count / Sold out — low-stock threshold shown here
  is a simple `servings_left <= 5` on the *dish*, distinct from the ingredient-level
  `low_stock_threshold` in the API), the recipe (ingredient quantities), a quantity stepper, and
  an "Add to cart · ₱total" button that reflects the selected quantity live.

**Web parity suggestion:** a similar quick-view/detail panel for a dish row (recipe + live
availability) would help staff answer "can I still sell this" without opening the full edit form.

## 4. Menu screen — from static grid to live, filterable catalog

- Dishes and categories are now fetched from `GET /api/dishes` and `GET /api/categories`.
- Search bar is wired (was decorative before) — filters by dish name, case-insensitive.
- Category pills are wired to actually filter the grid (previously just logged to console);
  an "All" pseudo-category is prepended.
- Sold-out state: any dish where `is_available` is false or `servings_left <= 0` shows a
  translucent "Sold out" overlay on its image and a disabled, greyed "Unavailable" button instead
  of "Add to Cart".
- If a dish is already in the cart, a small quantity badge appears on its card image.
- Pull-to-refresh, skeleton-card placeholders while loading, and an explicit error state with a
  "Try again" retry action (instead of a blank/broken screen on network failure).

## 5. Orders screen — from two mock arrays to live, read-only order tracking

- Orders are fetched from `GET /api/orders` (already includes `items` and resolved
  `cashier_name` per the API doc — no extra joins needed client-side).
- Active/Past tabs are now derived from real `status`, not separate mock lists:
  - **Active** = `pending` or `preparing`
  - **Past** = `completed` or `cancelled`
- The Active tab's label shows a live count badge, e.g. "Active (3)".
- Added a `cancelled` status badge (the old screen never rendered one, silently dropping
  cancelled orders into the `default: return null` case).
- Loading skeletons, pull-to-refresh, and an error state with retry, matching the Menu screen.
- Removed the old "Reorder" button (mock-only, not backed by anything real).

**This screen is intentionally view-only.** An earlier draft of this work added inline
"Start preparing" / "Mark completed" buttons calling `PATCH /api/orders/{id}` directly from this
screen — that was wrong for a screen the person who *placed* the order can see, and was removed.
Whoever is looking at their own order shouldn't also be the one closing it out; that's a kitchen/
staff-board action, not a self-service one. If the web dashboard doesn't already gate status
changes to a separate staff-only view, worth double-checking — it's the same API doc's routes
mobile was calling.

**Known gap, not fixed by this pass (needs a backend change):** `GET /api/orders` has no
"mine only" filter — it returns every order in the system to any authenticated caller. This
screen now filters to `cashier_id === <the signed-in user's Clerk id>` client-side so people
only *see* their own orders, but the full unfiltered order list (everyone's orders, across every
customer) still reaches the device over the wire before that filtering happens. That's a real
data-exposure gap, not just a UI nicety — closing it requires either a query param
(`GET /api/orders?mine=true`) or server-side scoping in the route handler itself, not something
fixable from the mobile client alone. Flag this to whoever owns that route.

## 6. Home screen — real top-seller + admin low-stock banner

- "Today's Top Seller" is now computed client-side from live dish data — the dish with the
  highest `servings - servings_left` (i.e., most sold) rather than a hardcoded product.
  This is a client-side heuristic, not a backend stat — if the web dashboard already has a
  proper "best seller" metric (e.g. from actual order aggregation), that would be a more accurate
  source of truth to eventually swap in.
- "Featured" grid is now live dishes (search-filtered, excluding whichever dish is the top
  seller), with the same sold-out/cart-quantity treatment as the Menu screen.
- **Admin-only low-stock banner**: if the signed-in user's org role is `org:admin`, the home
  screen fetches `GET /api/dashboard/low-stock` and shows a dismissible-style (currently
  always-visible-while-true) amber banner naming the low-stock ingredients, tappable through to
  the Menu. Staff never see this (matches the API's admin-only auth on that route).
- Pull-to-refresh added to the whole screen.

## 7. Profile screen — real identity instead of a hardcoded person

- Previously showed a static "Ace Cruz / ace@email.com". Now pulls the signed-in Clerk user's
  name, email, and initials.
- Shows a role pill (Admin/Staff) derived from the Clerk org role — useful for staff who might
  be confused about which permission tier they're on (matches the API's two-role model exactly).
- Sign out is now real (`useAuth().signOut()` + redirect to sign-in), previously just logged to
  console and did nothing.
- Removed the "Favorites" menu item — it had no backing feature or API support and was a
  dead-end console.log; better to omit than to ship a fake affordance. (Flag if favorites is
  actually planned — nothing in the API doc supports it today.)

## 8. Cross-cutting UI infrastructure (new, reusable)

These are new shared primitives, useful to reference for consistent behavior/naming if the web
app wants matching terminology:

- **Toast system**: bottom-anchored, auto-dismissing success/error toasts for background actions
  (add-to-cart confirmations, checkout results, status-update results, error messages surfaced
  from the API's `{ "error": "message" }` shape).
- **Empty states**: a consistent icon + title + description + optional retry-button pattern used
  for "no dishes found", "cart is empty", "no orders", and network-error states — replacing blank
  screens or silent failures.
- **Skeleton loaders**: shimmering placeholders shaped like the real content (menu cards, order
  cards) shown while the initial fetch is in flight, instead of a spinner or blank screen.
- **Pull-to-refresh**: added to Menu, Orders, and Home.

## 9. Error handling convention

All API errors now surface the backend's own message (the API doc's `{ "error": "message" }`
shape) directly in a toast or empty-state description, rather than a generic "something went
wrong" — e.g. a checkout that fails because of insufficient `servings_left` shows that exact
Postgres-exception-derived message to the person placing the order. Worth confirming the web app
does the same, since it's the same backend and same error shape.

## 10. Explicitly out of scope / not done

Calling these out so nothing is assumed done silently:

- No cart persistence (AsyncStorage/etc.) — cart is lost on app kill.
- No offline support / request retry/backoff beyond a manual "Try again" button.
- No push notifications for order status changes.
- No ingredient-stock management UI on mobile (that's `POST/PATCH /api/ingredients`, admin-only,
  and is presumably a web-only workflow already).
- No dish creation/editing on mobile (`POST/PATCH /api/dishes`) — mobile is order-taking, not
  catalog management.
- "Reorder" and "Favorites" affordances that existed as non-functional mock buttons were removed
  rather than wired up, since neither has API support today.
