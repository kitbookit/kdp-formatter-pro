import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900 bg-opacity-80 backdrop-blur-md sticky top-0 z-50 border-b border-blue-500 border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/book-publishing-logo.png" alt="Book Publishing" className="h-12 w-auto" />
            <span className="text-xl font-bold" style={{ color: "#0066ff" }}>
              {APP_TITLE}
            </span>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-slate-300 py-2">Ciao, {user?.name || "Utente"}</span>
                <Button
                  onClick={() => logout()}
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                >
                  Esci
                </Button>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Accedi
                </Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span style={{ color: "#0066ff" }}>KDP Formatter Pro</span>
            <span style={{ color: "#0066ff", fontSize: "0.4em", opacity: 0.3, marginLeft: "4px" }}>✡</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto">
            Trasforma il tuo manoscritto in un PDF professionalmente formattato per Amazon KDP
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Crea copertine eleganti, formatta il testo con margini perfetti, e pubblica il tuo libro in pochi minuti
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {isAuthenticated ? (
            <>
              <Link href="/kdp-formatter">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-lg font-bold">
                  Inizia a Formattare
                </Button>
              </Link>
              <Link href="/cover-designer">
                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-8 py-6 rounded-lg font-bold">
                  Crea una Copertina
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-lg font-bold">
                  Accedi e Inizia
                </Button>
              </Link>
              <a href={getLoginUrl()}>
                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-8 py-6 rounded-lg font-bold">
                  Prova Gratis
                </Button>
              </a>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800 bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-20">
            <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
            <p className="text-slate-300">Autori Soddisfatti</p>
          </div>
          <div className="bg-slate-800 bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-20">
            <div className="text-4xl font-bold text-blue-400 mb-2">€2,99</div>
            <p className="text-slate-300">Prezzo Fisso per Progetto</p>
          </div>
          <div className="bg-slate-800 bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-20">
            <div className="text-4xl font-bold text-blue-400 mb-2">60s</div>
            <p className="text-slate-300">Tempo Medio di Elaborazione</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "#0066ff" }}>
          Funzionalità Principali
          <span style={{ fontSize: "0.3em", opacity: 0.2, marginLeft: "8px" }}>✡</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="bg-slate-800 bg-opacity-50 border-blue-500 border-opacity-20 p-8 hover:border-opacity-50 transition-all">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-white mb-3">Formattazione KDP</h3>
            <p className="text-slate-300">
              Margini perfetti e formattazione professionale secondo le specifiche di Amazon KDP
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-slate-800 bg-opacity-50 border-blue-500 border-opacity-20 p-8 hover:border-opacity-50 transition-all">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-white mb-3">Costruttore di Copertine</h3>
            <p className="text-slate-300">
              Crea copertine eleganti e professionali con il nostro editor intuitivo
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-slate-800 bg-opacity-50 border-blue-500 border-opacity-20 p-8 hover:border-opacity-50 transition-all">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-white mb-3">Multilingue</h3>
            <p className="text-slate-300">
              Supporto completo per italiano, inglese, cinese e molte altre lingue
            </p>
          </Card>

          {/* Feature 4 */}
          <Card className="bg-slate-800 bg-opacity-50 border-blue-500 border-opacity-20 p-8 hover:border-opacity-50 transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-3">Veloce e Semplice</h3>
            <p className="text-slate-300">
              Carica, formatta e scarica in pochi minuti. Nessuna complicazione.
            </p>
          </Card>

          {/* Feature 5 */}
          <Card className="bg-slate-800 bg-opacity-50 border-blue-500 border-opacity-20 p-8 hover:border-opacity-50 transition-all">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-2xl font-bold text-white mb-3">Pagamento Sicuro</h3>
            <p className="text-slate-300">
              Transazioni crittografate con Stripe. Nessun abbonamento, solo pagamenti una tantum.
            </p>
          </Card>

          {/* Feature 6 */}
          <Card className="bg-slate-800 bg-opacity-50 border-blue-500 border-opacity-20 p-8 hover:border-opacity-50 transition-all">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-white mb-3">SEO Ottimizzato</h3>
            <p className="text-slate-300">
              Massimizza la visibilità del tuo libro con consigli SEO integrati
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "#0066ff" }}>
          Prezzi Semplici e Trasparenti
          <span style={{ fontSize: "0.3em", opacity: 0.2, marginLeft: "8px" }}>✡</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <Card style={{ backgroundColor: "rgba(30, 41, 59, 0.5)", borderColor: "rgba(59, 130, 246, 0.2)" }} className="border p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Formattazione KDP</h3>
            <div className="text-5xl font-bold text-blue-400 mb-6">€2,99</div>
            <ul className="space-y-3 mb-8 text-slate-300">
              <li>✓ Formattazione PDF completa</li>
              <li>✓ Margini perfetti per la stampa</li>
              <li>✓ Supporto multilingue</li>
              <li>✓ Anteprima KDP</li>
              <li>✓ Download immediato</li>
            </ul>
            {isAuthenticated ? (
              <Link href="/kdp-formatter">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
                  Inizia Ora
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
                  Accedi per Iniziare
                </Button>
              </a>
            )}
          </Card>

          {/* Premium Plan */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 border-2 border-blue-400 relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold">
              ⭐ BESTSELLER
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Pacchetto Completo</h3>
            <div className="text-5xl font-bold text-white mb-2">€4,99</div>
            <p className="text-blue-100 text-sm mb-6">Risparmia €1 vs singoli acquisti</p>
            <ul className="space-y-3 mb-8 text-blue-100">
              <li>✓ Formattazione KDP completa</li>
              <li>✓ Costruttore di Copertine</li>
              <li>✓ Consigli SEO Personalizzati</li>
              <li>✓ Supporto Email Prioritario</li>
              <li>✓ Accesso a Risorse Premium</li>
            </ul>
            {isAuthenticated ? (
              <Link href="/cover-designer">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg">
                  Inizia Ora
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg">
                  Accedi per Iniziare
                </Button>
              </a>
            )}
          </Card>

          {/* Bundle Plan */}
          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 border-2 border-purple-400 relative">
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              🔥 SUPER OFFERTA
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Bundle Totale</h3>
            <div className="text-5xl font-bold text-white mb-2">€6,99</div>
            <p className="text-purple-100 text-sm mb-6">Risparmia €3 vs singoli acquisti</p>
            <ul className="space-y-3 mb-8 text-purple-100">
              <li>✓ Formattazione KDP completa</li>
              <li>✓ Costruttore di Copertine Pro</li>
              <li>✓ Analisi SEO Completa</li>
              <li>✓ Strategie di Marketing</li>
              <li>✓ Supporto Prioritario 24/7</li>
              <li>✓ Accesso Lifetime a Risorse</li>
              <li>✓ Aggiornamenti Futuri Gratis</li>
            </ul>
            {isAuthenticated ? (
              <Link href="/cover-designer">
                <Button className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold py-3 rounded-lg">
                  Compra Ora - Risparmia €3
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold py-3 rounded-lg">
                  Accedi e Risparmia
                </Button>
              </a>
            )}
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-blue-500 border-opacity-20 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Prodotto</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/tutorials" className="hover:text-blue-400">Video Tutorial</a></li>
                <li><a href="#" className="hover:text-blue-400">Prezzi</a></li>
                <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Azienda</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Chi Siamo</a></li>
                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400">Contatti</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legale</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400">Termini</a></li>
                <li><a href="#" className="hover:text-blue-400">Cookie</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Seguici</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400">Facebook</a></li>
                <li><a href="#" className="hover:text-blue-400">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8">
            {/* Payment Methods */}
            <div className="mb-6 pb-6 border-b border-slate-700">
              <p className="text-slate-300 font-semibold mb-3">Sistemi di Pagamento Accettati:</p>
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xl">💳</span>
                  <span>Stripe</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xl">🏦</span>
                  <span>Carte di Credito</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xl">📱</span>
                  <span>Apple Pay</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xl">🔐</span>
                  <span>Google Pay</span>
                </div>
              </div>
            </div>
            {/* Links and Copyright */}
            <div className="text-center text-slate-400">
              <p className="mb-3">
                <a href="/ponte-italia-cina" className="text-blue-400 hover:text-blue-300">🌉 Ponte Italia-Cina</a>
              </p>
              <p>&copy; 2025 KDP Formatter Pro. Tutti i diritti riservati.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

