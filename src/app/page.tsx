'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, ChevronDown, Zap, Award, Heart, Truck } from 'lucide-react'
import { products, categories, testimonials } from '@/lib/data'
import ProductCard from '@/components/ui/ProductCard'

const Particle = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -80] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
  >
    <div className="w-full h-full rounded-full bg-amber-400" style={{ boxShadow: `0 0 ${size * 2}px ${size}px rgba(245,158,11,0.6)` }} />
  </motion.div>
)

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: i * 0.3,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
}))

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const featuredProducts = products.slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-[#1a0a30] via-[#0a0515] to-[#030208]" />
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(225,29,72,0.15) 0%, transparent 50%)',
            }}
          />
          {/* Particles */}
          {particles.map(p => <Particle key={p.id} {...p} />)}
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24"
        >
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 text-amber-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            West London&apos;s Premier Party Destination
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            <span className="text-white">Light Up</span>
            <br />
            <span className="text-gold-gradient">Every</span>
            <br />
            <span className="text-white">Occasion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Fireworks, helium balloons, ice fountains, smoke flares, perfumes and gifts — everything you need to make your celebration unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/products"
              className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all duration-300 glow-gold hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] flex items-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 glass text-white/80 font-semibold rounded-full hover:text-white hover:border-amber-400/40 transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: '15+', label: 'Years in Business' },
              { value: '1000+', label: 'Happy Customers' },
              { value: '6', label: 'Product Categories' },
              { value: '28', label: 'Bilton Road, Perivale' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-amber-400">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-amber-400" />
              Everything You Need
              <span className="w-8 h-px bg-amber-400" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Shop by <span className="text-gold-gradient">Category</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link href={`/products?cat=${cat.slug}`} className="group block">
                  <div className={`relative rounded-2xl overflow-hidden glass border border-white/5 hover:border-amber-400/30 transition-all duration-500 p-6 sm:p-8 hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)]`}>
                    {/* BG gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className="relative">
                      <div className="text-5xl mb-4">{cat.icon}</div>
                      <h3 className="font-display text-xl font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {cat.name}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-4">{cat.description}</p>
                      <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
                        <span>Shop {cat.productCount} products</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0820]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium tracking-widest uppercase mb-4">
                <span className="w-8 h-px bg-amber-400" />
                Top Picks
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                Featured <span className="text-gold-gradient">Products</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Why <span className="text-gold-gradient">Choose Us?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Every product is carefully selected for quality and safety — from professional fireworks to luxury perfumes.' },
              { icon: Zap, title: 'Ready to Celebrate', desc: 'Walk in and walk out with everything you need. We stock everything for same-day celebration prep.' },
              { icon: Heart, title: 'Family-Run Passion', desc: 'A local family business serving the West London community for over 15 years with love and dedication.' },
              { icon: Truck, title: 'Local Collection', desc: 'Visit our Perivale store to hand-pick your products and get expert advice from our friendly team.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-amber-400/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center mb-4 group-hover:from-amber-500/40 group-hover:to-orange-600/40 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0820] via-[#1a0a30] to-[#0d0820]" />
          {particles.slice(0, 8).map(p => <Particle key={p.id} {...p} />)}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-amber-400" />
              What Customers Say
              <span className="w-8 h-px bg-amber-400" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Real <span className="text-gold-gradient">Reviews</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/5"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-white/5 pt-4">
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.location} · {t.occasion}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600" />
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)',
              }}
            />
            <div className="relative px-8 py-16 text-center">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                Visit Us in Perivale
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                28 Bilton Road, Perivale, London UB6 7DS<br />
                Come in and discover the full range — you&apos;ll be amazed at what we stock!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-white/90 transition-all duration-300"
                >
                  Get Directions
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  Shop Online
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
