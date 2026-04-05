'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
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
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col bg-cream shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b-2 border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-party-red/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-party-red" />
                </div>
                <h2 className="font-display font-800 text-xl text-ink">Your Cart</h2>
                {totalItems > 0 && (
                  <span className="badge bg-party-red/10 text-party-red">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-ink/50" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20"
                  >
                    <div className="text-6xl mb-4 animate-float-slow">🛒</div>
                    <h3 className="font-display font-800 text-xl text-ink/60 mb-2">Cart is empty!</h3>
                    <p className="text-ink/40 text-sm mb-6">Add some party magic ✨</p>
                    <Link href="/products" onClick={closeCart} className="btn btn-red">
                      Browse Products
                    </Link>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="bg-white rounded-2xl p-3.5 flex gap-3.5 shadow-card border border-gray-100"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-700 text-sm text-ink truncate">{item.name}</h4>
                        <p className="text-party-red font-display font-800 text-sm mt-0.5">£{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3 text-ink/60" />
                          </button>
                          <span className="text-ink font-700 text-sm w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3 text-ink/60" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)}
                        className="p-1.5 text-ink/20 hover:text-party-red transition-colors self-start"
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
              <div className="px-5 py-5 border-t-2 border-gray-100 bg-white space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-ink/60 font-medium text-sm">Total</span>
                  <span className="font-display font-900 text-2xl text-ink">£{totalPrice.toFixed(2)}</span>
                </div>
                <Link href="/cart" onClick={closeCart}
                  className="btn btn-red w-full justify-center text-base"
                >
                  View Cart & Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={closeCart}
                  className="w-full py-2.5 rounded-full text-ink/50 text-sm font-display font-700 hover:bg-gray-50 transition-colors"
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
