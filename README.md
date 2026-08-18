# DriveFleet 🚗

> A modern, premium car rental platform built with Next.js, React, Tailwind CSS, and HeroUI.

DriveFleet is a modern car rental web application focused on a clean, premium, and trustworthy user experience. The interface uses a **Navy & Gold** visual identity with responsive layouts, reusable UI components, smooth animations, and a professional automotive design.

## ✨ Features

- 🚗 Modern car rental landing page
- 🔎 Car search and booking interface
- 📅 Pick-up and return date selection UI
- 🏎️ Popular and featured car sections
- 💰 Pricing and rental information
- 📱 Fully responsive design
- 🌙 Light and dark mode ready
- 🎨 Navy & Gold design system
- 🧩 Reusable UI components
- ⚡ Fast Next.js application
- ✨ Smooth UI animations with Motion
- 🎯 HeroUI component system
- 🔤 Lucide / React Icons support

## 🛠️ Tech Stack

| Technology | Version |
|---|---|
| Next.js | `16.3.1` |
| React | `19.2.8` |
| Tailwind CSS | `4.x` |
| HeroUI | `3.2.4` |
| Motion | `13.1.0` |
| React Icons | `5.7.0` |
| Lucide | `1.32.0` |
| ESLint | `9.x` |

## 🎨 Design System

DriveFleet uses a **Navy & Gold** color palette.

| Color | Hex | Usage |
|---|---|---|
| Navy | `#0D1B2A` | Primary brand color |
| Gold | `#F4C430` | CTA, price, highlights |
| Accent Blue | `#148BA6` | Links and accents |
| Dark Background | `#0A1120` | Dark mode background |
| Dark Surface | `#111827` | Dark mode sections |
| Dark Card | `#1F2937` | Dark mode cards |
| Light Background | `#FFFFFF` | Light mode background |
| Light Surface | `#F8FAFC` | Light mode sections |
| Success | `#10B981` | Successful actions |
| Warning | `#F59E0B` | Warnings |
| Error | `#FF6068` | Errors |
| Info | `#3B82F6` | Information |

### Design Direction

- **Navy** → brand identity and premium sections
- **Gold** → primary CTA and important highlights
- **Accent Blue** → links and secondary accents
- **White / Slate** → clean light-mode surfaces
- **Dark Navy** → premium dark-mode experience

## 📁 Recommended Project Structure

```text
drivefleet-a9-m55/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── ...
├── components/
│   ├── navbar/
│   ├── hero/
│   ├── cars/
│   ├── booking/
│   ├── sections/
│   └── ui/
├── public/
│   ├── images/
│   ├── cars/
│   └── icons/
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Go to the project directory

```bash
cd drivefleet-a9-m55
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## 📜 Available Scripts

```bash
npm run dev
```
Starts the Next.js development server.

```bash
npm run build
```
Creates an optimized production build.

```bash
npm run start
```
Runs the production build.

```bash
npm run lint
```
Runs ESLint.

## 🧩 UI & Component Approach

DriveFleet uses reusable semantic color tokens to keep the design consistent.

```text
bg-background
bg-surface
bg-card
bg-primary
bg-gold
bg-accent

text-foreground
text-text-primary
text-text-secondary

border-border
```

Example:

```tsx
<button className="rounded-md bg-gold px-5 py-2.5 font-semibold text-primary">
  Book Now
</button>
```

## 🌓 Dark Mode

The dark palette is based on:

```text
Background  #0A1120
Surface     #111827
Card        #1F2937
Text        #F8FAFC
Secondary   #94A3B8
Border      #334155
Gold        #F4C430
Accent      #148BA6
```

## 🎯 Project Goals

1. Create a premium car rental experience.
2. Make vehicle discovery simple and intuitive.
3. Provide a clean booking flow.
4. Maintain a consistent design system.
5. Build reusable and scalable UI components.
6. Deliver a responsive experience across desktop, tablet, and mobile.

## 🗺️ Roadmap

- [ ] Car listing page
- [ ] Car details page
- [ ] Advanced car filtering
- [ ] Booking flow
- [ ] User authentication
- [ ] User dashboard
- [ ] Booking management
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Vehicle management
- [ ] Customer management
- [ ] Backend API integration
- [ ] Database integration
- [ ] Production deployment

## 👨‍💻 Developer

**Anik Mohanto**

Building DriveFleet as a modern full-stack car rental platform.

## 📄 License

This project is currently private and intended for development assignment-9 and portfolio purposes.
