import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Home } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function OrderConfirmPage() {
  const { t } = useLang()
  const orderNumber = `JLN-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/10 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-green-400" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{t.order.title}</h1>
        <p className="text-dark-400 font-body mb-2">{t.order.desc}</p>
        <p className="text-gold-400 font-body font-semibold text-lg mb-8">{t.order.orderNo}: {orderNumber}</p>

        <div className="p-6 rounded-2xl glass-effect mb-10">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <p className="text-white font-display font-semibold">{t.order.delivery}</p>
              <p className="text-dark-400 font-body text-sm">{t.order.deliveryDesc}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold text-sm tracking-wider uppercase rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/25">
            <Home className="w-4 h-4" />
            {t.order.home}
          </Link>
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-gold-400/40 hover:text-gold-400 text-white/80 font-body font-medium text-sm tracking-wider uppercase rounded-full transition-all duration-500">
            {t.order.continueShopping}
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
