# SCSS Modules Guide

This project uses a **hybrid approach** combining Tailwind CSS with SCSS modules for maximum flexibility.

## When to Use Each

### Use Tailwind CSS (Default)
- ✅ Rapid prototyping and layout
- ✅ Responsive design with breakpoints
- ✅ Standard UI patterns (buttons, cards, forms)
- ✅ Utility-first approach
- ✅ Most of your styling needs

### Use SCSS Modules
- ✅ Complex component-specific styles
- ✅ Advanced animations
- ✅ Deeply nested selectors
- ✅ Style composition and inheritance
- ✅ Component-scoped custom styles

## Project Structure

```
src/
├── styles/
│   ├── _variables.scss    # Global SCSS variables
│   └── _mixins.scss       # Reusable SCSS mixins
├── components/
│   └── ui/
│       ├── ExampleButton.tsx           # Component file
│       └── ExampleButton.module.scss   # Component styles
```

## How to Use SCSS Modules

### 1. Create a SCSS Module File

File naming: `ComponentName.module.scss`

```scss
// src/components/ui/MyComponent.module.scss
@import '@/styles/variables';
@import '@/styles/mixins';

.container {
  padding: $spacing-lg;
  border-radius: $radius-md;

  @include transition(all);

  &:hover {
    background-color: $bg-light;
  }

  @include dark {
    background-color: $bg-dark;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 600;

  @include md {
    font-size: 2rem;
  }
}
```

### 2. Import and Use in Your Component

```tsx
// src/components/ui/MyComponent.tsx
import styles from './MyComponent.module.scss';

export default function MyComponent() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hello World</h2>
    </div>
  );
}
```

### 3. Combine with Tailwind (Hybrid Approach)

```tsx
import styles from './MyComponent.module.scss';

export default function MyComponent() {
  return (
    // Use Tailwind for layout and basic styling
    <div className="flex items-center gap-4">
      {/* Use SCSS module for complex custom styles */}
      <div className={styles.customBox}>
        Content
      </div>
      {/* Mix both approaches */}
      <button className={`${styles.button} hover:scale-105`}>
        Click Me
      </button>
    </div>
  );
}
```

## Available Variables

### Colors
```scss
$color-primary: #000000;
$color-secondary: #71717a;
$color-accent: #ffffff;

$bg-light: #fafafa;
$bg-dark: #000000;

$text-primary-light: #18181b;
$text-primary-dark: #fafafa;
$text-secondary-light: #52525b;
$text-secondary-dark: #a1a1aa;
```

### Spacing
```scss
$spacing-xs: 0.5rem;   // 8px
$spacing-sm: 0.75rem;  // 12px
$spacing-md: 1rem;     // 16px
$spacing-lg: 1.5rem;   // 24px
$spacing-xl: 2rem;     // 32px
$spacing-2xl: 3rem;    // 48px
```

### Border Radius
```scss
$radius-sm: 0.375rem;  // 6px
$radius-md: 0.5rem;    // 8px
$radius-lg: 0.75rem;   // 12px
```

### Breakpoints
```scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

## Available Mixins

### Responsive Design
```scss
.component {
  padding: 1rem;

  @include sm {
    padding: 1.5rem;
  }

  @include md {
    padding: 2rem;
  }

  @include lg {
    padding: 3rem;
  }
}
```

### Dark Mode
```scss
.button {
  background-color: white;
  color: black;

  @include dark {
    background-color: black;
    color: white;
  }
}
```

### Flexbox Helpers
```scss
.centered {
  @include flex-center; // centers items
}

.spaceBetween {
  @include flex-between; // space-between with align-center
}
```

### Transitions
```scss
.element {
  @include transition(all); // default 200ms
  @include transition(opacity, 300ms); // custom duration
}
```

### Text Utilities
```scss
.singleLine {
  @include truncate; // ellipsis overflow
}

.multiLine {
  @include line-clamp(3); // truncate to 3 lines
}
```

## Example Component

See `src/components/ui/ExampleButton.tsx` for a full working example that demonstrates:
- SCSS module imports
- Using variables and mixins
- Responsive styles
- Dark mode support
- Style composition

## Best Practices

### 1. **Keep It Scoped**
SCSS modules are component-scoped. Use them for component-specific styles only.

### 2. **Use Tailwind First**
Start with Tailwind. Only use SCSS modules when you need:
- Complex nested selectors
- Advanced animations
- Component-specific variables

### 3. **Import Variables and Mixins**
Always import at the top of your SCSS module:
```scss
@import '@/styles/variables';
@import '@/styles/mixins';
```

### 4. **Match Tailwind's Design System**
Use the variables that match Tailwind's values to maintain consistency.

### 5. **Name Classes Semantically**
```scss
// Good ✅
.cardHeader { }
.buttonPrimary { }
.navigationMenu { }

// Avoid ❌
.blue { }
.big { }
.mt20 { }
```

### 6. **Compose Styles**
```tsx
// Combine multiple classes
const classes = [
  styles.button,
  styles.primary,
  isLoading && styles.loading
]
  .filter(Boolean)
  .join(' ');
```

## TypeScript Support

SCSS modules are fully typed in TypeScript. You'll get autocomplete for your class names:

```tsx
import styles from './Component.module.scss';

// TypeScript knows about all your classes
<div className={styles.container}>  // ✅ Autocomplete works
<div className={styles.typo}>       // ❌ TypeScript error
```

## Hot Module Replacement

SCSS changes are applied instantly during development. No need to refresh the page.

## Production Build

- SCSS is compiled to CSS at build time
- Styles are automatically scoped (no naming conflicts)
- Unused styles are tree-shaken
- CSS is minified and optimized

## Further Reading

- [Next.js SCSS Support](https://nextjs.org/docs/app/building-your-application/styling/sass)
- [CSS Modules Spec](https://github.com/css-modules/css-modules)
- [Sass Documentation](https://sass-lang.com/documentation)
