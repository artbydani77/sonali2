# Sonali Occasions — Website

A modern, production-ready Next.js website for **Sonali Occasions**, a party supplies and event shop based in Perivale, West London.

## 🎆 Overview

This is a full-stack demo website built with:
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom design system)
- **Framer Motion** (animations)
- **React Context** (mock cart state)

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, categories, featured products, testimonials |
| Shop | `/products` | Filterable product grid with search & sort |
| Product Detail | `/products/[slug]` | Full product page with add-to-cart |
| About | `/about` | Business story, values, stats |
| Contact | `/contact` | Contact form, map embed, store info |
| Cart | `/cart` | Full cart management |
| Checkout | `/checkout` | Mock checkout with payment fields |
| Confirmation | `/confirmation` | Order confirmation with confetti animation |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd sonali-occasions
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## ☁️ Deploy to Vercel

The easiest way to deploy is via [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel auto-detects Next.js — just click **Deploy**

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🎨 Design System

### Colours
- **Gold**: `#f59e0b` — primary brand colour
- **Crimson**: `#e11d48` — accent / sale badges
- **Midnight**: `#030208` — background

### Fonts
- **Display**: Playfair Display (headings)
- **Body**: DM Sans (body text)

### Key CSS Utilities
- `.text-gold-gradient` — gold shimmer text
- `.glass` — frosted glass card effect
- `.glass-gold` — gold-tinted glass
- `.glow-gold` — golden glow shadow

## 📦 Project Structure

```
src/
├── app/
│   ├── about/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── confirmation/page.tsx
│   ├── contact/page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── CartDrawer.tsx
│       └── ProductCard.tsx
├── context/
│   └── CartContext.tsx
└── lib/
    └── data.ts
```

## 📝 Notes on Placeholder Content

- **Products**: All products are sample items with illustrative prices
- **Images**: Sourced from Unsplash (free to use for demos)
- **Cart / Checkout**: Fully functional UI but no real payments or order processing
- **Contact form**: Submits locally — no backend / email sending
- **Map**: Google Maps embed showing approximate store location
- **Reviews**: Mock testimonials based on real review themes

## 📞 Real Business Info

- **Address**: 28 Bilton Road, Perivale, London, UB6 7DS
- **Phone**: +44 20 8998 6525 / +44 7931 570672
- **Email**: sonalioccasions@gmail.com
- **Facebook**: [SonaliOccasions](https://www.facebook.com/SonaliOccasions/)
- **Instagram**: [@sonali_occasions](https://www.instagram.com/sonali_occasions/)

---

Built with ❤️ for Sonali Occasions
