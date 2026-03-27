---
description: "Portfolio Design System"
---

# Portfolio Design System Tokens

## Colors (OKLCH)
The app relies heavily on a "Tech Indigo" primary color and a "Deep Slate" dark background, using custom OKLCH variables.

### Light Mode ☀️
- **Background**: `oklch(1 0 0)` (Pure White)
- **Foreground / Text**: `oklch(0.145 0 0)` (Dark Slate)
- **Primary (Tech Indigo)**: `oklch(0.585 0.198 266.38)` 
- **Brand Gradients**: Transitions from Indigo (`oklch(0.585 0.198 266.38)`) to Cyan (`oklch(0.696 0.17 162.48)`) to Deep Violet (`oklch(0.488 0.243 264.376)`)

### Dark Mode 🌙
- **Background**: `oklch(0.105 0.05 277.117)` (Deep Slate)
- **Foreground / Text**: `oklch(0.985 0 0)` (Off White)
- **Primary**: `oklch(0.585 0.198 266.38)` (Tech Indigo stands out on Dark Slate)
- **Borders / Input**: `oklch(1 0 0 / 10%)` (Translucent White)

## Typography
- **Sans-Serif**: `var(--font-geist-sans)`
- **Monospace**: `var(--font-geist-mono)`
- **Rich Text**: 
  - `H1` text uses `text-3xl font-bold mb-4 mt-6`.
  - `H2` text uses `text-2xl font-bold mb-3 mt-5`.

## UI Components
- **Radius**: base radius is `0.625rem`. (Variables range from `radius-sm` to `radius-4xl`).
- **Loading UI**: Utilizes a skeleton shimmer animation with a linear gradient moving at 1.5s infinite linear for perceived performance optimization.
- **Glassmorphism**: Border lines in dark mode use translucent okclh values (`oklch(1 0 0 / 10%)`).

## Micro-Animations
- **Hover Transitions**: Links transition to Tech Indigo using hover colors (`hover:text-brand-middle transition-colors`).
