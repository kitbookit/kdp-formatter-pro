import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function BridgeItaliaCina() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/40 border-b border-blue-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-blue-400 hover:text-blue-300 transition">← Torna alla Home</a>
          </Link>
          <h1 className="text-2xl font-bold text-blue-400">Ponte Italia-Cina</h1>
          <div className="w-24"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            🌉 Ponte Italia-Cina
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Connessione culturale e commerciale tra due grandi civiltà
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Section 1 */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-8 backdrop-blur">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">🇮🇹 Italia</h3>
            <p className="text-gray-300 mb-4">
              L'Italia, culla della civiltà occidentale, rappresenta un ponte culturale unico tra Oriente e Occidente. Con una ricca tradizione artistica, letteraria e commerciale, l'Italia ha sempre mantenuto relazioni significative con le civiltà orientali.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>✓ Patrimonio culturale millenario</li>
              <li>✓ Eccellenza artigianale e manifatturiera</li>
              <li>✓ Tradizione letteraria e artistica</li>
              <li>✓ Innovazione nel settore editoriale</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-8 backdrop-blur">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">🇨🇳 Cina</h3>
            <p className="text-gray-300 mb-4">
              La Cina, una delle civiltà più antiche del mondo, è una potenza globale con un'incredibile ricchezza culturale. La tradizione letteraria cinese, che risale a migliaia di anni fa, rappresenta un tesoro inestimabile di saggezza e creatività.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>✓ Civiltà millenaria e filosofia</li>
              <li>✓ Tradizione letteraria straordinaria</li>
              <li>✓ Innovazione tecnologica e digitale</li>
              <li>✓ Mercato editoriale in crescita</li>
            </ul>
          </div>
        </div>

        {/* Bridge Section */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/50 rounded-lg p-12 mb-12 backdrop-blur">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">
            🌍 Il Ponte: Connessione Globale
          </h3>
          <p className="text-gray-200 text-lg mb-6">
            KDP Formatter Pro rappresenta un ponte moderno tra la tradizione letteraria italiana e il mercato editoriale cinese. Attraverso la nostra piattaforma, gli autori italiani possono:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/30 rounded-lg p-6 border border-blue-400/30">
              <h4 className="text-blue-300 font-bold mb-3">📚 Pubblicare Globalmente</h4>
              <p className="text-gray-300">Raggiungere lettori in Cina e in tutto il mondo con formattazione professionale</p>
            </div>
            <div className="bg-black/30 rounded-lg p-6 border border-blue-400/30">
              <h4 className="text-blue-300 font-bold mb-3">🎨 Design Perfetto</h4>
              <p className="text-gray-300">Copertine eleganti e formattazione impeccabile secondo gli standard internazionali</p>
            </div>
            <div className="bg-black/30 rounded-lg p-6 border border-blue-400/30">
              <h4 className="text-blue-300 font-bold mb-3">🚀 Crescita Esponenziale</h4>
              <p className="text-gray-300">Accesso a mercati emergenti e opportunità di guadagno senza limiti</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-900/40 rounded-lg p-6 text-center border border-blue-500/30">
            <div className="text-4xl font-bold text-blue-300 mb-2">1.4B</div>
            <p className="text-gray-300">Lettori in Cina</p>
          </div>
          <div className="bg-blue-900/40 rounded-lg p-6 text-center border border-blue-500/30">
            <div className="text-4xl font-bold text-blue-300 mb-2">60M</div>
            <p className="text-gray-300">Lettori in Italia</p>
          </div>
          <div className="bg-blue-900/40 rounded-lg p-6 text-center border border-blue-500/30">
            <div className="text-4xl font-bold text-blue-300 mb-2">100+</div>
            <p className="text-gray-300">Paesi raggiunti</p>
          </div>
          <div className="bg-blue-900/40 rounded-lg p-6 text-center border border-blue-500/30">
            <div className="text-4xl font-bold text-blue-300 mb-2">24/7</div>
            <p className="text-gray-300">Supporto Globale</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Inizia il Tuo Viaggio Globale Oggi
          </h3>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Torna a KDP Formatter Pro
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-blue-500/20 mt-16 py-8 bg-black/40">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>© 2025 KDP Formatter Pro - Ponte Italia-Cina</p>
          <p className="mt-2">Connettendo autori e lettori in tutto il mondo</p>
        </div>
      </div>
    </div>
  );
}

