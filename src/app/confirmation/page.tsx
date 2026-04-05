'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, MapPin, Clock, ArrowRight, Share2 } from 'lucide-react'

const Confetti = ({ i }: { i: number }) => {
  const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
  const color = colors[i % colors.length]
  const x = Math.random() * 100
  const delay = Math.random() * 1.5
  const duration = 2 + Math.random() * 2
  const size = 6 + Math.random() * 8

  return (
    <motion.div
      initial={{ y: -20, x: `${x}vw`, opacity: 1, rotate: 0 }}
      animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 720 }}
      transition={{ duration, delay, ease: 'linear' }}
      className="fixed top-0 pointer-events-none z-50"
      style={{ width: size, height: size, backgroundColor: color, borderRadius: Math.random() > 0.5 ? '50%' : 2 }}
    />
  )
}

export default function ConfirmationPage() {
  const orderRef = useRef(`SO-${Date.now().toString().slice(-6)}`)

  return (
    <div className="min-h-screen pt-20 pb-20 relative overflow-hidden">
      {/* Confetti */}
      {Array.from({ length: 60 }, (_, i) => <Confetti key={i} i={i} />)}

      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(16,185,129,0.5)]"
        >
          <CheckCircle className="w-14 h-14 text-white" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Order <span className="text-gold-gradient">Confirmed!</span>
          </h1>
          <p className="text-white/60 text-xl mb-2">
            Thank you for your order 🎉
          </p>
          <p className="text-white/40 text-sm mb-10">
            A confirmation email has been sent to your inbox.
          </p>
        </motion.div>

        {/* Order details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-3xl p-8 border border-amber-500/20 mb-8 text-left"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">Order Details</h2>
            <span className="text-amber-400 font-mono font-semibold">{orderRef.current}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 glass rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-0.5">Collection Address</div>
                <div className="text-white/50 text-sm leading-relaxed">
                  Sonali Occasions<br />
                  28 Bilton Road, Perivale<br />
                  London, UB6 7DS
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 glass rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-0.5">Ready for Collection</div>
                <div className="text-white/50 text-sm">
                  Your order will be ready within <strong className="text-white/70">2 hours</strong> during opening times.<br />
                  <span className="text-amber-400/70">Mon–Fri: 9am–6pm · Sat: 9am–3pm · Sun: 9:30am–5pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-white/60 text-xs font-medium tracking-widest uppercase mb-4">Order Timeline</h3>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
              {[
                { label: 'Order Placed', time: 'Just now', done: true },
                { label: 'Being Prepared', time: 'Within 1 hour', done: false },
                { label: 'Ready for Collection', time: 'Within 2 hours', done: false },
                { label: 'Collected', time: 'When you visit', done: false },
              ].map((step, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center ${step.done ? 'bg-emerald-500 border-emerald-500' : 'bg-[#030208] border-white/20'}`}>
                    {step.done && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${step.done ? 'text-white' : 'text-white/40'}`}>{step.label}</div>
                    <div className="text-white/30 text-xs">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/products"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full glow-gold hover:from-amber-400 hover:to-orange-500 transition-all"
          >
            Keep Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="flex-1 flex items-center justify-center gap-2 py-4 glass text-white/70 font-semibold rounded-full hover:text-white transition-all border border-white/10"
          >
            <Share2 className="w-4 h-4" />
            Contact Us
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white/20 text-sm mt-8"
        >
          This is a demo website. No real payment was processed.
        </motion.p>
      </div>
    </div>
  )
}
