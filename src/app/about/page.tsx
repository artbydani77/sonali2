'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Star, Award, Users, MapPin, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-[#1a0a30] via-[#0a0515] to-[#030208]" />
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(ellipse at 60% 50%, rgba(245,158,11,0.3) 0%, transparent 60%)' }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 text-amber-400 text-sm font-medium mb-8"
            >
              Our Story
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Bringing Joy to<br />
              <span className="text-gold-gradient">Every Celebration</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-xl leading-relaxed"
            >
              For over 15 years, Sonali Occasions has been West London&apos;s most-loved destination for fireworks, party supplies, and gifts. We started with a simple dream: to make every celebration extraordinary.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-3xl blur-xl" />
                <div className="relative glass rounded-3xl p-8 border border-amber-500/20">
                  <div className="text-6xl mb-6">✨</div>
                  <h2 className="font-display text-3xl font-bold text-white mb-4">
                    Born from a Passion for Celebration
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    Sonali Occasions was founded in the heart of Perivale, West London, with a vision to bring professional-quality party supplies to every family. What began as a small gift shop on Bilton Road has grown into one of the most diverse and exciting party destinations in the area.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    Our founder&apos;s love of celebrations — from Diwali and Eid to weddings and birthdays — inspired a shop that truly stocks everything. You won&apos;t find our combination of fireworks, helium balloons, ice fountains, smoke flares, perfumes and gifts anywhere else in West London.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    Today, we serve customers from Wembley, Ealing, Southall, Harrow and beyond. Many families have been shopping with us for years, and returning customers are the greatest compliment we can receive.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: Heart,
                  title: 'Family-Run, Community First',
                  desc: 'We are a family-run business deeply rooted in the Perivale community. Every customer is treated like a neighbour, with personalised advice and genuine care.',
                  color: 'from-rose-500/20 to-pink-600/20',
                  iconColor: 'text-rose-400',
                },
                {
                  icon: Award,
                  title: 'Quality Without Compromise',
                  desc: 'Every firework, balloon, and gift we stock is chosen for its quality. We source from trusted suppliers and personally test our products so you don\'t have to worry.',
                  color: 'from-amber-500/20 to-orange-600/20',
                  iconColor: 'text-amber-400',
                },
                {
                  icon: Star,
                  title: 'Expertise You Can Trust',
                  desc: 'Not sure what fireworks are best for your garden? Wondering which ice fountains to use for a wedding cake? Our team has years of expertise and loves to help.',
                  color: 'from-blue-500/20 to-indigo-600/20',
                  iconColor: 'text-blue-400',
                },
                {
                  icon: Users,
                  title: 'Something for Everyone',
                  desc: 'From children\'s parties to luxury weddings, Diwali celebrations to Christmas gatherings — Sonali Occasions has the products and price points to suit every occasion.',
                  color: 'from-emerald-500/20 to-teal-600/20',
                  iconColor: 'text-emerald-400',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass rounded-2xl p-5 border border-white/5 bg-gradient-to-r ${item.color} flex gap-4`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '15+', label: 'Years Serving London', icon: '🎉' },
              { value: '6', label: 'Product Categories', icon: '🛍️' },
              { value: '1000+', label: 'Happy Customers', icon: '😊' },
              { value: '100+', label: 'Products In Store', icon: '✨' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center border border-white/5"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="font-display text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 sm:p-12 border border-amber-500/20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5" />
            <div className="relative">
              <MapPin className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Come Visit Us
              </h2>
              <p className="text-white/60 text-lg mb-2">28 Bilton Road, Perivale, London, UB6 7DS</p>
              <p className="text-white/40 text-sm mb-8">Near Alperton Tube Station · Open 7 days a week</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all duration-300 glow-gold"
              >
                Get Directions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
