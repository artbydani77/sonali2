'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CreditCard, Banknote, Smartphone } from 'lucide-react'
import { useCart } from '@/context/CartContext'

type PayMethod = 'card' | 'cash' | 'contactless'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [payMethod, setPayMethod] = useState<PayMethod>('card')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (e.target.name === 'cardNumber') val = val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
    if (e.target.name === 'cardExpiry') val = val.replace(/\D/g, '').replace(/^(.{2})/, '$1/').slice(0, 5)
    if (e.target.name === 'cardCvc') val = val.replace(/\D/g, '').slice(0, 3)
    setForm(f => ({ ...f, [e.target.name]: val }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    clearCart()
    router.push('/confirmation')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-white/50 mb-6">Your cart is empty.</p>
          <Link href="/products" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full">
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <Link href="/cart" className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <div className="h-px flex-1 bg-white/5" />
          <div className="flex items-center gap-1.5 text-white/30 text-sm">
            <Lock className="w-3.5 h-3.5" />
            Secure checkout
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-3 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 border border-white/10">
              <h2 className="font-display text-xl font-bold text-white mb-5">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'firstName', label: 'First Name', placeholder: 'Jane', type: 'text' },
                  { name: 'lastName', label: 'Last Name', placeholder: 'Smith', type: 'text' },
                  { name: 'email', label: 'Email', placeholder: 'jane@example.com', type: 'email' },
                  { name: 'phone', label: 'Phone', placeholder: '+44 7700 000000', type: 'tel' },
                ].map(field => (
                  <div key={field.name} className={field.name === 'email' || field.name === 'phone' ? '' : ''}>
                    <label className="block text-white/50 text-xs font-medium mb-1.5">{field.label}</label>
                    <input
                      required
                      name={field.name}
                      type={field.type}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 glass rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Collection notice */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-5 border border-amber-500/20 bg-amber-500/5"
            >
              <h3 className="text-amber-400 font-semibold text-sm mb-1">📍 In-Store Collection</h3>
              <p className="text-white/50 text-sm">
                Your order will be ready for collection at <strong className="text-white/70">28 Bilton Road, Perivale, London UB6 7DS</strong>. We&apos;ll send you a confirmation email when it&apos;s ready.
              </p>
            </motion.div>

            {/* Payment */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 border border-white/10">
              <h2 className="font-display text-xl font-bold text-white mb-5">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'card' as PayMethod, icon: CreditCard, label: 'Card' },
                  { id: 'cash' as PayMethod, icon: Banknote, label: 'Cash' },
                  { id: 'contactless' as PayMethod, icon: Smartphone, label: 'Contactless' },
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayMethod(m.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                      payMethod === m.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-white/10 glass text-white/50 hover:border-white/20'
                    }`}
                  >
                    <m.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{m.label}</span>
                  </button>
                ))}
              </div>

              {payMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-1.5">Card Number</label>
                    <input
                      required
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2.5 glass rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1.5">Expiry</label>
                      <input
                        required
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2.5 glass rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1.5">CVC</label>
                      <input
                        required
                        name="cardCvc"
                        value={form.cardCvc}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full px-3 py-2.5 glass rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-1.5">Name on Card</label>
                    <input
                      required
                      name="cardName"
                      value={form.cardName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-3 py-2.5 glass rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 border border-white/10 bg-transparent"
                    />
                  </div>
                </div>
              )}
              {payMethod === 'cash' && (
                <p className="text-white/50 text-sm p-4 glass rounded-xl">Pay with cash when you collect your order in store. Please bring exact change if possible.</p>
              )}
              {payMethod === 'contactless' && (
                <p className="text-white/50 text-sm p-4 glass rounded-xl">Pay using contactless card, Apple Pay, or Google Pay when collecting your order in store.</p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-full glow-gold hover:from-amber-400 hover:to-orange-500 transition-all duration-300 hover:shadow-[0_0_50px_rgba(245,158,11,0.7)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</>
              ) : (
                <><Lock className="w-5 h-5" />Place Order — £{totalPrice.toFixed(2)}</>
              )}
            </motion.button>
          </form>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 border border-white/10 sticky top-28">
              <h2 className="font-display text-xl font-bold text-white mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-medium truncate">{item.name}</p>
                    </div>
                    <span className="text-amber-400 text-sm font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-white/50">
                  <span>Subtotal</span><span>£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-white/50">
                  <span>Collection</span><span className="text-emerald-400">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-3 mt-3">
                  <span className="text-white">Total</span>
                  <span className="text-amber-400 font-display text-2xl">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
