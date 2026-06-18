import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Sipariş verdikten ne kadar sürede kargoya verilir?', a: 'Siparişleriniz 1-2 iş günü içinde hazırlanarak kargoya verilir. Kargo süresi bulunduğunuz şehre göre 1-3 iş günü arasında değişir.' },
  { q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', a: 'Havale/EFT, kredi kartı ve kapıda ödeme seçeneklerimiz mevcuttur. Kapıda ödeme seçeneğinde ek ücret uygulanmamaktadır.' },
  { q: 'Ürünleri iade edebilir miyim?', a: '14 gün içinde, kullanılmamış ve etiketleri sökülmemiş ürünleri iade edebilirsiniz. İade kargo ücreti müşteriye aittir.' },
  { q: 'Özel ölçü ile sipariş verebilir miyim?', a: 'Evet! Özel ölçü siparişleri için WhatsApp üzerinden bizimle iletişime geçebilirsiniz. Özel ölçü siparişleri 5-7 iş günü içinde hazırlanır.' },
  { q: 'Kargo ücreti ne kadar?', a: '500 ₺ ve üzeri siparişlerde kargo ücretsizdir. 500 ₺ altı siparişlerde sabit 49 ₺ kargo ücreti uygulanır.' },
  { q: 'Ürünleriniz hangi kumaşlardan üretiliyor?', a: 'Koleksiyonlarımızda medine ipeği, krep, şifon, duchess saten ve premium polyester karışımlı kumaşlar kullanılmaktadır. Her ürünün kumaş bilgisi detay sayfasında belirtilmiştir.' },
  { q: 'Yurt dışına teslimat yapıyor musunuz?', a: 'Şu anda yurt içi teslimat yapıyoruz. Yurt dışı teslimat için WhatsApp üzerinden özel bilgi alabilirsiniz.' },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-gold-400 text-sm font-body tracking-widest uppercase">SSS</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">Sıkça Sorulan Sorular</h1>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl glass-effect overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-body font-medium pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-dark-400 font-body text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
