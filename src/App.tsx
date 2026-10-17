import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SessionProvider } from './context/Session'
import { MiseEnPage } from './components/MiseEnPage'
import Accueil from './pages/Accueil'
import Catalogue from './pages/Catalogue'
import Matiere from './pages/Matiere'
import Chapitre from './pages/Chapitre'
import Lecon from './pages/Lecon'
import Editeur from './pages/Editeur'
import Abonnement from './pages/Abonnement'
import PreparationBTS from './pages/PreparationBTS'
import Connexion from './pages/Connexion'
import Profil from './pages/Profil'
import Introuvable from './pages/Introuvable'
import Admin from './pages/Admin'
import NouveauMotDePasse from './pages/NouveauMotDePasse'
import Conditions from './pages/Conditions'
import Diagnostic from './pages/Diagnostic'

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MiseEnPage />}>
            <Route index element={<Accueil />} />
            <Route path="matieres" element={<Catalogue />} />
            <Route path="matieres/:matiere" element={<Matiere />} />
            <Route path="matieres/:matiere/:chapitre" element={<Chapitre />} />
            <Route path="matieres/:matiere/:chapitre/:lecon" element={<Lecon />} />
            <Route path="coder" element={<Editeur />} />
            <Route path="coder/:exercice" element={<Editeur />} />
            <Route path="preparation-bts" element={<PreparationBTS />} />
            <Route path="abonnement" element={<Abonnement />} />
            <Route path="connexion" element={<Connexion />} />
            <Route path="profil" element={<Profil />} />
            <Route path="admin" element={<Admin />} />
            <Route path="nouveau-mot-de-passe" element={<NouveauMotDePasse />} />
            <Route path="conditions" element={<Conditions />} />
            <Route path="diagnostic" element={<Diagnostic />} />
            <Route path="*" element={<Introuvable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}
