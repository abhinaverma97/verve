# Verve

**Four channels. One memory.**

Verve is the landing page for an autonomous AI sales platform that unifies **SMS, Voice, Email, and Webchat** under a single persistent memory. When a lead goes quiet on one channel, Verve picks up the exact same conversation on another, minutes later.

Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**. All animations are pure CSS + lightweight `IntersectionObserver` hooks — no extra animation dependencies.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Prerequisites

- **Node.js 18.18+** (Node 20+ recommended)
- **npm** (ships with Node)

Check your versions:

```bash
node --version
npm --version
```

## Running locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/abhinaverma97/verve.git
   cd verve
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

## Available scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Start the local dev server at `localhost:3000`.  |
| `npm run build` | Create an optimized production build.             |
| `npm run start` | Run the production build locally (after `build`). |
| `npm run lint`  | Run ESLint.                                       |

### Production build

```bash
npm run build
npm run start
```

## Project structure

```
verve/
├── app/
│   ├── globals.css      # Theme tokens, design system, animations
│   ├── layout.js        # Root layout + metadata
│   └── page.js          # Landing page composition
├── components/          # Section + UI components
│   ├── Navbar.js        Hero.js          ChannelOrbit.js
│   ├── Channels.js      Differentiator.js HowItWorks.js
│   ├── Security.js      Industries.js    Stats.js
│   ├── Counter.js       Reveal.js        LogoCloud.js
│   ├── CTA.js           Footer.js        Logo.js
├── next.config.mjs
├── postcss.config.mjs
└── package.json
```

## Accessibility

Animations respect the `prefers-reduced-motion` user setting and are disabled automatically when requested.
