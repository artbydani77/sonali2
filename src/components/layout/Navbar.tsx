'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/', label: 'Home', color: 'hover:text-party-red' },
  { href: '/products', label: 'Shop', color: 'hover:text-party-orange' },
  { href: '/about', label: 'About', color: 'hover:text-party-blue' },
  { href: '/contact', label: 'Contact', color: 'hover:text-party-green' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b-2 border-party-red/10'
          : 'bg-white/80 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">

            {/* ── Logo ──────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
              <div className="relative h-12 w-auto aspect-square md:h-14">
                <img
                  src="/logo.jpg"
                  alt="Sonali Occasions Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-brand text-2xl text-party-red tracking-tight">
                  Sonali
                </span>
                <span className="font-display text-[10px] font-800 tracking-[0.18em] text-ink/50 uppercase -mt-0.5">
                  Occasions
                </span>
              </div>
            </Link>

            {/* ── Desktop links ─────────────────────────── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full font-display font-700 text-sm text-ink/70 transition-all duration-200 ${link.color} hover:bg-gray-50`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Right actions ─────────────────────────── */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleCart}
                className="relative p-2.5 rounded-full hover:bg-red-50 transition-colors group"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5 text-ink/70 group-hover:text-party-red transition-colors" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-party-red text-white text-[10px] font-display font-800 rounded-full flex items-center justify-center shadow-party"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link
                href="/products"
                className="hidden md:block btn btn-red text-sm py-2.5 px-5"
              >
                Shop Now ✨
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {mobileOpen
                  ? <X className="w-5 h-5 text-ink" />
                  : <Menu className="w-5 h-5 text-ink" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b-2 border-party-red/10 shadow-lg md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3 rounded-2xl font-display font-700 text-ink/80 hover:bg-red-50 hover:text-party-red transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="btn btn-red mt-2 justify-center"
              >
                Shop Now ✨
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
