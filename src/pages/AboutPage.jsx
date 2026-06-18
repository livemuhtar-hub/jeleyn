import { motion } from 'framer-motion'
import { Sparkles, Heart, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/9881075/pexels-photo-9881075.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="About" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark-950/85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold-400 text-sm font-body tracking-widest uppercase">Hikayemiz</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
              Zarafeti <br /><span className="text-gradient">Yeniden Tanımlıyoruz</span>
            </h1>
            <p className="text-dark-300 text-lg font-body max-w-2xl mx-auto leading-relaxed">
              JE'LEYN, modern kadınların zarif ve konforlu abaya arayışına cevap vermek amacıyla kurulmuş premium bir markadır.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative">
                <img src="https://images.pexels.com/photos/14850599/pexels-photo-14850599.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Story" className="rounded-2xl gold-border w-full aspect-[3/4] object-cover" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-500/10 rounded-2xl border border-gold-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-3xl font-display font-bold text-gold-400">5+</span>
                    <span className="text-dark-400 text-xs font-body">Yıllık Deneyim</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-gold-400 text-sm font-body tracking-widest uppercase">Hakkımızda</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-3 mb-6">
                Tutkumuz, <span className="text-gradient">Zarafetiniz</span>
              </h2>
              <div className="space-y-4 text-dark-300 font-body leading-relaxed">
                <p>JE'LEYN, her kadının kendini özel ve güzel hissetmesini sağlayacak abaya tasarımları üretmek amacıyla kurulmuştur. Premium kumaşlar ve özenli el işçiliği ile hazırlanan koleksiyonlarımız, günlük hayattan özel günlere kadar her an için mükemmel seçenekler sunar.</p>
                <p>Geleneksel zarafeti modern çizgilerle buluşturarak, zamansız bir stil sunuyoruz. Her tasarımımızda kalite, estetik ve rahatlığı bir arada sunmayı hedefliyoruz.</p>
                <p>Amacımız, dünya genelinde zarif abaya tasarımlarıyla tanınan bir marka olmak ve modest moda dünyasına değer katmaktır.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '5000+', label: 'Mutlu Müşteri' },
              { icon: Award, value: '200+', label: 'Ürün Çeşidi' },
              { icon: Heart, value: '50+', label: 'Şehire Teslimat' },
              { icon: Sparkles, value: '5+', label: 'Yıllık Deneyim' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-gold-400" />
                </div>
                <span className="block text-3xl font-display font-bold text-white">{stat.value}</span>
                <span className="text-dark-400 text-sm font-body">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-400 text-sm font-body tracking-widest uppercase">Değerlerimiz</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-3">Neden JE'LEYN?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Özgün Tasarım', desc: 'Her abaya, modern kadının ihtiyaçları göz önünde tutularak sıfırdan tasarlanır.' },
              { title: 'Premium Kalite', desc: 'Yalnızca en kaliteli kumaşlar ve profesyonel dikim teknikleri kullanılır.' },
              { title: 'Kişiye Özel', desc: 'İsteğe göre özel ölçü ve model seçenekleri ile kişiye özel abaya üretimi yapılır.' },
            ].map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="p-8 rounded-2xl glass-effect hover:bg-white/[0.08] transition-all duration-300 text-center">
                <div className="w-1 h-12 bg-gold-500 mx-auto mb-6 rounded-full" />
                <h3 className="text-white font-display text-xl mb-3">{value.title}</h3>
                <p className="text-dark-400 font-body text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
