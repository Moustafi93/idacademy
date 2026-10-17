import { useEffect, useState } from 'react'
import { FORMULES, type Formule } from './paiement'
import { supabase } from './supabase'

// Prix affichés : ceux du serveur en production (table « tarifs »), sinon ceux par défaut
export function useTarifs() {
  const [formules, setFormules] = useState(FORMULES)
  useEffect(() => {
    if (!supabase) return
    supabase
      .from('tarifs')
      .select('formule, prix, jours, actif')
      .then(({ data }) => {
        if (!data?.length) return
        setFormules((f) => {
          const copie = { ...f }
          for (const t of data) {
            const cle = t.formule as Formule
            if (copie[cle]) copie[cle] = { ...copie[cle], prix: t.actif ? t.prix : null, jours: t.jours }
          }
          return copie
        })
      })
  }, [])
  return formules
}
