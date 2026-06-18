import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import translations from '../data/translations'

const languages = Object.keys(translations).map(key => ({
  code: key,
  name: translations[key].lang,
  flag: translations[key].flag,
}))

export default function LanguageSwitcher() {
  const { lang, changeLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = languages.find(l => l.code === lang)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-dark-200 hover:text-gold-400 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-body hidden sm:inline">{current?.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-44 bg-dark-900/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => { changeLang(l.code); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${lang === l.code ? 'bg-white/5 text-gold-400' : 'text-dark-300'}`}
            >
              <span className="text-lg">{l.flag}</span>
              <span className="font-body text-sm">{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
