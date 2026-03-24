# CDNTV Installation & Setup Guide

This document provides a comprehensive guide for installing and setting up the CDNTV project, including all dependencies, plugins, and configuration requirements.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Dependencies](#dependencies)
- [Development Tools](#development-tools)
- [Configuration Files](#configuration-files)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before installing the project, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Verify npm: `npm --version`

2. **npm** (v9.0.0 or higher) - Comes with Node.js
   - Verify installation: `npm --version`

3. **Git** (Optional, for version control)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

### Recommended Tools

- **VS Code** or any modern code editor
- **Git** for version control
- **Chrome/Edge/Firefox** for testing

---

## Installation Steps

### 1. Clone or Navigate to Project Directory

```bash
cd "C:\Users\Guilherme Poeta\Desktop\We Are CDN\TV\Website\main-page-react"
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`. The installation process may take a few minutes.

### 3. Verify Installation

After installation, verify that `node_modules` folder has been created and contains all packages.

---

## Dependencies

### Production Dependencies

#### Core Framework & Libraries
- **next** (^15.5.4) - React framework for production
- **react** (^19.1.0) - JavaScript library for building user interfaces
- **react-dom** (^19.1.0) - React package for DOM rendering
- **typescript** (^5) - TypeScript language support

#### UI Component Libraries
- **@radix-ui/react-accordion** (^1.2.12) - Accessible accordion component
- **@radix-ui/react-alert-dialog** (^1.1.15) - Alert dialog component
- **@radix-ui/react-aspect-ratio** (^1.1.7) - Aspect ratio component
- **@radix-ui/react-avatar** (^1.1.10) - Avatar component
- **@radix-ui/react-checkbox** (^1.3.3) - Checkbox component
- **@radix-ui/react-collapsible** (^1.1.12) - Collapsible component
- **@radix-ui/react-context-menu** (^2.2.16) - Context menu component
- **@radix-ui/react-dialog** (^1.1.15) - Dialog component
- **@radix-ui/react-dropdown-menu** (^2.1.16) - Dropdown menu component
- **@radix-ui/react-hover-card** (^1.1.15) - Hover card component
- **@radix-ui/react-label** (^2.1.7) - Label component
- **@radix-ui/react-menubar** (^1.1.16) - Menubar component
- **@radix-ui/react-navigation-menu** (^1.2.14) - Navigation menu component
- **@radix-ui/react-popover** (^1.1.15) - Popover component
- **@radix-ui/react-progress** (^1.1.7) - Progress indicator component
- **@radix-ui/react-radio-group** (^1.3.8) - Radio group component
- **@radix-ui/react-scroll-area** (^1.2.10) - Scrollable area component
- **@radix-ui/react-select** (^2.2.6) - Select component
- **@radix-ui/react-separator** (^1.1.7) - Separator component
- **@radix-ui/react-slider** (^1.3.6) - Slider component
- **@radix-ui/react-slot** (^1.2.3) - Slot component
- **@radix-ui/react-switch** (^1.2.6) - Switch component
- **@radix-ui/react-tabs** (^1.1.13) - Tabs component
- **@radix-ui/react-toggle** (^1.1.10) - Toggle component
- **@radix-ui/react-toggle-group** (^1.1.11) - Toggle group component
- **@radix-ui/react-tooltip** (^1.2.8) - Tooltip component

#### Animation & Motion
- **framer-motion** (^12.23.22) - Production-ready motion library for React
- **react-intersection-observer** (^10.0.0) - React hook for Intersection Observer API

#### Form Handling
- **react-hook-form** (^7.63.0) - Performant, flexible and extensible forms
- **@hookform/resolvers** (^5.2.2) - Validation resolvers for react-hook-form
- **zod** (^4.1.11) - TypeScript-first schema validation

#### Styling & UI Utilities
- **tailwind-merge** (^3.3.1) - Merge Tailwind CSS classes without style conflicts
- **class-variance-authority** (^0.7.1) - For creating type-safe variant APIs
- **clsx** (^2.1.1) - Utility for constructing className strings conditionally

#### 3D Graphics & WebGL
- **ogl** (^1.0.11) - Minimal WebGL library

#### Data Visualization
- **recharts** (^2.15.4) - Composable charting library built on React components

#### Carousel & UI Components
- **embla-carousel-react** (^8.6.0) - Carousel library for React
- **cmdk** (^1.1.1) - Command menu component
- **vaul** (^1.1.2) - Drawer component for React
- **sonner** (^2.0.7) - Toast notifications

#### Date & Time
- **date-fns** (^4.1.0) - Modern JavaScript date utility library
- **react-day-picker** (^9.11.0) - Date picker component

#### Icons & UI Elements
- **lucide-react** (^0.544.0) - Beautiful & consistent icon toolkit

#### Other Utilities
- **input-otp** (^1.4.2) - OTP input component
- **react-resizable-panels** (^3.0.6) - Resizable panel layouts
- **next-themes** (^0.4.6) - Theme switching for Next.js

### Development Dependencies

#### TypeScript Types
- **@types/node** (^20) - TypeScript definitions for Node.js
- **@types/react** (^19) - TypeScript definitions for React
- **@types/react-dom** (^19) - TypeScript definitions for React DOM

#### Linting & Code Quality
- **eslint** (^9) - JavaScript and TypeScript linter
- **eslint-config-next** (15.5.4) - ESLint configuration for Next.js
- **@eslint/eslintrc** (^3) - ESLint configuration utilities

#### Styling & CSS
- **tailwindcss** (^4) - Utility-first CSS framework
- **@tailwindcss/postcss** (^4) - PostCSS plugin for Tailwind CSS
- **tw-animate-css** (^1.4.0) - Additional animations for Tailwind CSS

---

## Development Tools

### Build Tools
- **Next.js** - React framework with built-in optimizations
- **TypeScript** - Type-safe JavaScript
- **PostCSS** - CSS processing tool
- **Tailwind CSS** - Utility-first CSS framework

### Code Quality Tools
- **ESLint** - JavaScript/TypeScript linter
- **TypeScript Compiler** - Type checking and compilation

---

## Configuration Files

### 1. `package.json`
- Contains all project dependencies and scripts
- Scripts:
  - `npm run dev` - Start development server on port 3001
  - `npm run build` - Build for production
  - `npm run start` - Start production server on port 3001
  - `npm run lint` - Run ESLint

### 2. `tsconfig.json`
- TypeScript compiler configuration
- Path aliases: `@/*` maps to `./src/*`
- Target: ES2017
- Module: ESNext

### 3. `next.config.ts`
- Next.js configuration file
- Contains build and runtime settings

### 4. `postcss.config.mjs`
- PostCSS configuration
- Includes Tailwind CSS plugin

### 5. `eslint.config.mjs`
- ESLint configuration
- Uses Next.js ESLint config

### 6. `components.json`
- shadcn/ui components configuration
- Defines component paths and styling

---

## Project Structure

```
main-page-react/
├── public/                 # Static assets
│   ├── fonts/            # Custom fonts (Depot, Ethnocentric, Inter)
│   └── *.jpg, *.png      # Images and assets
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   ├── services/     # Services page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/       # React components
│   │   ├── Team/         # Team section components
│   │   │   ├── css/      # Team section styles
│   │   │   ├── ProfileCard.tsx
│   │   │   └── TeamSection.tsx
│   │   └── ui/           # UI components (shadcn/ui)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   └── utils/            # Utility functions
├── components.json       # shadcn/ui config
├── eslint.config.mjs     # ESLint config
├── next.config.ts        # Next.js config
├── package.json          # Dependencies
├── postcss.config.mjs    # PostCSS config
└── tsconfig.json         # TypeScript config
```

---

## Running the Project

### Development Mode

Start the development server on port 3001:

```bash
npm run dev
```

The application will be available at:
- **Home**: http://localhost:3001
- **About**: http://localhost:3001/about
- **Services**: http://localhost:3001/services
- **Contact**: http://localhost:3001/contact

### Production Build

Build the project for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

---

## Key Features & Components

### Custom Components
- **Orb** - 3D WebGL orb component
- **LightRays** - Animated light rays effect
- **ProfileCard** - Interactive 3D tilt profile card
- **TeamSection** - Team member display section
- **FloatingNav** - Floating navigation bar
- **HeroSection** - Hero section with animations
- **ServicesSection** - Services display
- **ProjectsSection** - Projects showcase
- **CTASection** - Call-to-action section

### Custom Hooks
- **useIsMobile** - Mobile device detection hook

### Animations
- Framer Motion animations
- Scroll-triggered animations
- Intersection Observer for viewport detection
- 3D tilt effects on profile cards

---

## Port Configuration

The project is configured to run on **port 3001** by default.

To change the port, modify the scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p YOUR_PORT",
    "start": "next start -p YOUR_PORT"
  }
}
```

---

## Troubleshooting

### Port Already in Use

If port 3001 is already in use:

1. Find the process using the port:
   ```bash
   netstat -ano | findstr :3001
   ```

2. Kill the process (replace PID with actual process ID):
   ```bash
   taskkill /PID <PID> /F
   ```

3. Or change the port in `package.json`

### Installation Issues

If you encounter installation errors:

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

### TypeScript Errors

If you see TypeScript errors:

1. Restart your TypeScript server in your IDE
2. Run `npm run build` to check for compilation errors
3. Ensure all type definitions are installed

### Build Errors

If the build fails:

1. Check Node.js version (should be v18+)
2. Clear `.next` folder:
   ```bash
   rm -rf .next
   ```

3. Rebuild:
   ```bash
   npm run build
   ```

### Missing Dependencies

If you see "module not found" errors:

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

2. Check if the package exists in `package.json`

---

## Additional Resources

### Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### Fonts Used
- **Depot** - Custom font (located in `public/fonts/`)
- **Ethnocentric** - Custom font (located in `public/fonts/`)
- **Inter** - System font fallback
- **Orbitron** - Google Fonts (loaded via Next.js)

---

## Version Information

- **Next.js**: 15.5.4
- **React**: 19.1.0
- **TypeScript**: ^5
- **Node.js**: v18.0.0+ (recommended)
- **npm**: v9.0.0+ (recommended)

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the project documentation
3. Check Next.js and React documentation
4. Verify all dependencies are correctly installed

---

**Last Updated**: 2024
**Project**: CDNTV Website
**Port**: 3001

