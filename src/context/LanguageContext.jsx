import { createContext, useContext, useState } from 'react'
import translations from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('tr')

  const t = translations[lang]
  const changeLang = (newLang) => setLang(newLang)

  return (
    <LanguageContext.Provider value={{ lang, t, changeLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
