'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Facebook, Instagram } from 'lucide-react'

export default function ContactPage() {
  const [form,      setForm]      = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-20 bg-cream">
      {/* Header */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-b from-teal-50 to-cream">
        <div className="absolute top-4 right-8 text-6xl opacity-20 animate-float-slow select-none">📬</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            className="section-label bg-teal-100 text-party-teal inline-flex mb-5"
          >📍 Find Us</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display font-900 text-5xl sm:text-6xl text-ink mb-3"
          >Get in <span className="text-gradient-green">Touch</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-ink/50 text-lg max-w-xl mx-auto"
          >Have a question or want to place a big order? We&apos;d love to hear from you — pop in or drop us a message!</motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Info column */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-card">
              <h2 className="font-display font-800 text-xl text-ink mb-5">Store Information</h2>
              <div className="space-y-4">
                {[
                  { icon: MapPin, color: 'bg-party-red', content: <span>28 Bilton Road<br />Perivale, London, UB6 7DS</span>, label: 'Address' },
                  { icon: Phone,  color: 'bg-party-green', content: <div><div>+44 20 8998 6525</div><div>+44 7931 570672</div></div>, label: 'Phone' },
                  { icon: Mail,   color: 'bg-party-blue',  content: <span>sonalioccasions@gmail.com</span>, label: 'Email' },
                  { icon: Clock,  color: 'bg-party-orange', content:
                    <div className="space-y-0.5">
                      <div className="flex justify-between gap-8"><span>Mon–Fri</span><span>9:00am–6:00pm</span></div>
                      <div className="flex justify-between gap-8"><span>Saturday</span><span>9:00am–3:00pm</span></div>
                      <div className="flex justify-between gap-8"><span>Sunday</span><span>9:30am–5:00pm</span></div>
                    </div>,
                    label: 'Hours'
                  },
                ].map(item => (
                  <div key={item.label} className="flex gap-3.5">
                    <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-display font-700 text-sm text-ink mb-0.5">{item.label}</div>
                      <div className="text-ink/50 text-sm leading-relaxed">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="bg-white rounded-3xl p-5 border-2 border-gray-100 shadow-card">
              <h3 className="font-display font-700 text-ink mb-3">Follow Us 📱</h3>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/SonaliOccasions/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 flex-1 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors text-sm font-display font-700"
                >
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <a href="https://www.instagram.com/sonali_occasions/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 flex-1 p-3 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors text-sm font-display font-700"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border-2 border-gray-100 shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5!2d-0.326!3d51.535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761074a4ef7c0b%3A0x0!2s28+Bilton+Rd%2C+Perivale%2C+Greenford+UB6+7DS!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%" height="200"
                style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Sonali Occasions location"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-card">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-10 h-10 text-party-green" />
                  </div>
                  <div className="text-4xl mb-3 animate-pop-in">🎉</div>
                  <h3 className="font-display font-900 text-2xl text-ink mb-2">Message Sent!</h3>
                  <p className="text-ink/50 max-w-xs">We&apos;ll get back to you within 24 hours. Can&apos;t wait to help!</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }) }}
                    className="mt-7 btn btn-outline text-sm"
                  >Send another message</button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-display font-800 text-2xl text-ink mb-6">Send Us a Message 💬</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-ink/60 text-sm font-display font-700 mb-1.5">Your Name *</label>
                        <input required type="text" name="name" value={form.name} onChange={handleChange}
                          placeholder="Jane Smith" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-ink/60 text-sm font-display font-700 mb-1.5">Email *</label>
                        <input required type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="jane@example.com" className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-ink/60 text-sm font-display font-700 mb-1.5">Subject</label>
                      <select name="subject" value={form.subject} onChange={handleChange} className="input-field cursor-pointer">
                        <option value="">Select a topic...</option>
                        <option value="order">Order enquiry</option>
                        <option value="fireworks">Fireworks advice</option>
                        <option value="balloons">Balloon arrangements</option>
                        <option value="events">Event planning</option>
                        <option value="wholesale">Wholesale / bulk orders</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-ink/60 text-sm font-display font-700 mb-1.5">Message *</label>
                      <textarea required name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell us how we can help..." rows={6}
                        className="input-field resize-none"
                      />
                    </div>
                    <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={loading}
                      className="btn btn-red w-full justify-center text-base py-4 disabled:opacity-60"
                    >
                      {loading
                        ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending...</>
                        : <><Send className="w-5 h-5" /> Send Message</>}
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
