# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a **Next.js 15.5.2** project with the **App Router** using:
- **TypeScript**
- **Tailwind CSS v4** (new version)
- **Turbopack** for bundling (enabled in dev and build)
- **shadcn/ui** components (configured with "new-york" style)
- **Lucide React** for icons

### Key Architecture
- `app/` - Next.js App Router pages and layouts
- `lib/` - Shared utilities (includes `cn()` utility from shadcn)
- `components/` - React components (configured but currently empty)
- Uses path aliases: `@/components`, `@/lib`, `@/utils`, `@/ui`, `@/hooks`

## Development Commands

```bash
# Development (with Turbopack)
yarn dev

# Build (with Turbopack)  
yarn build

# Production server
yarn start

# Linting
yarn lint
```

## Technical Details

### Fonts
- Primary: Geist Sans (`--font-geist-sans`)
- Monospace: Geist Mono (`--font-geist-mono`)

### Styling
- **Tailwind CSS v4** with PostCSS configuration
- Configuration: `postcss.config.js` uses `@tailwindcss/postcss` plugin
- CSS location: `app/globals.css` with `@import "tailwindcss"` and `@theme` blocks
- **Important**: Uses new v4 syntax, not traditional config files
- Custom colors defined using `oklch()` color space in CSS variables

### Component Library
- shadcn/ui configured with:
  - Style: "new-york"
  - RSC: enabled
  - CSS variables: enabled
  - Icon library: lucide-react

### Linting
- ESLint with Next.js TypeScript rules
- Ignores: `node_modules/`, `.next/`, `out/`, `build/`, `next-env.d.ts`

## Testing
- No testing framework currently configured
- No test files in project root

## Semantic Commits
This project uses a semantic commit generator in `.claude/commands/commit.md` that follows conventional commit format (`type(scope): description`).

## Important Notes
- **Tailwind CSS v4**: If styles aren't loading, ensure `postcss.config.js` exists with `@tailwindcss/postcss` plugin
- **Package Manager**: Project uses `yarn.lock` - use yarn commands, not npm
- **No TypeScript config**: Uses Next.js default TypeScript configuration