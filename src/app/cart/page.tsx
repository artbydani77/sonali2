'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart()

  const savings = items.reduce((sum, item) =>
    item.originalPrice ? sum + (item.originalPrice - item.price) * item.quantity : sum, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-cream">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4">
          <div className="text-8xl mb-5 animate-float-slow">🛒</div>
          <h1 className="font-display font-900 text-4xl text-ink mb-3">Your cart is empty!</h1>
          <p className="text-ink/50 mb-8 max-w-sm mx-auto">Looks like you haven&apos;t added anything yet. Time to party! 🎉</p>
          <Link href="/products" className="btn btn-red inline-flex text-base px-8 py-4">
            <ShoppingBag className="w-5 h-5" /> Start Shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-900 text-4xl text-ink">Your Cart 🛒</h1>
            <p className="text-ink/40 mt-1 font-medium">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/products" className="flex items-center gap-1.5 text-ink/50 hover:text-party-red transition-colors text-sm font-display font-700">
            <ArrowLeft className="w-4 h-4" /> Continue shopping
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3.5">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="bg-white rounded-2xl p-4 flex gap-4 border-2 border-gray-100 shadow-card"
                >
                  <Link href={`/products/${item.slug}`} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/products/${item.slug}`} className="font-display font-800 text-ink hover:text-party-red transition-colors leading-snug">{item.name}</Link>
                      <button onClick={() => removeItem(item.id)} className="p-1.5 text-ink/20 hover:text-party-red transition-colors flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-ink/40 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-ink/50 hover:text-party-red transition-colors rounded-full"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-display font-800 text-ink text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-ink/50 hover:text-party-green transition-colors rounded-full"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-900 text-lg text-ink">£{(item.price * item.quantity).toFixed(2)}</div>
                        {item.quantity > 1 && <div className="text-ink/30 text-xs">£{item.price.toFixed(2)} each</div>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button onClick={clearCart} className="text-ink/30 hover:text-party-red transition-colors text-sm flex items-center gap-1.5 mt-2 font-medium">
              <Trash2 className="w-3.5 h-3.5" /> Clear cart
            </button>
          </div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
            {/* Promo */}
            <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-card">
              <label className="block text-ink/60 text-sm font-display font-700 mb-2">🏷️ Promo Code</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                  <input type="text" placeholder="Enter code..." className="input-field pl-9 py-2.5 text-sm" />
                </div>
                <button className="btn bg-gray-100 text-ink/60 hover:bg-gray-200 text-sm px-4 py-2 rounded-xl font-display font-700">Apply</button>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-card">
              <h2 className="font-display font-800 text-xl text-ink mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/50 font-medium">Subtotal ({totalItems} items)</span>
                  <span className="font-display font-700 text-ink">£{totalPrice.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-party-green font-medium">You save</span>
                    <span className="text-party-green font-display font-700">-£{savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-ink/50 font-medium">Collection</span>
                  <span className="text-party-green font-display font-700">Free</span>
                </div>
              </div>
              <div className="border-t-2 border-gray-100 pt-4 mb-5">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-800 text-ink">Total</span>
                  <span className="font-display font-900 text-3xl text-ink">£{totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-ink/30 text-xs mt-1">Collect in-store · 28 Bilton Road, Perivale</p>
              </div>
              <Link href="/checkout" className="btn btn-red w-full justify-center text-base py-4">
                Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Payment icons */}
            <div className="bg-white rounded-2xl p-4 border-2 border-gray-100 text-center">
              <p className="text-ink/30 text-xs mb-2.5 font-medium">We accept in-store</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {['💳 Visa', '💳 Mastercard', '💵 Cash', '📱 Contactless'].map(m => (
                  <span key={m} className="text-ink/50 text-xs bg-gray-50 px-2.5 py-1 rounded-full font-medium border border-gray-200">{m}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
