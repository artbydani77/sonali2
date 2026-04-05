'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
            style={{ background: 'linear-gradient(180deg, #0d0820 0%, #030208 100%)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h2 className="font-display text-xl font-semibold">Your Cart</h2>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20"
                  >
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="font-display text-xl font-semibold text-white/60 mb-2">Your cart is empty</h3>
                    <p className="text-white/40 text-sm mb-6">Add some sparkle to your celebration!</p>
                    <Link
                      href="/products"
                      onClick={closeCart}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full text-sm hover:from-amber-400 hover:to-orange-500 transition-all"
                    >
                      Browse Products
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 glass rounded-xl p-3"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white/90 truncate">{item.name}</h4>
                        <p className="text-amber-400 font-semibold text-sm mt-0.5">£{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-white/30 hover:text-rose-400 transition-colors self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-xl font-semibold font-display text-amber-400">£{totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all duration-300 glow-gold"
                >
                  View Cart & Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full py-3 glass text-white/70 text-center font-medium rounded-full hover:text-white transition-all text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
