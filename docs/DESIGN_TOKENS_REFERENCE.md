# Design Tokens Reference

Complete reference for all CSS custom properties (design tokens) defined in the design system.

## 📍 Location
**File**: `assets/css/components.css` (lines 10-58)

---

## 📏 Spacing Scale (8px Grid System)

Based on an 8-pixel base unit for consistent, scalable spacing across all components.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--space-xs` | `0.5rem` | 8px | Tight spacing, small gaps |
| `--space-sm` | `0.75rem` | 12px | Compact elements |
| `--space-md` | `1rem` | 16px | Default spacing |
| `--space-lg` | `1.5rem` | 24px | Comfortable spacing |
| `--space-xl` | `2rem` | 32px | Generous spacing |
| `--space-2xl` | `3rem` | 48px | Section spacing |

### Usage Examples
```css
/* Compact card */
.card--compact {
  padding: var(--space-md);  /* 16px */
}

/* Standard card */
.card {
  padding: var(--space-lg);  /* 24px */
}

/* Large card */
.card--large {
  padding: var(--space-xl);  /* 32px */
}

/* Card grid gap */
.card-grid {
  gap: var(--space-lg);  /* 24px between cards */
}
```

---

## 🔄 Border Radius Scale

Consistent corner rounding for all components.

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Subtle rounding, small elements |
| `--radius-md` | `8px` | Standard rounding, most cards |
| `--radius-lg` | `12px` | Pronounced rounding, featured cards |
| `--radius-xl` | `16px` | Strong rounding |
| `--radius-2xl` | `20px` | Extra strong rounding |
| `--radius-round` | `25px` | Pill-shaped buttons |

### Visual Guide
```
--radius-sm  (4px)    ╭─╮  Subtle
--radius-md  (8px)    ╭──╮  Standard
--radius-lg  (12px)   ╭───╮  Card default
--radius-xl  (16px)   ╭────╮  Strong
--radius-2xl (20px)   ╭─────╮  Extra strong
--radius-round (25px) ╭──────╮  Pill-shaped
```

### Usage Examples
```css
/* Video wrapper */
.video-wrapper iframe {
  border-radius: var(--radius-sm);  /* 4px */
}

/* YouTube cards */
.youtube-video-card {
  border-radius: var(--radius-md);  /* 8px */
}

/* Standard cards */
.card {
  border-radius: var(--radius-lg);  /* 12px */
}

/* Rounded buttons */
.btn--rounded {
  border-radius: var(--radius-round);  /* 25px */
}
```

---

## 🌓 Shadow Scale

Four-level shadow system for depth and elevation.

| Token | Value | Visual Effect | Usage |
|-------|-------|---------------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.1)` | Subtle lift | Hover states, flat cards |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.1)` | Standard elevation | Default cards, buttons |
| `--shadow-lg` | `0 4px 12px rgba(0,0,0,0.15)` | High elevation | Hover effects, modals |
| `--shadow-xl` | `0 8px 24px rgba(0,0,0,0.2)` | Maximum elevation | Floating elements, popovers |

### Shadow Anatomy
```
0 1px 3px rgba(0,0,0,0.1)
│ │   │   └─────────────── Opacity (10% black)
│ │   └───────────────── Blur radius
│ └───────────────────── Vertical offset
└─────────────────────── Horizontal offset
```

### Usage Examples
```css
/* Subtle card */
.youtube-video-card {
  box-shadow: var(--shadow-sm);  /* Minimal shadow */
}

/* Standard card */
.card {
  box-shadow: var(--shadow-md);  /* Default shadow */
}

/* Hovered card */
.card:hover {
  box-shadow: var(--shadow-lg);  /* Enhanced shadow */
}

/* Connect card hover */
.connect-card:hover {
  box-shadow: var(--shadow-xl);  /* Maximum shadow */
}
```

---

## 🎨 Color Tokens

Colors for cards and components with automatic dark mode support.

### Light Mode (Default)

| Token | Value | Usage |
|-------|-------|-------|
| `--card-bg` | `#ffffff` | Main card background |
| `--card-bg-light` | `#f8f9fa` | Subtle backgrounds |
| `--card-bg-dark` | `#f0f0f0` | Alternative backgrounds |
| `--card-border` | `#e0e0e0` | Borders and dividers |
| `--card-text` | `#333333` | Primary text |
| `--card-text-muted` | `#666666` | Secondary text, captions |

### Dark Mode (Auto-detected)

When user has `prefers-color-scheme: dark`:

| Token | Light Value | Dark Value |
|-------|-------------|------------|
| `--card-bg` | `#ffffff` | `#1a1a1a` |
| `--card-bg-light` | `#f8f9fa` | `#252525` |
| `--card-bg-dark` | `#f0f0f0` | `#2a2a2a` |
| `--card-border` | `#e0e0e0` | `#404040` |
| `--card-text` | `#333333` | `#e0e0e0` |
| `--card-text-muted` | `#666666` | `#a0a0a0` |

### Usage Examples
```css
/* Standard card */
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--card-text);
}

/* Card with light background */
.achievement-card {
  background: var(--card-bg-light);
}

/* Muted text */
.blog-card__date {
  color: var(--card-text-muted);
}
```

---

## ⚡ Transition Tokens

Standardized animation timing for consistent motion.

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | `0.2s ease` | Quick interactions, small elements |
| `--transition-normal` | `0.3s ease` | Standard animations, most effects |
| `--transition-slow` | `0.4s ease` | Deliberate animations, large elements |

### Usage Examples
```css
/* Card hover effect */
.card {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

/* Button shadow */
.btn--shadow {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

/* Icon scale */
.connect-card i {
  transition: transform var(--transition-normal);
}
```

---

## 🔧 How to Use Design Tokens

### 1. Direct Reference
Use tokens directly in your CSS:

```css
.my-component {
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  background: var(--card-bg);
}
```

### 2. Combining Tokens
Mix tokens for complex effects:

```css
.card--special {
  padding: var(--space-xl) var(--space-lg);  /* Vertical + Horizontal */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-normal);
}

.card--special:hover {
  box-shadow: var(--shadow-xl);
}
```

### 3. Override for Special Cases
Tokens can be overridden when needed:

```css
.hero-card {
  /* Use larger spacing for hero */
  padding: var(--space-2xl);
  
  /* But keep standard border */
  border-radius: var(--radius-lg);
}
```

---

## 🎯 Token Benefits

### ✅ Consistency
All components use the same spacing/colors/shadows:
```css
/* Before: Inconsistent */
.card-1 { padding: 15px; }
.card-2 { padding: 1.2rem; }
.card-3 { padding: 20px; }

/* After: Consistent */
.card-1 { padding: var(--space-md); }  /* 16px */
.card-2 { padding: var(--space-lg); }  /* 24px */
.card-3 { padding: var(--space-xl); }  /* 32px */
```

### ✅ Themability
Change site-wide appearance by updating tokens:
```css
:root {
  /* Change once, affects everywhere */
  --radius-lg: 16px;  /* Changed from 12px */
  --shadow-md: 0 3px 10px rgba(0,0,0,0.12);  /* Updated shadow */
}
```

### ✅ Dark Mode
Automatic theme switching:
```css
/* Light mode */
:root {
  --card-bg: #ffffff;
}

/* Dark mode (auto-applied) */
@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: #1a1a1a;
  }
}
```

### ✅ Maintainability
One source of truth:
```css
/* Easy to maintain */
.card { padding: var(--space-lg); }
.modal { padding: var(--space-lg); }
.section { padding: var(--space-lg); }

/* Instead of scattered magic numbers */
.card { padding: 24px; }
.modal { padding: 1.5rem; }
.section { padding: 24px; }
```

---

## 📊 Token Usage Map

Where each token is used in the design system:

### Spacing Tokens
- `--space-xs` → Button icon gaps, small margins, tag padding
- `--space-sm` → Card title margins, compact elements
- `--space-md` → Default card padding, standard spacing
- `--space-lg` → Card padding, grid gaps, comfortable spacing
- `--space-xl` → Large cards, connect cards, generous spacing
- `--space-2xl` → Section spacing, hero padding

### Radius Tokens
- `--radius-sm` → Video iframes, small images
- `--radius-md` → YouTube cards, icons, badges
- `--radius-lg` → Standard cards, default rounding
- `--radius-round` → Rounded buttons, pills

### Shadow Tokens
- `--shadow-sm` → YouTube cards, subtle effects, flat card hovers
- `--shadow-md` → Default cards, standard elevation
- `--shadow-lg` → Card hovers, elevated cards
- `--shadow-xl` → Connect card hovers, floating elements

### Color Tokens
- `--card-bg` → All card backgrounds
- `--card-bg-light` → YouTube cards, achievement cards
- `--card-border` → All borders
- `--card-text` → Headings, primary content
- `--card-text-muted` → Dates, captions, descriptions

---

## 🧪 Testing Tokens

### Browser DevTools
Test token changes in real-time:
```javascript
// In browser console
document.documentElement.style.setProperty('--radius-lg', '20px');
document.documentElement.style.setProperty('--shadow-md', '0 5px 15px rgba(0,0,0,0.2)');
```

### Dark Mode Testing
Test dark mode without changing system settings:
```css
/* Add to CSS temporarily */
:root {
  --card-bg: #1a1a1a;
  --card-text: #e0e0e0;
  /* ... other dark mode values */
}
```

---

## 📝 Best Practices

### ✅ DO
- Use tokens for all spacing, colors, shadows
- Combine tokens for complex layouts
- Reference tokens consistently
- Document custom token usage

### ❌ DON'T
- Use magic numbers (hardcoded values)
- Override tokens without reason
- Mix token system with inline styles
- Create tokens for one-off values

---

## 🎓 Token Philosophy

### Scale Over Arbitrary Values
```css
/* Good: Uses scale */
padding: var(--space-lg);  /* 24px from scale */

/* Bad: Arbitrary value */
padding: 23px;  /* Why 23px? Not in scale */
```

### Semantic Naming
```css
/* Good: Describes purpose */
--card-bg-light  /* Light background for cards */

/* Bad: Implementation detail */
--color-gray-50  /* What's it for? */
```

### Predictable Progression
```
xs → sm → md → lg → xl → 2xl
8px → 12px → 16px → 24px → 32px → 48px
(Clear progression, easy to remember)
```

---

## 🚀 Future Enhancements

### Potential Additions
```css
/* Color system expansion */
--color-primary: #your-brand-color;
--color-secondary: #your-secondary-color;
--color-accent: #your-accent-color;

/* Typography scale */
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;

/* Z-index scale */
--z-dropdown: 1000;
--z-modal: 2000;
--z-tooltip: 3000;
```

---

## ✅ Status

**Implementation**: ✅ Complete  
**Testing**: ✅ Build passes  
**Documentation**: ✅ Complete  
**Usage**: Ready for adoption across site

All design tokens are defined, documented, and ready to use! 🎉
