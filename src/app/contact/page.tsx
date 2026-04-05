'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Facebook, Instagram } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#1a0a30] via-[#0a0515] to-[#030208]" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(ellipse at 40% 50%, rgba(245,158,11,0.3) 0%, transparent 60%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 text-amber-400 text-sm font-medium mb-6"
          >
            📍 Find Us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl font-bold text-white mb-4"
          >
            Get in <span className="text-gold-gradient">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Have a question, want to place a large order, or just want to say hello? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 border border-amber-500/20">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Store Information</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm mb-0.5">Address</div>
                    <div className="text-white/50 text-sm leading-relaxed">28 Bilton Road<br />Perivale, London<br />UB6 7DS</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm mb-0.5">Phone</div>
                    <div className="text-white/50 text-sm">+44 20 8998 6525</div>
                    <div className="text-white/50 text-sm">+44 7931 570672</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm mb-0.5">Email</div>
                    <div className="text-white/50 text-sm">sonalioccasions@gmail.com</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm mb-1">Opening Hours</div>
                    <div className="space-y-0.5 text-sm text-white/50">
                      <div className="flex justify-between gap-6"><span>Mon–Fri</span><span>9:00am – 6:00pm</span></div>
                      <div className="flex justify-between gap-6"><span>Saturday</span><span>9:00am – 3:00pm</span></div>
                      <div className="flex justify-between gap-6"><span>Sunday</span><span>9:30am – 5:00pm</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/SonaliOccasions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1 p-3 rounded-xl glass hover:border-blue-400/30 hover:text-blue-400 text-white/50 transition-all text-sm"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/sonali_occasions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1 p-3 rounded-xl glass hover:border-pink-400/30 hover:text-pink-400 text-white/50 transition-all text-sm"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div className="glass rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5!2d-0.326!3d51.535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761074a4ef7c0b%3A0x0!2s28+Bilton+Rd%2C+Perivale%2C+Greenford+UB6+7DS!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="200"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sonali Occasions location"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8 border border-white/10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-3">Message Sent! 🎉</h3>
                  <p className="text-white/50 max-w-sm">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-8 px-6 py-3 glass text-white/70 rounded-full hover:text-white transition-colors text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-white mb-8">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/60 text-sm font-medium mb-2">Your Name *</label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm font-medium mb-2">Email Address *</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">Subject</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-white/70 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-[#0d0820] cursor-pointer"
                      >
                        <option value="">Select a subject...</option>
                        <option value="order">Order enquiry</option>
                        <option value="fireworks">Fireworks advice</option>
                        <option value="balloons">Balloon arrangements</option>
                        <option value="events">Event planning</option>
                        <option value="wholesale">Wholesale / bulk orders</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">Message *</label>
                      <textarea
                        required
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        rows={6}
                        className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-transparent resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all duration-300 glow-gold disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
