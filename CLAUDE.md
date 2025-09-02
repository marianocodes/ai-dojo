# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "socialgram" built with TypeScript, TailwindCSS v4, and shadcn/ui components. The project uses the App Router architecture and includes modern development tooling.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build for production**: `npm run build` (uses Turbopack)
- **Start production server**: `npm start`
- **Lint code**: `npm run lint` (ESLint with Next.js TypeScript preset)

## Architecture & Structure

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components (currently minimal)
- `lib/` - Utility functions and shared logic
- `public/` - Static assets

### Key Configuration Files
- `components.json` - shadcn/ui configuration (New York style, RSC enabled)
- `tsconfig.json` - TypeScript configuration with `@/*` path aliases
- `_eslint.config.mjs` - ESLint configuration extending Next.js TypeScript rules
- `next.config.ts` - Next.js configuration (minimal setup)

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4 with custom theme variables
- **Components**: shadcn/ui (configured for New York style)
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono
- **Build Tool**: Turbopack (Next.js integrated)

### Styling System
- Uses TailwindCSS v4 with CSS variables for theming
- Dark mode support via CSS custom properties
- Color system based on OKLCH for better color perception
- Custom radius and spacing variables defined in `globals.css`

### Path Aliases
- `@/*` maps to project root
- `@/components` for components directory  
- `@/lib` for utilities and shared logic
- `@/hooks` for custom React hooks (directory not yet created)

## Development Notes

- Project uses Turbopack for faster development and build times
- ESLint is configured with Next.js TypeScript rules
- The application is currently in early development stage with default Next.js starter content
- shadcn/ui is configured but no custom components have been added yet