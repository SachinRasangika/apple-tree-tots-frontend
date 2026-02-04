
# Apple Tree Tots Design System

A comprehensive design system for the Apple Tree Tots Preschool website, featuring a sophisticated dark teal aesthetic with professional typography and thoughtful interactions.

## Design Tokens

### Colors

```css
/* Primary Colors */
--color-primary: #1a3a3a;      /* Deep teal - main background */
--color-secondary: #2d5555;     /* Medium teal - accents */
--color-accent: #3d6666;        /* Light teal - hover states */

/* Neutrals */
--color-white: #ffffff;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;

/* Semantic Colors */
--color-error: #ef4444;
--color-success: #10b981;
```

### Typography

```css
/* Font Families */
--font-serif: 'Playfair Display', serif;    /* Headings */
--font-sans: 'Inter', sans-serif;           /* Body text */

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px - labels, captions */
--text-sm: 0.875rem;     /* 14px - body text */
--text-base: 1rem;       /* 16px - default */
--text-lg: 1.125rem;     /* 18px - large body */
--text-xl: 1.25rem;      /* 20px - subheadings */
--text-2xl: 1.5rem;      /* 24px - section titles */
--text-3xl: 1.875rem;    /* 30px - page titles */
--text-4xl: 2.25rem;     /* 36px - hero titles */

/* Letter Spacing */
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
--tracking-ultra: 0.2em;
```

### Spacing

```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

### Borders & Shadows

```css
/* Border Widths */
--border-thin: 1px;
--border-medium: 2px;

/* Border Radius */
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.25rem;    /* 4px */
--radius-lg: 0.5rem;     /* 8px */
--radius-full: 9999px;   /* Circular */

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### Animation

```css
/* Durations */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;

/* Easings */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

## Components

### Button

Professional button component with multiple variants and sizes.

```tsx
import { Button } from './components/ui/Button'

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="text">Text Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

**Props:**
- `variant`: 'primary' | 'outline' | 'text'
- `size`: 'sm' | 'md' | 'lg'
- All standard button HTML attributes

### Input Components

Form input components with consistent styling and validation states.

```tsx
import { Input, TextArea, Select } from './components/ui/Input'

// Text Input
<Input
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  required
  error="Please enter a valid email"
/>

// Text Area
<TextArea
  label="Message"
  rows={4}
  placeholder="Enter your message"
  helperText="Maximum 500 characters"
/>

// Select
<Select
  label="Program"
  required
  options={[
    { value: 'toddler', label: 'Toddler Program' },
    { value: 'preschool', label: 'Preschool Program' }
  ]}
/>
```

**Props:**
- `label`: Optional label text
- `error`: Error message (displays in red)
- `helperText`: Helper text below input
- `required`: Shows asterisk in label

### Card Components

Versatile card components for content organization.

```tsx
import { Card, FeatureCard, ImageCard } from './components/ui/Card'

// Basic Card
<Card variant="default" padding="md" hover>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>

// Feature Card with Icon
<FeatureCard
  icon={<Icon size={24} />}
  title="Feature Title"
  description="Feature description..."
/>

// Image Card
<ImageCard
  image="/path/to/image.jpg"
  alt="Description"
  title="Image Title"
  subtitle="Subtitle"
  aspectRatio="landscape"
/>
```

**Card Props:**
- `variant`: 'default' | 'bordered' | 'elevated' | 'glass'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hover`: Boolean for hover effect

### Accordion

Collapsible content sections with smooth animations.

```tsx
import { Accordion, AccordionItem } from './components/ui/Accordion'

<Accordion>
  <AccordionItem title="Question 1" defaultOpen>
    <p>Answer content...</p>
  </AccordionItem>
  <AccordionItem title="Question 2">
    <p>Answer content...</p>
  </AccordionItem>
</Accordion>
```

### Section Headers

Consistent section and page headers with optional labels and subtitles.

```tsx
import { SectionHeader, PageHeader } from './components/ui/SectionHeader'

// Section Header
<SectionHeader
  label="Our Services"
  title="What We Offer"
  subtitle="Comprehensive early childhood education programs"
  align="center"
/>

// Page Header (for hero sections)
<PageHeader
  label="About Us"
  title="Our Story"
  subtitle="Building foundations for lifelong learning"
/>
```

### Badge & Label

Small informational components for tags and labels.

```tsx
import { Badge, Label } from './components/ui/Badge'

// Badge
<Badge variant="solid" size="md">New</Badge>
<Badge variant="outline">Featured</Badge>

// Label with Icon
<Label icon={<Icon size={12} />}>
  Ages 2-5
</Label>
```

### Icon Wrapper

Consistent icon containers with multiple styles.

```tsx
import { IconWrapper } from './components/ui/IconWrapper'

<IconWrapper
  icon={<Icon size={24} />}
  size="md"
  variant="circle"
/>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'circle' | 'square' | 'none'

### Progress Indicator

Multi-step progress visualization for forms and processes.

```tsx
import { ProgressIndicator } from './components/ui/ProgressIndicator'

<ProgressIndicator
  steps={[
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' }
  ]}
  currentStep={2}
/>
```

### Divider

Horizontal or vertical dividers with optional labels.

```tsx
import { Divider } from './components/ui/Divider'

// Simple divider
<Divider orientation="horizontal" />

// Divider with label
<Divider label="Or Continue With" />
```

## Usage Patterns

### Image Treatment

All images follow a consistent treatment pattern:

```tsx
// Grayscale with hover color reveal
<img className="grayscale group-hover:grayscale-0 transition-all duration-700" />

// Dark overlay with hover fade
<div className="absolute inset-0 bg-[#1a3a3a]/20 group-hover:bg-transparent transition-colors duration-500" />

// Scale on hover
<img className="transform group-hover:scale-105 transition-transform duration-700" />
```

### Typography Patterns

```tsx
// Section labels
<span className="text-xs tracking-[0.2em] uppercase text-[#2d5555] font-bold">
  Label Text
</span>

// Section headings
<h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase">
  Heading Text
</h2>

// Body text
<p className="text-sm text-gray-300 font-light leading-relaxed">
  Body content...
</p>
```

### Animation Patterns

```tsx
// Fade in
<div className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" />

// Fade in up (with stagger)
<div 
  className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
  style={{ animationDelay: '150ms' }}
/>
```

## Accessibility

All components follow accessibility best practices:

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus visible states
- Color contrast ratios meet WCAG AA standards
- Screen reader friendly

## Responsive Design

The design system uses a mobile-first approach:

```css
/* Breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

All components are fully responsive and adapt gracefully across screen sizes.
