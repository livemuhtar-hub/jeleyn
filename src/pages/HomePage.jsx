import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Award, Truck, Shield } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { useLang } from '../context/LanguageContext'

export default function HomePage() {
  const { t } = useLang()
  const { products } = useProducts()
  const featuredProducts = products.filter(p => p.featured)
  const newProducts = products.filter(p => p.new)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-110 animate-[slowZoom_25s_ease-in-out_infinite_alternate]"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Premium Overlay Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-950/40 to-dark-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 via-transparent to-dark-950/40" />
          <div className="absolute inset-0 bg-dark-950/15" />
          {/* Gold shimmer accent */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/[0.03] via-transparent to-gold-500/[0.05]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-gold-500/20 bg-dark-950/30 backdrop-blur-sm mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400/90 text-xs font-body tracking-[0.3em] uppercase">{t.hero.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            </div>

            <h1 className="mb-8">
              <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-white/90 leading-none">
                {t.hero.title1}
              </span>
              <span className="block font-display italic text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-400 leading-none mt-2 drop-shadow-[0_0_30px_rgba(180,130,11,0.4)]">
                {t.hero.title2}
              </span>
              <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-white/90 leading-none mt-2">
                {t.hero.title3}
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
              <Sparkles className="w-4 h-4 text-gold-400/60" />
              <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>

            <p className="max-w-xl mx-auto text-dark-300/80 text-base md:text-lg font-body font-light leading-relaxed tracking-wide mb-12">
              {t.hero.subtitle}
              <br className="hidden sm:block" />
              {t.hero.subtitleLine2}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold tracking-wider text-sm uppercase rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25 group"
              >
                {t.hero.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/20 hover:border-gold-400/40 hover:text-gold-400 text-white/80 font-body font-medium tracking-wider text-sm uppercase rounded-full transition-all duration-500"
              >
                {t.hero.story}
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-gold-400/50 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-gold-400 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: t.features.quality, desc: t.features.qualityDesc },
              { icon: Truck, title: t.features.delivery, desc: t.features.deliveryDesc },
              { icon: Shield, title: t.features.secure, desc: t.features.secureDesc },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center p-8 rounded-2xl glass-effect hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-display text-xl text-white mb-2">{feature.title}</h3>
                <p className="text-dark-400 text-sm font-body">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold-400 text-sm font-body tracking-widest uppercase">{t.products.featured}</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
                {t.products.featuredTitle}
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold-500/50 hover:bg-gold-500 hover:text-dark-950 text-gold-400 font-body font-medium rounded-full transition-all duration-300 group"
            >
              {t.products.viewAll}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold-400 text-sm font-body tracking-widest uppercase">{t.products.newSeason}</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
                {t.products.newArrivals}
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold-400 text-sm font-body tracking-widest uppercase">{t.testimonials.subtitle}</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
                {t.testimonials.title}
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl glass-effect hover:bg-white/[0.06] transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-gold-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-dark-300 font-body text-sm leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
                <div>
                  <p className="text-white font-display font-semibold">{review.name}</p>
                  <p className="text-gold-400/70 text-xs font-body">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              {t.newsletter.title}
            </h3>
            <p className="text-dark-400 font-body text-sm mb-8">
              {t.newsletter.desc}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="flex-1 px-6 py-3.5 rounded-full bg-dark-950 border border-white/10 text-white font-body text-sm placeholder:text-dark-500 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold text-sm tracking-wider uppercase rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/25"
              >
                {t.newsletter.subscribe}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/14876544/pexels-photo-14876544.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Custom Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-950/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-dark-300 text-lg font-body mb-8 max-w-2xl mx-auto">
              {t.cta.desc}
            </p>
            <a
              href="https://wa.me/905369321474"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/30"
            >
              {t.cta.contact}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
