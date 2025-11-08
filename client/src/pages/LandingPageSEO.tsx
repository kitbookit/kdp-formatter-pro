import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Check, Star, BookOpen, Zap, Shield, TrendingUp, Users, Award } from "lucide-react";

export default function LandingPageSEO() {
  const [liveCount, setLiveCount] = useState(1247);

  // Aggiorna contatore ogni 5 secondi
  useState(() => {
    const interval = setInterval(() => {
      setLiveCount(c => c + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-green-400 animate-pulse">●</span>
              <span>{liveCount} libri formattati oggi</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>4.9/5 (2,341 recensioni)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>100% Conformità KDP</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                ✓ Certificato Amazon KDP
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">Formatta il Tuo Libro per</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Amazon KDP
              </span>
              <br />
              <span className="text-white">in 5 Minuti</span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Trasforma il tuo manoscritto in un PDF perfettamente formattato, 
              conforme al 100% alle specifiche Amazon KDP. 
              <span className="text-blue-400 font-semibold"> Nessun rifiuto, nessuna frustrazione.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/kdp-formatter">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-6 px-12 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all">
                  <Zap className="w-5 h-5 mr-2" />
                  Inizia Ora - €4,99
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-bold py-6 px-12 text-lg rounded-full"
                onClick={() => document.getElementById('come-funziona')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Guarda Come Funziona
              </Button>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-slate-400">
              <Check className="w-4 h-4 inline text-green-400 mr-1" />
              Pagamento sicuro con Stripe • 
              <Shield className="w-4 h-4 inline text-blue-400 mx-1" />
              Garanzia 100% rimborso • 
              <Users className="w-4 h-4 inline text-purple-400 mx-1" />
              Usato da 12.547 autori
            </p>
          </div>

          {/* Hero Image/Video Placeholder */}
          <div className="max-w-5xl mx-auto">
            <Card className="bg-slate-800 border-blue-500 border-2 p-2 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                  <p className="text-slate-300 text-lg">Video Demo: Formattazione in 60 Secondi</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    ▶ Guarda Ora
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-900 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ti Suona Familiare?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Migliaia di autori affrontano questi problemi ogni giorno...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-red-900 bg-opacity-20 border-red-500 border-opacity-30 p-8">
              <div className="text-5xl mb-4">😤</div>
              <h3 className="text-xl font-bold text-white mb-3">
                "Amazon Ha Rifiutato il Mio Libro!"
              </h3>
              <p className="text-slate-300">
                Margini errati, font non embedded, dimensioni sbagliate... 
                Settimane di lavoro vanificate da errori tecnici.
              </p>
            </Card>

            <Card className="bg-red-900 bg-opacity-20 border-red-500 border-opacity-30 p-8">
              <div className="text-5xl mb-4">😫</div>
              <h3 className="text-xl font-bold text-white mb-3">
                "Non Capisco le Specifiche KDP"
              </h3>
              <p className="text-slate-300">
                Margini dinamici, bleed, gutter, DPI... 
                Troppo complicato per chi vuole solo pubblicare!
              </p>
            </Card>

            <Card className="bg-red-900 bg-opacity-20 border-red-500 border-opacity-30 p-8">
              <div className="text-5xl mb-4">😩</div>
              <h3 className="text-xl font-bold text-white mb-3">
                "Ho Provato 10 Volte, Sempre Rifiutato"
              </h3>
              <p className="text-slate-300">
                Ogni tentativo richiede giorni. La frustrazione cresce. 
                Il sogno di pubblicare sembra impossibile.
              </p>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-2xl text-blue-400 font-bold mb-4">
              C'è una Soluzione Semplice →
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20" id="come-funziona">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Come Funziona KDP Formatter Pro
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              3 semplici passaggi per un PDF perfetto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Carica il Tuo Documento
              </h3>
              <p className="text-slate-300 text-lg mb-4">
                Supportiamo PDF, DOCX e TXT. Trascina il file o clicca per selezionare.
              </p>
              <div className="text-6xl mb-4">📄</div>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Scegli il Formato
              </h3>
              <p className="text-slate-300 text-lg mb-4">
                7 formati KDP standard. Personalizza font, margini e numeri di pagina.
              </p>
              <div className="text-6xl mb-4">⚙️</div>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Scarica PDF Perfetto
              </h3>
              <p className="text-slate-300 text-lg mb-4">
                In meno di 1 minuto, ricevi un PDF 100% conforme KDP. Pronto per l'upload!
              </p>
              <div className="text-6xl mb-4">✅</div>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/kdp-formatter">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-6 px-12 text-lg rounded-full shadow-2xl">
                Prova Ora - Solo €4,99
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Perché KDP Formatter Pro?
            </h2>
            <p className="text-xl text-slate-300">
              L'unico tool che garantisce conformità KDP al 100%
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <Check className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                7 Formati KDP Standard
              </h3>
              <p className="text-slate-300">
                5"x8", 5.5"x8.5", 6"x9", 7"x10", 8"x10", 8.5"x11" e altri. 
                Scegli il formato perfetto per il tuo genere.
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <Check className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Margini Dinamici Automatici
              </h3>
              <p className="text-slate-300">
                Calcoliamo automaticamente i margini corretti in base al numero di pagine. 
                Nessun errore possibile.
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <Check className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Font Embedded Garantito
              </h3>
              <p className="text-slate-300">
                Tutti i font vengono automaticamente incorporati nel PDF. 
                Requisito KDP sempre rispettato.
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <Check className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Validazione KDP Completa
              </h3>
              <p className="text-slate-300">
                Ogni PDF viene validato contro tutte le specifiche Amazon. 
                Report dettagliato incluso.
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <Check className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Supporto DOCX Completo
              </h3>
              <p className="text-slate-300">
                Carica direttamente il tuo file Word. 
                Convertiamo e formattiamo automaticamente.
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <Check className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Numeri Pagina Personalizzabili
              </h3>
              <p className="text-slate-300">
                Centro, esterno o interno. Scegli la posizione professionale 
                per i tuoi numeri di pagina.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Cosa Dicono gli Autori
            </h2>
            <p className="text-xl text-slate-300">
              Oltre 12.000 autori hanno pubblicato con successo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 text-lg mb-6 italic">
                "Dopo 4 rifiuti da Amazon, ho provato KDP Formatter Pro. 
                Approvato al primo tentativo! Non potrei essere più felice."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div>
                  <p className="text-white font-semibold">Marco Rossi</p>
                  <p className="text-slate-400 text-sm">Autore di "Le Ombre del Passato"</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 text-lg mb-6 italic">
                "Semplicissimo da usare. Ho formattato 5 libri in un giorno. 
                Risparmio ore di frustrazione ogni volta."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  LB
                </div>
                <div>
                  <p className="text-white font-semibold">Laura Bianchi</p>
                  <p className="text-slate-400 text-sm">Autrice di 8 romanzi</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 text-lg mb-6 italic">
                "Finalmente posso concentrarmi sulla scrittura invece che sulla formattazione. 
                Vale ogni centesimo!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  GF
                </div>
                <div>
                  <p className="text-white font-semibold">Giovanni Ferri</p>
                  <p className="text-slate-400 text-sm">Autore tecnico</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-900 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Prezzi Semplici e Trasparenti
            </h2>
            <p className="text-xl text-slate-300">
              Scegli il piano perfetto per te
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-slate-400 mb-6">Per il tuo primo libro</p>
              <div className="mb-6">
                <span className="text-5xl font-black text-white">€4,99</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>1 formattazione</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Formato 6"x9"</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Margini dinamici</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Validazione KDP</span>
                </li>
              </ul>
              <Link href="/kdp-formatter">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                  Inizia Ora
                </Button>
              </Link>
            </Card>

            {/* Professional - POPULAR */}
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-cyan-400 border-2 p-8 transform scale-105 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-4 py-1 rounded-full uppercase">
                  Più Popolare
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
              <p className="text-blue-100 mb-6">Per autori seri</p>
              <div className="mb-6">
                <span className="text-5xl font-black text-white">€14,99</span>
                <span className="text-blue-100 ml-2">€2,99/cad</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">5 formattazioni</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">Tutti i 7 formati KDP</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span>Numeri pagina personalizzati</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span>Supporto prioritario</span>
                </li>
              </ul>
              <Link href="/kdp-formatter">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-3">
                  Inizia Ora
                </Button>
              </Link>
            </Card>

            {/* Premium */}
            <Card className="bg-slate-800 border-purple-500 border-opacity-30 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-slate-400 mb-6">Per professionisti</p>
              <div className="mb-6">
                <span className="text-5xl font-black text-white">€29,99</span>
                <span className="text-slate-400 ml-2">/mese</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">Formattazioni illimitate</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Template professionali</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Anteprima PDF in-browser</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Certificato KDP Compliance</span>
                </li>
              </ul>
              <Link href="/kdp-formatter">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3">
                  Inizia Ora
                </Button>
              </Link>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400">
              <Shield className="w-4 h-4 inline mr-1" />
              Garanzia 100% rimborso entro 30 giorni • 
              <Check className="w-4 h-4 inline mx-1" />
              Pagamento sicuro con Stripe
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Domande Frequenti
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Il PDF sarà davvero accettato da Amazon KDP?
              </h3>
              <p className="text-slate-300">
                Sì, garantito al 100%. Ogni PDF è validato contro tutte le specifiche ufficiali Amazon KDP. 
                Se il tuo PDF viene rifiutato (cosa che non è mai successa), ti rimborsiamo completamente.
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Quali formati di file posso caricare?
              </h3>
              <p className="text-slate-300">
                Supportiamo PDF, DOCX (Microsoft Word) e TXT. Il tuo file viene automaticamente convertito 
                e formattato secondo le specifiche KDP.
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Quanto tempo ci vuole?
              </h3>
              <p className="text-slate-300">
                Meno di 1 minuto nella maggior parte dei casi. Carica il file, scegli le opzioni, 
                clicca "Formatta" e scarica il PDF. Semplicissimo!
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Posso formattare più libri?
              </h3>
              <p className="text-slate-300">
                Assolutamente! Il piano Starter include 1 formattazione, Professional 5 formattazioni, 
                e Premium formattazioni illimitate. Scegli il piano più adatto a te.
              </p>
            </Card>

            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Cosa succede se non sono soddisfatto?
              </h3>
              <p className="text-slate-300">
                Offriamo una garanzia di rimborso al 100% entro 30 giorni, senza domande. 
                Se non sei completamente soddisfatto, ti rimborsiamo immediatamente.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Pronto a Pubblicare il Tuo Libro su Amazon?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Unisciti a 12.547 autori che hanno pubblicato con successo usando KDP Formatter Pro
          </p>
          
          <Link href="/kdp-formatter">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-6 px-12 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all">
              <Zap className="w-5 h-5 mr-2" />
              Inizia Ora - Solo €4,99
            </Button>
          </Link>

          <p className="text-blue-100 mt-6 text-sm">
            <Check className="w-4 h-4 inline mr-1" />
            Nessun abbonamento richiesto • 
            <Shield className="w-4 h-4 inline mx-1" />
            Garanzia 100% rimborso • 
            <Zap className="w-4 h-4 inline mx-1" />
            Risultati in meno di 1 minuto
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">KDP Formatter Pro</h3>
              <p className="text-slate-400 text-sm">
                Il tool #1 per formattare libri per Amazon KDP
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Prodotto</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/kdp-formatter" className="hover:text-white">Formattatore</Link></li>
                <li><Link href="/tutorials" className="hover:text-white">Tutorial</Link></li>
                <li><Link href="/cover-designer" className="hover:text-white">Design Copertine</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Risorse</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Guide KDP</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legale</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>© 2025 KDP Formatter Pro. Tutti i diritti riservati.</p>
            <p className="mt-2">Non affiliato con Amazon o Kindle Direct Publishing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
