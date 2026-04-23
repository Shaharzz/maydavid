# Video Editor Portfolio (React + Vite)

Portfolio starter tailored for a video editor, with modern animation + styling dependencies used by many `reactbits.dev` components.

## Stack

- React + TypeScript + Vite
- Tailwind CSS (utility styling)
- Framer Motion (animations)
- `class-variance-authority`, `clsx`, `tailwind-merge` (component variants + class composition)
- `lucide-react` (icons)

## Quick start

```bash
npm install
npm run dev
```

## Current structure

- `src/App.tsx`: landing page scaffold for a video-editor portfolio
- `src/components/ui/button.tsx`: reusable variant-based button
- `src/lib/utils.ts`: `cn()` helper for class merging

## Adding ReactBits components

1. Choose a component from `reactbits.dev`.
2. Install any extra package that specific component requires (for example `gsap` if it uses GSAP).
3. Drop it into `src/components` or directly into `src/App.tsx`.
4. Keep section spacing/layout in Tailwind, and animation logic in Framer Motion or the library required by that block.

## Build

```bash
npm run build
```
