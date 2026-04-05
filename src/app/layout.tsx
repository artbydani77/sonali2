import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/ui/CartDrawer'

export const metadata: Metadata = {
  title: 'Sonali Occasions | Fireworks, Party Supplies & Gifts — Perivale, London',
  description: 'London\'s premier party supplies destination. Fireworks, helium balloons, ice fountains, smoke flares, perfumes and gifts. Visit us at 28 Bilton Road, Perivale, London.',
  keywords: 'fireworks London, party supplies, helium balloons, ice fountains, smoke flares, gifts, Perivale, party shop',
  openGraph: {
    title: 'Sonali Occasions',
    description: 'London\'s premier party supplies destination',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#030208] text-white antialiased">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
