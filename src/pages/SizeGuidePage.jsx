import { motion } from 'framer-motion'

const sizes = [
  { size: 'S', bust: '84-88', waist: '64-68', hips: '90-94', length: '140' },
  { size: 'M', bust: '88-92', waist: '68-72', hips: '94-98', length: '142' },
  { size: 'L', bust: '92-96', waist: '72-76', hips: '98-102', length: '144' },
  { size: 'XL', bust: '96-100', waist: '76-80', hips: '102-106', length: '146' },
  { size: 'XXL', bust: '100-104', waist: '80-84', hips: '106-110', length: '148' },
]

export default function SizeGuidePage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-gold-400 text-sm font-body tracking-widest uppercase">Beden Rehberi</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-4">Doğru Bedeni Bulun</h1>
          <p className="text-dark-400 font-body max-w-2xl mx-auto">
            Mükemmel uyum için aşağıdaki tabloyu referans alın. Ölçüleriniz iki beden arasında kalıyorsa, rahat bir fit için büyük bedeni tercih edin.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-left text-gold-400 font-display text-sm">Beden</th>
                <th className="py-4 px-6 text-left text-gold-400 font-display text-sm">Göğüs (cm)</th>
                <th className="py-4 px-6 text-left text-gold-400 font-display text-sm">Bel (cm)</th>
                <th className="py-4 px-6 text-left text-gold-400 font-display text-sm">Kalça (cm)</th>
                <th className="py-4 px-6 text-left text-gold-400 font-display text-sm">Boy (cm)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-white font-body font-semibold">{row.size}</td>
                  <td className="py-4 px-6 text-dark-300 font-body">{row.bust}</td>
                  <td className="py-4 px-6 text-dark-300 font-body">{row.waist}</td>
                  <td className="py-4 px-6 text-dark-300 font-body">{row.hips}</td>
                  <td className="py-4 px-6 text-dark-300 font-body">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-display font-bold text-white mb-6">Nasıl Ölçüm Alınır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Göğüs', desc: 'Göğsün en geniş noktasından ölçüm yapın. Mezura sırtınızda düz olmalıdır.' },
              { title: 'Bel', desc: 'Doğal bel hattınızdan (en dar nokta) ölçüm alın. Nefes verirken ölçün.' },
              { title: 'Kalça', desc: 'Kalçanın en geniş noktasından ölçüm yapın. Ayaklarınız bitişik olmalıdır.' },
            ].map((tip, i) => (
              <div key={i} className="p-6 rounded-xl glass-effect">
                <h3 className="text-gold-400 font-display font-semibold mb-2">{tip.title}</h3>
                <p className="text-dark-400 font-body text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-gold-500/20 bg-gold-500/5">
            <p className="text-dark-300 font-body text-sm">
              <span className="text-gold-400 font-semibold">İpucu:</span> Abayalarda rahat bir fit tercih edilir. Ölçüleriniz konusunda emin değilseniz, WhatsApp üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
