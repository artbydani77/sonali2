'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Star, Award, Users, MapPin, ArrowRight, Sparkles } from 'lucide-react'

const values = [
  { icon: Heart,  color: 'bg-party-red',    bg: 'bg-red-50',    border: 'border-red-100',    title: 'Family First',          desc: 'A local family business treating every customer as a neighbour, with personalised advice and genuine care.' },
  { icon: Award,  color: 'bg-party-orange', bg: 'bg-orange-50', border: 'border-orange-100', title: 'Quality Always',         desc: 'Every firework, balloon, and gift is hand-picked for quality and safety. We test our products so you don\'t have to.' },
  { icon: Star,   color: 'bg-party-yellow', bg: 'bg-yellow-50', border: 'border-yellow-100', title: 'Expert Knowledge',       desc: 'Decades of experience means our team can guide you to the perfect product for every budget and occasion.' },
  { icon: Users,  color: 'bg-party-blue',   bg: 'bg-blue-50',   border: 'border-blue-100',   title: 'Something for Everyone', desc: 'From Diwali to Christmas, birthdays to weddings — we celebrate every culture and every milestone with you.' },
  { icon: Sparkles, color: 'bg-party-purple', bg: 'bg-purple-50', border: 'border-purple-100', title: 'Always Evolving',      desc: 'We\'re constantly refreshing our stock with the latest trends — ice fountains, smoke bombs, new perfumes and more.' },
  { icon: MapPin, color: 'bg-party-green',  bg: 'bg-green-50',  border: 'border-green-100',  title: 'Community Rooted',       desc: 'Based in Perivale since 2008, we proudly serve Wembley, Ealing, Southall, Harrow and all of West London.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-cream">

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-orange-50 via-yellow-50/30 to-cream">
        <div className="absolute top-10 right-8 text-7xl opacity-20 animate-float-slow select-none">🎉</div>
        <div className="absolute bottom-10 left-8 text-6xl opacity-15 animate-float-med select-none">🌟</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label bg-orange-100 text-party-orange inline-flex mb-6"
            >
              🧡 Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-900 text-5xl sm:text-6xl text-ink leading-tight mb-5"
            >
              Bringing Joy to{' '}
              <span className="text-gradient-red">Every Celebration</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-ink/60 text-xl leading-relaxed"
            >
              For over 15 years, Sonali Occasions has been West London&apos;s most-loved destination for fireworks, party supplies, and gifts. We started with a simple dream: to make every celebration extraordinary.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-party-red via-party-orange to-party-yellow p-1 rounded-3xl shadow-party-lg">
                <div className="bg-white rounded-[1.4rem] p-8">
                  <div className="text-5xl mb-5">✨</div>
                  <h2 className="font-display font-900 text-2xl text-ink mb-4">
                    Born from a Passion for Celebration
                  </h2>
                  <p className="text-ink/60 leading-relaxed mb-4">
                    Sonali Occasions was founded in the heart of Perivale, West London, with a vision to bring professional-quality party supplies to every family. What began as a small gift shop on Bilton Road has grown into one of the most diverse and exciting party destinations in the area.
                  </p>
                  <p className="text-ink/60 leading-relaxed mb-4">
                    Our founder&apos;s love of celebrations — from Diwali and Eid to weddings and birthdays — inspired a shop that truly stocks everything. You won&apos;t find our combination of fireworks, helium balloons, ice fountains, smoke flares, perfumes and gifts anywhere else in West London.
                  </p>
                  <p className="text-ink/60 leading-relaxed">
                    Today, we serve customers from Wembley, Ealing, Southall, Harrow and beyond. Returning customers are the greatest compliment we can receive — and many families have been shopping with us for over a decade.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Fun facts grid */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { val: '15+', label: 'Years in Business',   emoji: '🏆', bg: 'bg-red-50',    border: 'border-red-200' },
                { val: '6',   label: 'Product Categories',  emoji: '🛍️', bg: 'bg-blue-50',   border: 'border-blue-200' },
                { val: '1000+',label: 'Happy Customers',    emoji: '😊', bg: 'bg-green-50',  border: 'border-green-200' },
                { val: '100+', label: 'Products In-Store',  emoji: '✨', bg: 'bg-orange-50', border: 'border-orange-200' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                  className={`${s.bg} rounded-3xl p-6 border-2 ${s.border} text-center`}
                >
                  <div className="text-3xl mb-2">{s.emoji}</div>
                  <div className="font-display font-900 text-3xl text-ink">{s.val}</div>
                  <div className="text-ink/50 text-sm font-medium mt-1">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-purple-50/40 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-label bg-purple-100 text-party-purple inline-flex mb-4">💜 What We Stand For</span>
            <h2 className="font-display font-900 text-4xl sm:text-5xl text-ink">
              Our <span className="text-gradient-purple">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className={`${v.bg} rounded-3xl p-6 border-2 ${v.border} transition-all h-full`}
                >
                  <div className={`w-12 h-12 ${v.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                    <v.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-800 text-ink text-lg mb-2">{v.title}</h3>
                  <p className="text-ink/55 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-party-red via-party-orange to-party-yellow text-center px-8 py-16"
          >
            <div className="absolute top-4 left-6 text-4xl opacity-50 animate-float-slow">🎈</div>
            <div className="absolute bottom-4 right-8 text-4xl opacity-50 animate-float-med">🎆</div>
            <MapPin className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="font-display font-900 text-4xl text-white mb-3">Come Say Hello! 👋</h2>
            <p className="text-white/85 text-lg font-medium mb-2">28 Bilton Road, Perivale, London, UB6 7DS</p>
            <p className="text-white/65 mb-8">Near Alperton Tube Station · Open 7 days a week</p>
            <Link href="/contact"
              className="btn bg-white text-party-red font-display font-800 text-base px-8 py-4 shadow-lg hover:bg-yellow-50"
            >
              Get Directions <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
