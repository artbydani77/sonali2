'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, MapPin, Clock, ArrowRight } from 'lucide-react'

const confettiColors = ['bg-party-red','bg-party-orange','bg-party-yellow','bg-party-green','bg-party-teal','bg-party-blue','bg-party-purple','bg-party-pink']

const ConfettiPiece = ({ i }: { i: number }) => {
  const color = confettiColors[i % confettiColors.length]
  const left  = `${(i * 37) % 100}%`
  const delay = `${(i * 0.15) % 3}s`
  const dur   = `${2.5 + (i % 3) * 0.7}s`
  const size  = i % 3 === 0 ? 'w-3 h-3' : i % 3 === 1 ? 'w-2 h-5 rounded-sm' : 'w-2.5 h-2.5 rounded-full'
  return (
    <div className={`fixed top-0 ${color} opacity-80 ${size} pointer-events-none z-50`}
      style={{ left, animation: `confettiFall ${dur} ${delay} linear infinite` }}
    />
  )
}

export default function ConfirmationPage() {
  const orderRef = useRef(`SO-${Date.now().toString().slice(-6)}`)

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-green-50 to-cream relative overflow-hidden">
      {/* Confetti */}
      {Array.from({ length: 50 }, (_, i) => <ConfettiPiece key={i} i={i} />)}

      {/* BG decoration */}
      <div className="absolute top-20 right-12 text-8xl opacity-10 select-none animate-float-slow">🎉</div>
      <div className="absolute bottom-20 left-12 text-8xl opacity-10 select-none animate-float-med">🎊</div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.3 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-party-green to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-[0_10px_40px_rgba(0,201,107,0.45)]"
        >
          <CheckCircle className="w-14 h-14 text-white" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="text-5xl mb-3 animate-wiggle inline-block" style={{ animationIterationCount: 3 }}>🎉</div>
          <h1 className="font-display font-900 text-5xl sm:text-6xl text-ink mb-3">
            Order <span className="text-gradient-green">Confirmed!</span>
          </h1>
          <p className="text-ink/55 text-xl font-medium mb-2">Thank you for your order!</p>
          <p className="text-ink/40 text-sm mb-10">A confirmation email has been sent to your inbox.</p>
        </motion.div>

        {/* Order card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl p-8 border-2 border-green-100 shadow-card mb-7 text-left"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-800 text-xl text-ink">Order Details</h2>
            <span className="font-mono font-700 text-sm bg-gray-100 text-ink/60 px-3 py-1 rounded-full">{orderRef.current}</span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border-2 border-orange-100">
              <div className="w-10 h-10 bg-party-orange rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-700 text-sm text-ink mb-0.5">Collection Address</div>
                <div className="text-ink/55 text-sm leading-relaxed">
                  Sonali Occasions<br />28 Bilton Road, Perivale<br />London, UB6 7DS
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border-2 border-blue-100">
              <div className="w-10 h-10 bg-party-blue rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-700 text-sm text-ink mb-0.5">Ready for Collection</div>
                <div className="text-ink/55 text-sm">
                  Your order will be ready within <strong className="text-ink/70">2 hours</strong> during opening hours.<br />
                  <span className="text-party-orange font-medium text-xs">Mon–Fri 9–6 · Sat 9–3 · Sun 9:30–5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="pt-5 border-t-2 border-gray-100">
            <p className="text-xs font-display font-700 text-ink/40 tracking-widest uppercase mb-4">Order Timeline</p>
            <div className="relative pl-6 space-y-3.5">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />
              {[
                { label:'Order Placed',        time:'Just now',      done: true  },
                { label:'Being Prepared',      time:'Within 1 hour', done: false },
                { label:'Ready for Collection',time:'Within 2 hours',done: false },
                { label:'Collected',           time:'When you visit', done: false },
              ].map((step, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    step.done ? 'bg-party-green border-party-green' : 'bg-white border-gray-200'
                  }`}>
                    {step.done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className={`text-sm font-display font-700 ${step.done ? 'text-ink' : 'text-ink/35'}`}>{step.label}</div>
                    <div className="text-ink/30 text-xs">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/products" className="btn btn-red flex-1 justify-center text-base py-4">
            Keep Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/contact" className="btn btn-outline flex-1 justify-center text-base py-4">
            Contact Us
          </Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="text-ink/25 text-xs mt-7"
        >
          This is a demo website. No real payment was processed.
        </motion.p>
      </div>
    </div>
  )
}
