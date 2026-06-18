import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ShoppingBag } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-8xl font-display font-bold text-gold-400 mb-4">404</h1>
        <h2 className="text-2xl font-display text-white mb-4">Sayfa Bulunamadı</h2>
        <p className="text-dark-400 font-body mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek alışverişe devam edebilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all">
            <Home className="w-4 h-4" />
            Ana Sayfa
          </Link>
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 hover:border-gold-400/40 text-white hover:text-gold-400 font-body font-medium rounded-full transition-all">
            <ShoppingBag className="w-4 h-4" />
            Koleksiyon
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
