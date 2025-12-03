# FiankoOS - Browser-Based Portfolio OS

<div align="center">

**A stunning, interactive portfolio website designed as a fully functional operating system experience**

[![Built with React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.6-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

[Live Demo](https://anubhavprasai.com.np) • [Report Bug](https://github.com/Fianko-codes/archify-browser-os/issues)

</div>

---

## 📖 Overview

**FiankoOS** is an innovative portfolio website that simulates a complete operating system experience directly in your browser. Created by **Anubhav Prasai** (aka Fianko), a high school student from Nepal, this project showcases modern web development skills through an immersive, OS-like interface.

The project features:
- 🖥️ **Dual Interface**: Responsive desktop and mobile OS experiences
- 🎨 **Catppuccin Theming**: Four beautiful theme variants (Mocha, Macchiato, Frappe, Latte)
- 🪟 **Window Management**: Draggable, resizable windows with z-index stacking
- 📱 **Mobile-First Design**: Native mobile OS experience with status bar and app drawer
- ⚡ **Boot Sequence**: Authentic OS boot animation with ASCII art
- 🎯 **Interactive Apps**: Terminal, Projects, Resume, Blog, Settings, and more

---

## ✨ Features

### Desktop Experience
- **Window Manager**: Full-featured window system with drag, resize, minimize, maximize, and close
- **Taskbar**: Active window indicators, system tray with time and status icons
- **Desktop Icons**: Quick access to applications
- **Context Menus**: Right-click functionality throughout the interface
- **Multi-Window Support**: Run multiple applications simultaneously

### Mobile Experience
- **Status Bar**: Displays time, battery, Wi-Fi, and network status
- **App Drawer**: Swipe-up gesture to access applications
- **Full-Screen Apps**: Immersive mobile app experience
- **Touch Optimized**: Gesture-based navigation and interactions
- **Responsive Design**: Automatically detects and adapts to mobile devices

### Applications

#### 📝 About App
Personal introduction, skills showcase, and contact information with animated skill bars and social media links.

#### 💼 Projects App
Portfolio of development projects with descriptions, technologies used, and live demo links.

#### 📄 Resume App
Interactive resume viewer with downloadable PDF option.

#### 📰 Blogs App
Blog post viewer integrated with external blog content.

#### 💻 Terminal App
Functional terminal emulator with custom commands:
- `help` - Display available commands
- `about` - Show information about Fianko
- `skills` - List technical skills
- `projects` - Display project list
- `contact` - Show contact information
- `clear` - Clear terminal screen
- `neofetch` - Display system information

#### ⚙️ Settings App
Comprehensive settings panel for:
- **Appearance**: Theme selection (4 Catppuccin variants), accent colors
- **Behavior**: Window animations, sound effects
- **Performance**: Hardware acceleration, animation quality
- **Accessibility**: Font size, contrast settings
- **Desktop/Mobile Specific**: Taskbar position, icon size, status bar visibility

#### 📂 Code Viewer App
View and explore source code with syntax highlighting.

### Theme System
Four carefully crafted Catppuccin theme variants:
- 🌙 **Mocha** (Dark) - Default dark theme
- ☕ **Macchiato** (Dark) - Warmer dark variant
- 🥤 **Frappe** (Dark) - Cool dark variant
- ☀️ **Latte** (Light) - Light theme for daytime use

All themes persist across sessions using localStorage.

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - UI library with hooks and modern patterns
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.2.6** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### UI & Styling
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Framer Motion 12.23.25** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons
- **Tailwind Animate** - Animation utilities

### State Management
- **Zustand 5.0.9** - Lightweight state management
  - `useWMStore` - Window manager state
  - `useThemeStore` - Theme preferences
  - `useMobileStore` - Mobile app state

### Routing & Data
- **React Router DOM 6.30.1** - Client-side routing
- **TanStack Query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form handling with validation
- **Zod 3.25.76** - Schema validation

### Developer Experience
- **ESLint 9.32.0** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React SWC** - Fast refresh with SWC compiler
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
archify-browser-os/
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── apps/               # Application components
│   │   │   ├── AboutApp.tsx
│   │   │   ├── ProjectsApp.tsx
│   │   │   ├── ResumeApp.tsx
│   │   │   ├── BlogsApp.tsx
│   │   │   ├── TerminalApp.tsx
│   │   │   ├── SettingsApp.tsx
│   │   │   └── CodeViewerApp.tsx
│   │   ├── desktop/            # Desktop OS components
│   │   │   ├── Desktop.tsx
│   │   │   ├── Window.tsx
│   │   │   ├── Taskbar.tsx
│   │   │   └── DesktopIcon.tsx
│   │   ├── mobile/             # Mobile OS components
│   │   │   ├── MobileOS.tsx
│   │   │   ├── MobileStatusBar.tsx
│   │   │   ├── MobileAppDrawer.tsx
│   │   │   └── apps/           # Mobile-specific app views
│   │   ├── ui/                 # shadcn/ui components
│   │   └── BootScreen.tsx      # OS boot animation
│   ├── stores/
│   │   ├── useWMStore.ts       # Window manager state
│   │   ├── useThemeStore.ts    # Theme state
│   │   └── useMobileStore.ts   # Mobile app state
│   ├── hooks/
│   │   └── useIsMobile.ts      # Mobile detection hook
│   ├── pages/
│   │   ├── Index.tsx           # Main page
│   │   └── NotFound.tsx        # 404 page
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # App root
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles & theme variables
├── index.html                   # HTML template
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fianko-codes/archify-browser-os.git
   cd archify-browser-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080` (or the port shown in terminal)

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

---

## 🎨 Customization

### Changing Themes
Themes can be changed through the Settings app or by modifying `src/stores/useThemeStore.ts`. The theme system uses CSS variables defined in `src/index.css`.

### Adding New Applications
1. Create a new component in `src/components/apps/`
2. Add mobile version in `src/components/mobile/apps/` (if needed)
3. Register the app in the window manager store (`useWMStore.ts`)
4. Add desktop icon and taskbar entry

### Modifying Window Behavior
Window management logic is centralized in `src/stores/useWMStore.ts`. You can customize:
- Default window sizes and positions
- Z-index management
- Window state (minimized, maximized)
- Dragging and resizing behavior

---

## 🌐 Deployment

```bash
# Build the project
npm run build

# The `dist` folder contains the production build
# Deploy to any static hosting service:
# - Vercel
# - Netlify
# - GitHub Pages
# - Cloudflare Pages
---

## 📧 Contact

**Anubhav Prasai (Fianko)**

- 📧 Email: [me@anubhavprasai.com.np](mailto:me@anubhavprasai.com.np)
- 💼 LinkedIn: [linkedin.com/in/anubhavprasai](https://linkedin.com/in/anubhavprasai)
- 🐙 GitHub: [github.com/Fianko-codes](https://github.com/Fianko-codes)
- 🐦 Twitter: [@PrasaiAnubhav](https://X.com/PrasaiAnubhav)
- 📸 Instagram: [@__dear.honey__](https://www.instagram.com/__dear.honey__/)

---

## 🙏 Acknowledgments

- **Catppuccin** - For the beautiful color schemes
- **shadcn/ui** - For the excellent component library
- **React Community** - For the amazing ecosystem
- **AI** - For the amazing help

---

<div align="center">

**Made with ❤️ by Fianko**

⭐ Star this repo if you found it helpful!
</div>
