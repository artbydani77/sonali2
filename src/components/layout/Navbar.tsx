'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#030208]/95 backdrop-blur-xl border-b border-amber-500/20 shadow-[0_4px_30px_rgba(245,158,11,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center glow-gold group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-gold-gradient leading-none">
                  Sonali
                </div>
                <div className="text-[10px] tracking-[0.2em] text-amber-400/70 uppercase leading-none mt-0.5">
                  Occasions
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleCart}
                className="relative p-2 text-white/70 hover:text-amber-400 transition-colors duration-300 group"
                aria-label="Cart"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold glow-crimson"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              <Link
                href="/products"
                className="hidden md:block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all duration-300 glow-gold hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
              >
                Shop Now
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-white/70 hover:text-amber-400 transition-colors"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#030208]/98 backdrop-blur-xl border-b border-amber-500/20 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-amber-400 text-lg font-medium transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full text-center"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
