# DESIGN.md — Beboy's Eatery Design System

**App:** Beboy's Eatery (food ordering app)
**Audience:** Everyday customers browsing a menu and placing food orders from their phone — optimize for speed, thumb reach, and one-handed use.
**Aesthetic:** Modern, clean, appetite-friendly. Light surfaces, neutral grays for text, a single lime-green accent for action and emphasis.

This file is the single source of truth for design tokens. It is derived from tokens already in use in this codebase (`lib/theme.ts`, `app.json`, and existing components), not invented from scratch.

---

## Rule: Anti-Slop Constraint

- **Never invent a new hex value, font size, spacing value, radius, or shadow while writing screen code.** Every visual value used in a component must trace back to a token in this file.
- If a screen needs a color, size, or component variant that isn't defined here, **stop and ask** — do not improvise a "close enough" value.
- Design and build mobile-first for **320px–430px** viewport widths. Verify layouts don't break at 320px (iPhone SE class) before considering a screen done.

---

## 1. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#FFFFFF` | Screen background |
| `surface` | `#F9FAFB` | Cards, sheets, input fields, elevated containers |
| `border` | `#E5E7EB` | Hairlines, dividers, input borders |
| `text-primary` | `#111827` | Headings, primary body text |
| `text-secondary` | `#6B7280` | Subtext, captions, placeholders, icons (inactive) |
| `text-tertiary` | `#9CA3AF` | Disabled text, faint icons |
| `accent` | `#84CC16` | Primary buttons, active states, price highlights, selected tabs, FAB |
| `accent-pressed` | `#65A30D` | Accent element in pressed/active state (one shade darker) |
| `destructive` | `#EF4444` | Errors, remove-item actions, validation messages |
| `overlay` | `rgba(17, 24, 39, 0.5)` | Modal/bottom-sheet scrims |

**Rules:**
- `accent` (`#84CC16`) is the **only** brand color. Do not introduce a second accent (no blue links, no purple badges, etc.) without updating this file first.
- Text on `accent` background uses `#FFFFFF`.
- No opacity-based color hacks for tone (e.g. `black/60`) outside of `overlay` — use `text-secondary` / `text-tertiary` instead so values stay in the token set.
- Dark mode is **not** in scope for v1 (app.json sets `userInterfaceStyle: light`). If dark mode is requested later, extend this table — don't ad-hoc it in components.

---

## 2. Typography

**Font family:** Inter (already loaded via `@expo-google-fonts/inter` in `app/_layout.tsx`). Use `Inter` exclusively for all UI text — `Nunito` is loaded but currently unused; do not use it in a screen without checking with me first (either standardize on Inter everywhere, or we define an explicit headline/body split).

| Token | Size | Line Height | Weight (family) | Usage |
|---|---|---|---|---|
| `display` | 28px | 34px | `Inter_700Bold` | Large title / hero (e.g. restaurant name on splash) |
| `title` | 22px | 28px | `Inter_700Bold` | Screen titles ("Menu", "Your Cart") |
| `heading` | 18px | 24px | `Inter_600SemiBold` | Section headers, card titles (dish name) |
| `body` | 16px | 22px | `Inter_400Regular` | Default body text, descriptions |
| `body-medium` | 16px | 22px | `Inter_500Medium` | Emphasized body (prices, labels) |
| `caption` | 13px | 18px | `Inter_500Medium` | Metadata, timestamps, tab labels |
| `micro` | 11px | 14px | `Inter_500Medium` | Badges, pill labels |

**Rules:**
- No font sizes outside this scale. If a screen seems to need 15px or 20px, round to the nearest defined token instead of adding a new one.
- Weights map 1:1 to Inter's loaded static weights (400/500/600/700). Do not request 300 or 800 — they aren't loaded.

---

## 3. Spacing & Grid

Base unit: **4pt**, with 8pt as the standard rhythm for most gaps.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon-to-label gaps, tight inline spacing |
| `space-2` | 8px | Default gap between related elements (e.g. label + value) |
| `space-3` | 12px | Gap between form fields, list item internal padding |
| `space-4` | 16px | **Screen container margin** (left/right), card padding |
| `space-5` | 20px | Section spacing within a screen |
| `space-6` | 24px | Gap between major sections |
| `space-8` | 32px | Top spacing below safe area / hero blocks |

**Rules:**
- Screen horizontal margins are always `space-4` (16px) — do not use 12px or 20px as a page gutter.
- All padding/margin/gap values must be multiples of 4. No 10px, 15px, 18px, etc.
- Cards use `space-4` (16px) internal padding by default.

---

## 4. Shape & Depth

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 8px | Chips, badges, small inputs |
| `radius-button` | 12px | Buttons, input fields, tab pills |
| `radius-card` | 16px | Cards, list rows, dish tiles |
| `radius-sheet` | 24px | Bottom sheets (top corners only), modals |
| `radius-full` | 999px | FAB, avatar, circular icon buttons |

**Shadow / elevation levels** (iOS shadow + Android `elevation`):

| Token | iOS (`shadowColor #000`) | Android | Usage |
|---|---|---|---|
| `elevation-0` | none | 0 | Flat elements, inline cards on a shaded surface |
| `elevation-1` | `opacity 0.06, radius 4, offset (0,1)` | 2 | Menu cards, list rows |
| `elevation-2` | `opacity 0.10, radius 8, offset (0,2)` | 4 | Sticky headers, search bar |
| `elevation-3` | `opacity 0.15, radius 16, offset (0,4)` | 8 | FAB, floating cart bar, bottom sheets |

**Rules:**
- No custom shadow values per component. Pick the closest elevation token.
- Radius values are never mixed within one component (e.g. a card doesn't get 14px because "it looked better") — snap to `radius-card`.

---

## 5. Mobile Ergonomics

- **Minimum touch target: 44×44pt** for every tappable element (buttons, icons, list rows, tab items) — even if the visible glyph is smaller, hit area must meet 44×44.
- **Thumb zone:** primary actions (Add to Cart, Checkout, Place Order) live in a **fixed bottom bar or FAB** within the bottom third of the screen — never in a top app bar or requiring a stretch to the top corners.
- **Bottom tab bar** (`app/(dashboard)/_layout.tsx`) is the primary nav — keep it to 4–5 items max, icon + `caption` label, active state colored with `accent`.
- **Safe area:** every screen respects `SafeAreaView`/`useSafeAreaInsets` on top and bottom. Bottom-fixed elements (cart FAB, checkout bar) add the bottom inset **plus** `space-3` (12px) so they never sit flush against the home indicator.
- **Floating action button (Cart FAB):** bottom-right, `56×56` circle (`radius-full`), `elevation-3`, positioned `space-4` (16px) from both edges plus safe-area inset.
- One primary action per screen. Secondary/destructive actions (e.g. "Remove item") use `text-secondary` or `destructive` color, never `accent`, to avoid competing with the main CTA.

---

## Change Process

This file only changes when the user explicitly approves a new token. When implementing a screen:
1. Reach for tokens defined above.
2. If nothing fits, **stop and ask** rather than guessing a value.
3. If approved, add the new token here first, then use it in code.
