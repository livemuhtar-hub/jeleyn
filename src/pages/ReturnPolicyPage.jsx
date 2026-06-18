import { motion } from 'framer-motion'
import { RefreshCw, Clock, Package, AlertTriangle } from 'lucide-react'

export default function ReturnPolicyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-gold-400 text-sm font-body tracking-widest uppercase">Politikalar</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">İade & Değişim</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Clock, title: '14 Gün İade Hakkı', desc: 'Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade başvurusu yapabilirsiniz.' },
            { icon: RefreshCw, title: 'Ücretsiz Değişim', desc: 'Beden değişimi için ürünü bize göndermeniz yeterlidir. Değişim kargo ücreti bizden.' },
            { icon: Package, title: 'Orijinal Ambalaj', desc: 'İade edilecek ürünler orijinal ambalajında, etiketleri kesilmemiş ve kullanılmamış olmalıdır.' },
            { icon: AlertTriangle, title: 'İade Edilemeyenler', desc: 'Özel ölçü ile üretilen ürünler, iç giyim ürünleri ve hediye kartları iade edilemez.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl glass-effect">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="text-white font-display font-semibold mb-2">{item.title}</h3>
              <p className="text-dark-400 font-body text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
          <div className="p-6 rounded-xl glass-effect">
            <h3 className="text-white font-display text-lg mb-4">İade Süreci</h3>
            <ol className="space-y-3">
              {[
                'WhatsApp veya e-posta ile iade talebinizi iletin.',
                'Ürünü orijinal ambalajında, etiketleri ile birlikte paketleyin.',
                'Size iletilen kargo kodu ile ürünü gönderiniz.',
                'Ürün tarafımıza ulaştıktan sonra 3 iş günü içinde iade işleminiz tamamlanır.',
                'Ücret iadesi, ödeme yönteminize bağlı olarak 1-5 iş günü içinde hesabınıza yansır.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-dark-300 font-body text-sm">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
