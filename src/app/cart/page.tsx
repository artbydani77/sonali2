'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart()

  const shipping = 0 // free collection
  const savings = items.reduce((sum, item) => {
    if (item.originalPrice) return sum + (item.originalPrice - item.price) * item.quantity
    return sum
  }, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="font-display text-4xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything yet. Browse our amazing range of party supplies!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full glow-gold hover:from-amber-400 hover:to-orange-500 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="font-display text-4xl font-bold text-white">Your Cart</h1>
            <p className="text-white/40 mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Continue shopping
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="glass rounded-2xl p-5 border border-white/5 flex gap-5"
                >
                  <Link href={`/products/${item.slug}`} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/products/${item.slug}`} className="font-semibold text-white hover:text-amber-400 transition-colors leading-tight">
                          {item.name}
                        </Link>
                        <p className="text-white/40 text-sm mt-0.5">{item.description.slice(0, 60)}...</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-white/30 hover:text-rose-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center glass rounded-full border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-white text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-amber-400 font-display">£{(item.price * item.quantity).toFixed(2)}</div>
                        {item.quantity > 1 && <div className="text-white/30 text-xs">£{item.price.toFixed(2)} each</div>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="text-white/30 hover:text-rose-400 transition-colors text-sm flex items-center gap-1.5 mt-4"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Promo */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <label className="block text-white/60 text-sm font-medium mb-2">Promo Code</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Enter code..."
                    className="w-full pl-9 pr-3 py-2.5 glass rounded-lg text-white/70 placeholder-white/30 text-sm focus:outline-none border border-white/10 bg-transparent"
                  />
                </div>
                <button className="px-4 py-2.5 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/30 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="glass rounded-2xl p-6 border border-amber-500/20">
              <h2 className="font-display text-xl font-bold text-white mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal ({totalItems} items)</span>
                  <span className="text-white">£{totalPrice.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">Savings</span>
                    <span className="text-emerald-400">-£{savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Collection</span>
                  <span className="text-emerald-400 font-medium">Free</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-white font-semibold">Total</span>
                  <span className="font-display text-3xl font-bold text-amber-400">£{(totalPrice + shipping).toFixed(2)}</span>
                </div>
                <p className="text-white/30 text-xs mt-1">Collect in-store at 28 Bilton Road, Perivale</p>
              </div>
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full glow-gold hover:from-amber-400 hover:to-orange-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.7)]"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Acceptance icons */}
            <div className="glass rounded-2xl p-4 border border-white/5">
              <p className="text-white/30 text-xs text-center mb-3">We accept</p>
              <div className="flex justify-center gap-3">
                {['💳 Visa', '💳 Mastercard', '💵 Cash', '📱 Contactless'].map(m => (
                  <span key={m} className="text-white/40 text-xs glass px-2 py-1 rounded">{m}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
