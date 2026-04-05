'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Zap, Heart, Users, Award } from 'lucide-react'
import { products, categories, testimonials } from '@/lib/data'
import ProductCard from '@/components/ui/ProductCard'

/* ── Floating decoration emojis ─────────────────── */
const floaters = [
  { emoji:'🎈', top:'8%',  left:'4%',  delay:0,    dur:'float-slow',  size:'text-4xl' },
  { emoji:'🎆', top:'15%', left:'88%', delay:0.5,  dur:'float-med',   size:'text-3xl' },
  { emoji:'✨', top:'60%', left:'92%', delay:1,    dur:'float-fast',  size:'text-2xl' },
  { emoji:'🎉', top:'70%', left:'3%',  delay:0.3,  dur:'float-slow',  size:'text-3xl' },
  { emoji:'🎊', top:'30%', left:'91%', delay:1.2,  dur:'float-med',   size:'text-2xl' },
  { emoji:'🎁', top:'85%', left:'90%', delay:0.8,  dur:'float-slow',  size:'text-3xl' },
  { emoji:'🪅', top:'45%', left:'6%',  delay:0.6,  dur:'float-med',   size:'text-2xl' },
  { emoji:'🌟', top:'20%', left:'50%', delay:1.5,  dur:'float-fast',  size:'text-xl'  },
]

/* ── Confetti squares ────────────────────────────── */
const confettiItems = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: ['bg-party-red','bg-party-orange','bg-party-yellow','bg-party-green','bg-party-teal','bg-party-blue','bg-party-purple','bg-party-pink'][i % 8],
  left: `${(i * 37) % 100}%`,
  delay: `${(i * 0.18).toFixed(1)}s`,
  dur: `${3 + (i % 3)}s`,
  size: i % 3 === 0 ? 'w-2.5 h-2.5' : i % 3 === 1 ? 'w-1.5 h-6 rounded-sm' : 'w-3 h-3 rounded-full',
}))

/* ── Category card colours ───────────────────────── */
const catThemes: Record<string, { bg: string; icon_bg: string; btn: string; border: string }> = {
  fireworks:        { bg: 'bg-red-50',    icon_bg: 'bg-party-red',    btn: 'btn-red',    border: 'border-red-100 hover:border-party-red' },
  'helium-balloons':{ bg: 'bg-pink-50',   icon_bg: 'bg-party-pink',   btn: 'btn-purple', border: 'border-pink-100 hover:border-party-pink' },
  'ice-fountains':  { bg: 'bg-teal-50',   icon_bg: 'bg-party-teal',   btn: 'btn-blue',   border: 'border-teal-100 hover:border-party-teal' },
  'smoke-flares':   { bg: 'bg-purple-50', icon_bg: 'bg-party-purple', btn: 'btn-purple', border: 'border-purple-100 hover:border-party-purple' },
  perfumes:         { bg: 'bg-orange-50', icon_bg: 'bg-party-orange', btn: 'btn-orange', border: 'border-orange-100 hover:border-party-orange' },
  gifts:            { bg: 'bg-green-50',  icon_bg: 'bg-party-green',  btn: 'btn-green',  border: 'border-green-100 hover:border-party-green' },
}

/* ── Section wrapper helper ──────────────────────── */
const SectionLabel = ({ children, color = 'bg-red-100 text-party-red' }: { children: React.ReactNode; color?: string }) => (
  <span className={`section-label ${color}`}>{children}</span>
)

export default function HomePage() {
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="min-h-screen">

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-red-50 via-orange-50/40 to-cream">
        {/* Confetti rain */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {confettiItems.map(c => (
            <div
              key={c.id}
              className={`absolute ${c.size} ${c.color} opacity-70 rounded`}
              style={{
                left: c.left,
                top: '-10px',
                animation: `confettiFall ${c.dur} ${c.delay} linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Floating emojis */}
        {floaters.map((f, i) => (
          <div
            key={i}
            className={`absolute ${f.size} select-none pointer-events-none animate-${f.dur} hidden sm:block`}
            style={{ top: f.top, left: f.left, animationDelay: `${f.delay}s` }}
            aria-hidden
          >
            {f.emoji}
          </div>
        ))}

        {/* Big decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-party-yellow/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-party-pink/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">

            {/* Pre-headline pill */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-card mb-8 border-2 border-party-red/10"
            >
              <span className="text-lg animate-wiggle inline-block" style={{ animationDuration: '1.5s' }}>🎉</span>
              <span className="font-display font-800 text-sm text-ink/70">West London&apos;s #1 Party Shop</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display font-900 text-6xl sm:text-7xl lg:text-8xl leading-[1.0] text-ink mb-3"
            >
              Every{' '}
              <span className="relative inline-block">
                <span className="text-gradient-red">Occasion</span>
                {/* Underline squiggle */}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q50 2 100 8 Q150 14 198 8" stroke="#FF7A00" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="font-display font-900 text-6xl sm:text-7xl lg:text-8xl leading-[1.0] text-ink mb-8 mt-4"
            >
              Deserves{' '}
              <span className="text-gradient-party">Sparkle</span>
              <span className="text-4xl sm:text-5xl ml-2 inline-block animate-float-slow">✨</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="font-display font-700 text-lg sm:text-xl text-ink/60 mb-10 tracking-wide"
            >
              🎆 Fireworks &nbsp;•&nbsp; 🎁 Gifts &nbsp;•&nbsp; 🎈 Balloons &nbsp;•&nbsp; ✨ Ice Fountains &nbsp;•&nbsp; 💨 Smoke Flares
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/products" className="btn btn-red text-base px-8 py-4">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline text-base px-8 py-4">
                📍 Find Us in Perivale
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
            >
              {[
                { val: '15+', label: 'Years Trading', emoji: '🏆' },
                { val: '6',   label: 'Categories',    emoji: '🛍️' },
                { val: '★★★★★', label: 'Customer Rated', emoji: '💛' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl p-4 shadow-card border border-gray-100 text-center">
                  <div className="text-xl mb-0.5">{s.emoji}</div>
                  <div className="font-display font-900 text-lg text-ink">{s.val}</div>
                  <div className="text-ink/50 text-xs font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-14 sm:h-16" fill="#FFFBF5">
            <path d="M0,70 C360,20 1080,20 1440,70 L1440,70 L0,70 Z" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CATEGORIES
      ════════════════════════════════════════════════ */}
      <section className="py-24 relative bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <SectionLabel color="bg-orange-100 text-party-orange">🛍️ Everything You Need</SectionLabel>
            <h2 className="font-display font-900 text-4xl sm:text-5xl text-ink mt-4">
              Shop by <span className="text-gradient-red">Category</span>
            </h2>
            <p className="text-ink/50 mt-3 max-w-xl mx-auto">From show-stopping fireworks to sweet little gifts — we&apos;ve got it all under one roof in Perivale.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {categories.map((cat, i) => {
              const theme = catThemes[cat.slug] ?? catThemes.fireworks
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link href={`/products?cat=${cat.slug}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className={`${theme.bg} rounded-3xl p-6 sm:p-8 border-2 ${theme.border} transition-all duration-200 cursor-pointer group`}
                    >
                      {/* Icon pill */}
                      <div className={`w-14 h-14 ${theme.icon_bg} rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform`}>
                        {cat.icon}
                      </div>
                      <h3 className="font-display font-800 text-lg text-ink mb-1.5 group-hover:text-party-red transition-colors">{cat.name}</h3>
                      <p className="text-ink/50 text-sm leading-relaxed line-clamp-2 mb-4">{cat.description}</p>
                      <div className="flex items-center gap-1.5 font-display font-800 text-sm text-ink/60 group-hover:text-party-red transition-colors">
                        Browse {cat.productCount} items <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURED PRODUCTS — coloured band bg
      ════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-cream relative overflow-hidden">
        {/* Stripe bg */}
        <div className="absolute inset-0 stripe-bg pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <SectionLabel color="bg-blue-100 text-party-blue">⭐ Top Picks</SectionLabel>
              <h2 className="font-display font-900 text-4xl sm:text-5xl text-ink mt-4">
                Featured <span className="text-gradient-blue">Products</span>
              </h2>
            </div>
            <Link href="/products"
              className="hidden sm:flex items-center gap-1.5 font-display font-800 text-party-blue hover:text-party-purple transition-colors text-sm"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/products" className="btn btn-blue inline-flex">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WHY CHOOSE US — green band
      ════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-green-50/60 to-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <SectionLabel color="bg-green-100 text-party-green">💚 Why Sonali?</SectionLabel>
            <h2 className="font-display font-900 text-4xl sm:text-5xl text-ink mt-4">
              We Make Celebrations <span className="text-gradient-green">Shine</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Award,  color: 'bg-party-red',    bg: 'bg-red-50',    border: 'border-red-100',    title: 'Premium Quality',      desc: 'Every product carefully chosen for safety and wow factor.' },
              { icon: Zap,    color: 'bg-party-orange', bg: 'bg-orange-50', border: 'border-orange-100', title: 'Ready Same Day',        desc: 'Walk in, pick up, celebrate. Everything you need in one place.' },
              { icon: Heart,  color: 'bg-party-pink',   bg: 'bg-pink-50',   border: 'border-pink-100',   title: 'Family-Run & Loved',    desc: 'Serving the local community with love for over 15 years.' },
              { icon: Users,  color: 'bg-party-blue',   bg: 'bg-blue-50',   border: 'border-blue-100',   title: 'Expert Advice',         desc: 'Our friendly team knows their fireworks — just ask!' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className={`${item.bg} rounded-3xl p-6 border-2 ${item.border} transition-all`}
                >
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-800 text-ink mb-2">{item.title}</h3>
                  <p className="text-ink/55 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TESTIMONIALS — purple/pink band
      ════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/40 to-cream relative overflow-hidden">
        {/* Big background emoji */}
        <div className="absolute top-10 right-10 text-9xl opacity-5 select-none pointer-events-none font-display">🎉</div>
        <div className="absolute bottom-10 left-10 text-9xl opacity-5 select-none pointer-events-none font-display">⭐</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <SectionLabel color="bg-purple-100 text-party-purple">💬 Happy Customers</SectionLabel>
            <h2 className="font-display font-900 text-4xl sm:text-5xl text-ink mt-4">
              Real <span className="text-gradient-purple">Reviews</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl p-6 shadow-card border-2 border-gray-100 hover:border-party-purple/20 transition-all h-full flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-party-yellow fill-party-yellow" />
                    ))}
                  </div>
                  <p className="text-ink/70 text-sm leading-relaxed italic flex-1 mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="pt-3 border-t border-gray-100">
                    <div className="font-display font-800 text-sm text-ink">{t.name}</div>
                    <div className="text-ink/40 text-xs mt-0.5">{t.location} · {t.occasion}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          VISIT US — big colourful CTA
      ════════════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #FF3B3B 0%, #FF7A00 35%, #FFD600 65%, #00C96B 100%)' }}
          >
            {/* Pattern overlay */}
            <div className="absolute inset-0 confetti-bg opacity-20 pointer-events-none" />

            {/* Floating emojis inside CTA */}
            <div className="absolute top-4 left-6 text-5xl opacity-60 animate-float-slow">🎈</div>
            <div className="absolute top-6 right-8 text-4xl opacity-60 animate-float-med" style={{ animationDelay: '0.5s' }}>🎆</div>
            <div className="absolute bottom-5 left-16 text-3xl opacity-50 animate-float-fast" style={{ animationDelay: '1s' }}>✨</div>
            <div className="absolute bottom-4 right-14 text-4xl opacity-60 animate-float-slow" style={{ animationDelay: '0.3s' }}>🎉</div>

            <div className="relative px-8 py-16 text-center">
              <h2 className="font-display font-900 text-4xl sm:text-5xl text-white mb-3 drop-shadow-sm">
                Come Visit Us! 🏪
              </h2>
              <p className="text-white/90 font-display font-700 text-lg mb-2">
                28 Bilton Road, Perivale, London UB6 7DS
              </p>
              <p className="text-white/70 font-medium mb-10">
                Open 7 days · Mon–Fri 9–6 · Sat 9–3 · Sun 9:30–5
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact"
                  className="btn bg-white text-party-red hover:bg-yellow-50 font-display font-800 text-base px-8 py-4 shadow-lg"
                >
                  📍 Get Directions
                </Link>
                <Link href="/products"
                  className="btn bg-white/20 backdrop-blur text-white hover:bg-white/30 font-display font-800 text-base px-8 py-4 border-2 border-white/40"
                >
                  🛍️ Browse Online
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
