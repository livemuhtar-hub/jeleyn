import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, ChevronLeft, Minus, Plus, Check, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function ProductPage() {
  const { products } = useProducts()
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id) || p.id === id)
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display text-white mb-4">Ürün bulunamadı</h2>
          <Link to="/shop" className="text-gold-400 hover:underline font-body">Koleksiyona dön</Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor || product.colors[0],
    }, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-400 transition-colors font-body text-sm mb-8">
          <ChevronLeft className="w-4 h-4" />
          Koleksiyona Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4 gold-border">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-red-600 text-white text-sm font-bold font-body rounded-full">
                  %{discount} İNDİRİM
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-gold-500' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-dark-600'}`}
                  />
                ))}
              </div>
              <span className="text-dark-400 text-sm font-body">
                {product.rating} ({product.reviews} değerlendirme)
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-body font-bold text-gold-400">
                {product.price.toLocaleString('tr-TR')} ₺
              </span>
              {product.originalPrice && (
                <span className="text-xl text-dark-500 font-body line-through">
                  {product.originalPrice.toLocaleString('tr-TR')} ₺
                </span>
              )}
            </div>

            <p className="text-dark-300 font-body leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-6">
              <h3 className="text-white font-body font-medium text-sm mb-3">
                Renk: <span className="text-gold-400">{selectedColor || 'Seçiniz'}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm font-body transition-all ${
                      selectedColor === color
                        ? 'bg-gold-500 text-dark-950 font-semibold'
                        : 'glass-effect text-dark-300 hover:border-gold-500/30'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-body font-medium text-sm mb-3">
                Beden: <span className="text-gold-400">{selectedSize || 'Seçiniz'}</span>
              </h3>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg text-sm font-body font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-gold-500 text-dark-950 font-bold'
                        : 'glass-effect text-dark-300 hover:border-gold-500/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-white font-body font-medium text-sm mb-3">Adet</h3>
              <div className="inline-flex items-center gap-4 glass-effect rounded-lg px-2 py-1">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-md flex items-center justify-center text-dark-300 hover:text-gold-400 hover:bg-white/5 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-body font-semibold text-lg w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 rounded-md flex items-center justify-center text-dark-300 hover:text-gold-400 hover:bg-white/5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-body font-semibold text-lg transition-all duration-300 ${
                  !selectedSize
                    ? 'bg-dark-800 text-dark-500 cursor-not-allowed'
                    : added
                    ? 'bg-green-600 text-white'
                    : 'bg-gold-500 hover:bg-gold-400 text-dark-950 hover:shadow-lg hover:shadow-gold-500/30'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Sepete Eklendi!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Sepete Ekle
                  </>
                )}
              </button>
              <button className="w-14 h-14 rounded-full glass-effect flex items-center justify-center text-dark-300 hover:text-red-400 hover:border-red-400/30 transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-white font-display text-lg mb-4">Ürün Detayları</h3>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-dark-300 font-body text-sm">
                    <Check className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
