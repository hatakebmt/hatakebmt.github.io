# Design System Documentation

This design system provides standardized components for buttons and cards across the Jekyll site.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Design Tokens](#design-tokens)
- [Button Components](#button-components)
- [Card Components](#card-components)
- [Grid Layouts](#grid-layouts)
- [Accessibility](#accessibility)
- [Migration Guide](#migration-guide)

---

## 🚀 Getting Started

The design system is automatically loaded via `assets/css/components.css` in the site's `<head>`.

### File Structure
```
assets/css/
├── main.css          # Minimal Mistakes theme styles
├── components.css    # Design system (NEW)
└── responsive.css    # Responsive overrides
```

---

## 🎨 Design Tokens

All design tokens are defined as CSS custom properties (CSS variables) for consistency.

### Spacing Scale (8px grid)
```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 0.75rem;  /* 12px */
--space-md: 1rem;     /* 16px */
--space-lg: 1.5rem;   /* 24px */
--space-xl: 2rem;     /* 32px */
--space-2xl: 3rem;    /* 48px */
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-round: 25px;
```

### Box Shadows
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.2);
```

### Colors
```css
--card-bg: #ffffff;
--card-bg-light: #f8f9fa;
--card-border: #e0e0e0;
--card-text: #333333;
--card-text-muted: #666666;
```

---

## 🔘 Button Components

### Theme Buttons (Existing)
Use the Minimal Mistakes theme buttons as the base:

```html
<a href="#" class="btn btn--primary">Primary Button</a>
<a href="#" class="btn btn--secondary">Secondary Button</a>
<a href="#" class="btn btn--success">Success Button</a>
<a href="#" class="btn btn--info">Info Button</a>
<a href="#" class="btn btn--warning">Warning Button</a>
<a href="#" class="btn btn--danger">Danger Button</a>
```

### Size Variants
```html
<a href="#" class="btn btn--primary btn--large">Large Button</a>
<a href="#" class="btn btn--primary">Default Button</a>
<a href="#" class="btn btn--primary btn--small">Small Button</a>
```

### NEW: Extended Button Variants

#### Rounded Buttons
```html
<a href="#" class="btn btn--primary btn--rounded">Rounded Button</a>
```

#### Outlined Buttons
```html
<a href="#" class="btn btn--primary btn--outline">Outlined Button</a>
```

#### Icon Buttons
```html
<a href="#" class="btn btn--primary btn--icon">
  <i class="fas fa-download"></i>
  Download
</a>
```

#### Shadow Buttons
```html
<a href="#" class="btn btn--primary btn--shadow">Shadow Button</a>
```

### Button Combinations
```html
<!-- Rounded + Shadow + Icon -->
<a href="#" class="btn btn--primary btn--rounded btn--shadow btn--icon">
  <i class="fas fa-envelope"></i>
  Contact Me
</a>
```

---

## 📦 Card Components

### Base Card
The foundation for all card components:

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
    <p class="card__subtitle">Card Subtitle</p>
  </div>
  <div class="card__body">
    <p>Card content goes here...</p>
  </div>
  <div class="card__footer">
    Footer information
  </div>
</div>
```

### Card with Icon
```html
<div class="card">
  <i class="card__icon fas fa-rocket"></i>
  <h3 class="card__title">Feature Title</h3>
  <p>Feature description...</p>
</div>
```

### Card Variants

#### Size Variants
```html
<div class="card card--compact">Compact card</div>
<div class="card">Default card</div>
<div class="card card--large">Large card</div>
```

#### Visual Variants
```html
<div class="card card--flat">Flat (no shadow)</div>
<div class="card card--elevated">Elevated (more shadow)</div>
<div class="card card--light">Light background</div>
<div class="card card--borderless">No border</div>
```

#### Behavior Variants
```html
<div class="card card--static">No hover effect</div>
<div class="card card--interactive">Enhanced clickable</div>
```

#### Layout Variants
```html
<div class="card card--horizontal">
  <i class="card__icon fas fa-star"></i>
  <div>
    <h3 class="card__title">Horizontal Card</h3>
    <p>Content next to icon</p>
  </div>
</div>
```

---

## 🎯 Specific Card Types

### YouTube Video Card
```html
<div class="youtube-video-card">
  <h3>Video Title</h3>
  <div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
  </div>
  <p>Video description</p>
</div>
```

### Blog Card
```html
<a href="/blog/post" class="blog-card">
  <span class="blog-card__date">Nov 23, 2025</span>
  <h3 class="blog-card__title">Blog Post Title</h3>
  <p class="blog-card__excerpt">Post excerpt...</p>
  <div class="blog-card__tags">
    <span class="blog-card__tag">AI</span>
    <span class="blog-card__tag">Machine Learning</span>
  </div>
</a>
```

### Connect Card
```html
<a href="/contact/" class="connect-card">
  <i class="fas fa-envelope"></i>
  <h4>Get in Touch</h4>
  <p>Send me a message</p>
</a>
```

### Achievement Card
```html
<div class="achievement-card">
  <i class="achievement-card__icon fas fa-trophy"></i>
  <h4 class="achievement-card__title">Achievement Title</h4>
  <p class="achievement-card__description">Achievement details...</p>
</div>
```

---

## 📐 Grid Layouts

### Basic Grid
```html
<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

### Column Variants
```html
<!-- 2 columns -->
<div class="card-grid card-grid--2col">...</div>

<!-- 3 columns -->
<div class="card-grid card-grid--3col">...</div>

<!-- 4 columns -->
<div class="card-grid card-grid--4col">...</div>
```

### Spacing Variants
```html
<!-- Compact spacing -->
<div class="card-grid card-grid--compact">...</div>

<!-- Default spacing -->
<div class="card-grid">...</div>

<!-- Spacious -->
<div class="card-grid card-grid--spacious">...</div>
```

---

## ♿ Accessibility Features

### Keyboard Navigation
- All cards and buttons are keyboard accessible
- Focus states use 3px outline with 2px offset
- Tab order follows logical content flow

### Screen Readers
- Semantic HTML structure
- Proper heading hierarchy in cards
- Link text clearly describes destination

### Reduced Motion
Users with `prefers-reduced-motion` preference:
- All transforms disabled
- No hover animations

### High Contrast
Users with `prefers-contrast: high`:
- Border width increased to 2px
- Better visual separation

### Color Contrast
- All text meets WCAG AA standards
- Theme buttons use `yiq-contrasted` mixin for accessible colors

---

## 🔄 Migration Guide

### Step 1: Remove Inline Styles

**Before:**
```html
<div class="youtube-video-card" style="background: #f8f9fa; padding: 15px;">
  ...
</div>
```

**After:**
```html
<div class="youtube-video-card">
  ...
</div>
```

### Step 2: Update Class Names

**Connect Cards (index.html)**

**Before:**
```html
<a href="/contact/" class="connect-card">
  <!-- No styles defined! -->
</a>
```

**After:**
```html
<a href="/contact/" class="connect-card">
  <!-- Now has proper styling from components.css -->
</a>
```

### Step 3: Standardize Blog Cards

**Before:**
```html
<div class="blog-card">
  <!-- Minimal styling -->
</div>
```

**After:**
```html
<a href="/post/" class="blog-card">
  <span class="blog-card__date">Nov 23, 2025</span>
  <h3 class="blog-card__title">Title</h3>
  <p class="blog-card__excerpt">Excerpt...</p>
</a>
```

### Step 4: Extract About Page CSS

Move inline `<style>` tags from `_pages/about.md` to:
- Use standard `.card` classes
- Use `.achievement-card` for achievements
- Use theme `.btn` classes instead of custom overrides

### Step 5: Update Button Usage

**Before (about.md):**
```html
<style>
.btn--primary {
  padding: 1rem 2rem;
  border-radius: 25px;
}
</style>
<a class="btn btn--primary">Button</a>
```

**After:**
```html
<a class="btn btn--primary btn--rounded">Button</a>
```

---

## 🧪 Testing Checklist

- [ ] Test all card types on desktop (1920px)
- [ ] Test all card types on tablet (768px)
- [ ] Test all card types on mobile (375px)
- [ ] Verify keyboard navigation works
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Verify dark mode appearance
- [ ] Check reduced motion preference
- [ ] Validate color contrast ratios
- [ ] Test all button variants
- [ ] Verify hover states work properly

---

## 📚 Examples

### Homepage Hero Section
```html
<div class="page__hero">
  <h1>Welcome</h1>
  <p>Subtitle text</p>
  <a href="/about/" class="btn btn--primary btn--large btn--shadow">
    Learn More
  </a>
</div>
```

### Connect Section
```html
<div class="card-grid card-grid--4col">
  <a href="/contact/" class="connect-card">
    <i class="fas fa-envelope"></i>
    <h4>Get in Touch</h4>
    <p>Send me a message</p>
  </a>
  
  <a href="https://github.com/username" class="connect-card">
    <i class="fab fa-github"></i>
    <h4>GitHub</h4>
    <p>View my projects</p>
  </a>
  
  <a href="https://linkedin.com/in/username" class="connect-card">
    <i class="fab fa-linkedin"></i>
    <h4>LinkedIn</h4>
    <p>Professional network</p>
  </a>
  
  <a href="/collaborate/" class="connect-card">
    <i class="fas fa-handshake"></i>
    <h4>Collaborate</h4>
    <p>Work together</p>
  </a>
</div>
```

### Blog Preview Section
```html
<div class="card-grid card-grid--3col">
  {% for post in site.posts limit:3 %}
  <a href="{{ post.url }}" class="blog-card">
    <span class="blog-card__date">{{ post.date | date: "%b %d, %Y" }}</span>
    <h3 class="blog-card__title">{{ post.title }}</h3>
    <p class="blog-card__excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
    <div class="blog-card__tags">
      {% for tag in post.tags %}
      <span class="blog-card__tag">{{ tag }}</span>
      {% endfor %}
    </div>
  </a>
  {% endfor %}
</div>
```

---

## 🤝 Contributing

When adding new components:

1. Use existing design tokens
2. Follow BEM naming convention (`.block__element--modifier`)
3. Include hover states
4. Add accessibility features
5. Test responsive behavior
6. Document usage in this guide

---

## 📝 Version History

### v1.0.0 (November 2025)
- Initial design system release
- Standardized button extensions
- Base card component with variants
- Specific card types (YouTube, Blog, Connect, Achievement)
- Grid layout system
- Full accessibility support
- Dark mode support
- Reduced motion support
