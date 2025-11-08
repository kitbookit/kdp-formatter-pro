import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

interface CoverDesign {
  title: string;
  author: string;
  backgroundColor: string;
  titleColor: string;
  titleFont: string;
  titleFontSize: number;
}

export default function CoverDesigner() {
  const { user, isAuthenticated } = useAuth();
  const [design, setDesign] = useState<CoverDesign>({
    title: "Il Mio Libro",
    author: "Nome Autore",
    backgroundColor: "#ffffff",
    titleColor: "#0066ff",
    titleFont: "Georgia",
    titleFontSize: 48,
  });

  const [generatedCoverUrl, setGeneratedCoverUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const highResCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleDesignChange = (key: keyof CoverDesign, value: any) => {
    setDesign((prev) => ({ ...prev, [key]: value }));
    generatePreview();
  };

  const generatePreview = () => {
    if (!previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Preview size (small)
    const width = 300;
    const height = 450;
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = design.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = design.titleColor;
    ctx.font = `bold ${design.titleFontSize * 0.4}px ${design.titleFont}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Word wrap for title
    const titleWords = design.title.split(" ");
    let titleY = height / 3;
    const lineHeight = (design.titleFontSize * 0.4) * 1.5;

    titleWords.forEach((word, index) => {
      ctx.fillText(word, width / 2, titleY + index * lineHeight);
    });

    // Author
    ctx.fillStyle = design.titleColor;
    ctx.font = `italic ${design.titleFontSize * 0.2}px ${design.titleFont}`;
    ctx.fillText(design.author, width / 2, height - 50);
  };

  const generateHighResolutionCover = async () => {
    if (!highResCanvasRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = highResCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      // High resolution: 6" x 9" at 300 DPI = 1800 x 2700 pixels
      const DPI = 300;
      const width = 6 * DPI; // 1800px
      const height = 9 * DPI; // 2700px

      canvas.width = width;
      canvas.height = height;

      // Background
      ctx.fillStyle = design.backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = design.titleColor;
      ctx.font = `bold ${design.titleFontSize * 2}px ${design.titleFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Word wrap for title
      const titleWords = design.title.split(" ");
      let titleY = height / 3;
      const lineHeight = (design.titleFontSize * 2) * 1.5;
      const maxWidth = width - 200; // margin

      titleWords.forEach((word, index) => {
        ctx.fillText(word, width / 2, titleY + index * lineHeight);
      });

      // Author
      ctx.fillStyle = design.titleColor;
      ctx.font = `italic ${design.titleFontSize}px ${design.titleFont}`;
      ctx.fillText(design.author, width / 2, height - 150);

      // Converti a PNG e scarica
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setGeneratedCoverUrl(url);

          // Auto-download
          const a = document.createElement("a");
          a.href = url;
          a.download = `cover_${design.title.replace(/\s+/g, "_")}_300dpi.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          setIsGenerating(false);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error generating cover:", error);
      setIsGenerating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-blue-500 border-opacity-30 text-center">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
              Accesso Richiesto
            </h2>
            <p className="text-slate-300 mb-6">
              Devi accedere per creare copertine
            </p>
            <Link href="/login">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Accedi Ora
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/">
          <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white mb-6">
            ← Torna alla Home
          </Button>
        </Link>
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#0066ff" }}>
          Costruttore di Copertine
        </h1>
        <p className="text-xl text-slate-300">
          Crea una copertina professionale per il tuo libro in pochi minuti
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Editor */}
        <div>
          <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#0066ff" }}>
              Personalizza la Copertina
            </h2>

            {/* Title */}
            <div className="mb-6">
              <Label className="text-slate-300 mb-2 block">Titolo del Libro</Label>
              <Input
                value={design.title}
                onChange={(e) => handleDesignChange("title", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Inserisci il titolo"
              />
            </div>

            {/* Author */}
            <div className="mb-6">
              <Label className="text-slate-300 mb-2 block">Nome Autore</Label>
              <Input
                value={design.author}
                onChange={(e) => handleDesignChange("author", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Inserisci il nome dell'autore"
              />
            </div>

            {/* Background Color */}
            <div className="mb-6">
              <Label className="text-slate-300 mb-2 block">Colore Sfondo</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={design.backgroundColor}
                  onChange={(e) => handleDesignChange("backgroundColor", e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <Input
                  value={design.backgroundColor}
                  onChange={(e) => handleDesignChange("backgroundColor", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white flex-1"
                />
              </div>
            </div>

            {/* Title Color */}
            <div className="mb-6">
              <Label className="text-slate-300 mb-2 block">Colore Testo</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={design.titleColor}
                  onChange={(e) => handleDesignChange("titleColor", e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <Input
                  value={design.titleColor}
                  onChange={(e) => handleDesignChange("titleColor", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white flex-1"
                />
              </div>
            </div>

            {/* Font */}
            <div className="mb-6">
              <Label className="text-slate-300 mb-2 block">Font</Label>
              <select
                value={design.titleFont}
                onChange={(e) => handleDesignChange("titleFont", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
              >
                <option>Georgia</option>
                <option>Times New Roman</option>
                <option>Arial</option>
                <option>Verdana</option>
                <option>Courier New</option>
              </select>
            </div>

            {/* Font Size */}
            <div className="mb-6">
              <Label className="text-slate-300 mb-2 block">Dimensione Font: {design.titleFontSize}px</Label>
              <input
                type="range"
                min="24"
                max="72"
                value={design.titleFontSize}
                onChange={(e) => handleDesignChange("titleFontSize", parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-slate-300 mb-2">📐 Specifiche KDP</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>✓ Formato: 6" x 9" (1800 x 2700 px)</li>
                <li>✓ Risoluzione: 300 DPI</li>
                <li>✓ Formato file: PNG</li>
                <li>✓ Pronto per Amazon KDP</li>
              </ul>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateHighResolutionCover}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg"
            >
              {isGenerating ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Generazione in corso...
                </>
              ) : (
                "📥 Genera e Scarica Copertina"
              )}
            </Button>
          </Card>
        </div>

        {/* Right: Preview */}
        <div>
          <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8 sticky top-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#0066ff" }}>
              Anteprima
            </h2>

            <div className="flex justify-center mb-6">
              <canvas
                ref={previewCanvasRef}
                className="border-2 border-slate-600 rounded-lg shadow-lg"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            {/* Hidden high-res canvas */}
            <canvas ref={highResCanvasRef} style={{ display: "none" }} />

            {/* Download Info */}
            <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-2">✅ Pronto per il Download</h3>
              <p className="text-sm text-slate-400">
                Clicca il pulsante "Genera e Scarica Copertina" per scaricare la tua copertina in alta risoluzione (300 DPI) pronta per Amazon KDP.
              </p>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-slate-700 bg-opacity-50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-300 mb-2">💡 Consigli</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Usa colori contrastanti per leggibilità</li>
                <li>• Titoli brevi sono più eleganti</li>
                <li>• Prova diversi font per trovare lo stile</li>
                <li>• La copertina è scaricata in PNG 300 DPI</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {/* Pricing Card */}
      <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8 mt-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
          Prezzo
        </h2>
        <p className="text-3xl font-bold text-blue-400 mb-4">€4,99</p>
        <p className="text-slate-300 mb-6">
          Copertine illimitate - crea quante ne vuoi
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2">
          Effettua il Pagamento
        </Button>
      </Card>
    </div>
  );
}

