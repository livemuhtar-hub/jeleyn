import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'

export default function CartPage() {
  const { t } = useLang()
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-900 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-dark-600" />
          </div>
          <h2 className="text-2xl font-display text-white mb-3">{t.cart.empty}</h2>
          <p className="text-dark-400 font-body mb-8">{t.cart.emptyDesc}</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all"
          >
            {t.cart.explore}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-10">
            {t.cart.title} <span className="text-gold-400">({items.length})</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 rounded-xl glass-effect"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-28 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-display text-lg font-semibold truncate">{item.name}</h3>
                  <p className="text-dark-400 font-body text-sm mt-1">
                    Beden: <span className="text-gold-400">{item.size}</span>
                    {item.color && <> &middot; Renk: <span className="text-gold-400">{item.color}</span></>}
                  </p>
                  <p className="text-gold-400 font-body font-bold mt-2">
                    {item.price.toLocaleString('tr-TR')} ₺
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center gap-2 glass-effect rounded-lg px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 rounded flex items-center justify-center text-dark-300 hover:text-gold-400 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white font-body font-semibold w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 rounded flex items-center justify-center text-dark-300 hover:text-gold-400 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-dark-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-xl glass-effect">
              <h3 className="text-white font-display text-xl mb-6">Sipariş Özeti</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-dark-400">Ara Toplam</span>
                  <span className="text-white">{cartTotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-dark-400">Kargo</span>
                  <span className="text-green-400">Ücretsiz</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-body font-semibold">Toplam</span>
                  <span className="text-gold-400 font-body font-bold text-xl">
                    {cartTotal.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/30"
              >
                {t.cart.checkout}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop"
                className="w-full flex items-center justify-center gap-2 py-3 mt-3 text-dark-400 hover:text-gold-400 font-body text-sm transition-colors"
              >
                {t.order.continueShopping}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
