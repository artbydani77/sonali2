'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CreditCard, Banknote, Smartphone, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

type PayMethod = 'card' | 'cash' | 'contactless'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [payMethod, setPayMethod] = useState<PayMethod>('card')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', cardNumber:'', cardExpiry:'', cardCvc:'', cardName:'' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (e.target.name === 'cardNumber') val = val.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19)
    if (e.target.name === 'cardExpiry') val = val.replace(/\D/g,'').replace(/^(.{2})/,'$1/').slice(0,5)
    if (e.target.name === 'cardCvc')    val = val.replace(/\D/g,'').slice(0,3)
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
      <div className="min-h-screen pt-24 flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float-slow">🛒</div>
          <p className="text-ink/50 mb-6 font-medium">Your cart is empty.</p>
          <Link href="/products" className="btn btn-red inline-flex">Shop Now 🎉</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="flex items-center gap-1.5 text-ink/40 hover:text-party-red transition-colors text-sm font-display font-700">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <div className="h-px flex-1 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-ink/40 text-sm font-medium">
            <Lock className="w-3.5 h-3.5" /> Secure checkout
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-3 space-y-5">

            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-card">
              <h2 className="font-display font-800 text-xl text-ink mb-5">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name:'firstName', label:'First Name', placeholder:'Jane',             type:'text'  },
                  { name:'lastName',  label:'Last Name',  placeholder:'Smith',            type:'text'  },
                  { name:'email',     label:'Email',      placeholder:'jane@example.com', type:'email' },
                  { name:'phone',     label:'Phone',      placeholder:'+44 7700 000000',  type:'tel'   },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-ink/55 text-xs font-display font-700 mb-1.5">{f.label}</label>
                    <input required name={f.name} type={f.type} value={form[f.name as keyof typeof form]}
                      onChange={handleChange} placeholder={f.placeholder} className="input-field text-sm py-2.5" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Collection notice */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="bg-orange-50 rounded-2xl p-5 border-2 border-orange-100"
            >
              <h3 className="font-display font-800 text-party-orange text-sm mb-1">📍 In-Store Collection</h3>
              <p className="text-ink/55 text-sm">
                Ready at <strong className="text-ink/70">28 Bilton Road, Perivale, London UB6 7DS</strong> within 2 hours during opening times.
              </p>
            </motion.div>

            {/* Payment */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-card">
              <h2 className="font-display font-800 text-xl text-ink mb-5">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {([
                  { id:'card' as PayMethod,        icon: CreditCard,  label:'Card',        color:'border-party-blue bg-blue-50 text-party-blue' },
                  { id:'cash' as PayMethod,        icon: Banknote,    label:'Cash',        color:'border-party-green bg-green-50 text-party-green' },
                  { id:'contactless' as PayMethod, icon: Smartphone,  label:'Contactless', color:'border-party-purple bg-purple-50 text-party-purple' },
                ] as const).map(m => (
                  <button key={m.id} type="button" onClick={() => setPayMethod(m.id)}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 font-display font-700 text-sm transition-all duration-200 ${
                      payMethod === m.id ? m.color : 'border-gray-200 bg-gray-50 text-ink/40 hover:border-gray-300'
                    }`}
                  >
                    <m.icon className="w-5 h-5" /> {m.label}
                  </button>
                ))}
              </div>

              {payMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-ink/55 text-xs font-display font-700 mb-1.5">Card Number</label>
                    <input required name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" className="input-field text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-ink/55 text-xs font-display font-700 mb-1.5">Expiry</label>
                      <input required name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM/YY" className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="block text-ink/55 text-xs font-display font-700 mb-1.5">CVC</label>
                      <input required name="cardCvc" value={form.cardCvc} onChange={handleChange} placeholder="123" className="input-field text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-ink/55 text-xs font-display font-700 mb-1.5">Name on Card</label>
                    <input required name="cardName" value={form.cardName} onChange={handleChange} placeholder="Jane Smith" className="input-field text-sm" />
                  </div>
                </div>
              )}
              {payMethod === 'cash' && (
                <div className="p-4 bg-green-50 rounded-2xl text-sm text-ink/60 font-medium border-2 border-green-100">
                  💵 Pay with cash when you collect. Please bring exact change if possible.
                </div>
              )}
              {payMethod === 'contactless' && (
                <div className="p-4 bg-purple-50 rounded-2xl text-sm text-ink/60 font-medium border-2 border-purple-100">
                  📱 Pay by contactless card, Apple Pay, or Google Pay in-store at collection.
                </div>
              )}
            </motion.div>

            <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={loading}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="btn btn-red w-full justify-center text-base py-5 disabled:opacity-60"
            >
              {loading
                ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing...</>
                : <><Lock className="w-5 h-5" /> Place Order · £{totalPrice.toFixed(2)}</>}
            </motion.button>
          </form>

          {/* Order summary sidebar */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-card sticky top-28">
              <div className="flex items-center gap-2 mb-5">
                <ShoppingBag className="w-5 h-5 text-party-red" />
                <h2 className="font-display font-800 text-xl text-ink">Order Summary</h2>
              </div>
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-party-red text-white text-[10px] rounded-full flex items-center justify-center font-display font-800">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-700 text-sm text-ink truncate">{item.name}</p>
                    </div>
                    <span className="font-display font-800 text-sm text-ink">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-ink/50 font-medium">
                  <span>Subtotal</span><span>£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-ink/50">Collection</span><span className="text-party-green">Free</span>
                </div>
                <div className="flex justify-between font-display font-900 text-lg border-t-2 border-gray-100 pt-3 mt-2">
                  <span className="text-ink">Total</span>
                  <span className="text-ink">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
