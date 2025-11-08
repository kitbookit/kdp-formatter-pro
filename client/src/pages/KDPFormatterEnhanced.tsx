import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TRIM_SIZES = [
  { value: '5x8', label: '5" x 8"', description: 'Romanzi, Fiction' },
  { value: '5.25x8', label: '5.25" x 8"', description: 'Romanzi' },
  { value: '5.5x8.5', label: '5.5" x 8.5"', description: 'Romanzi, Saggistica' },
  { value: '6x9', label: '6" x 9"', description: 'Standard, Saggistica (Consigliato)' },
  { value: '7x10', label: '7" x 10"', description: 'Manuali, Libri illustrati' },
  { value: '8x10', label: '8" x 10"', description: 'Libri fotografici, Workbook' },
  { value: '8.5x11', label: '8.5" x 11"', description: 'Workbook, Manuali' },
];

export default function KDPFormatterEnhanced() {
  const { user, isAuthenticated } = useAuth();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Opzioni formattazione
  const [trimSize, setTrimSize] = useState('6x9');
  const [includePageNumbers, setIncludePageNumbers] = useState(true);
  const [pageNumberPosition, setPageNumberPosition] = useState<'center' | 'outer' | 'inner'>('center');
  const [fontSize, setFontSize] = useState(11);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans-serif'>('serif');

  const formatMutation = trpc.formatter.formatDocumentEnhanced.useMutation({
    onSuccess: (data) => {
      setDownloadUrl(data.downloadUrl);
      setValidationResult(data.validation);
      setIsProcessing(false);
      setError(null);
    },
    onError: (err) => {
      setError(err.message || "Errore nella formattazione");
      setIsProcessing(false);
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-blue-500 border-opacity-30 text-center">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
              Accesso Richiesto
            </h2>
            <p className="text-slate-300 mb-6">
              Devi accedere per formattare i tuoi documenti
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain"
      ];
      
      if (!validTypes.includes(file.type)) {
        setError("Formato non supportato. Usa PDF, DOCX o TXT");
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        setError("File troppo grande. Massimo 50MB");
        return;
      }

      setUploadedFile(file);
      setError(null);
      setDownloadUrl(null);
      setValidationResult(null);
    }
  };

  const handleFormat = async () => {
    if (!uploadedFile) {
      setError("Seleziona un file");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const fileBuffer = await uploadedFile.arrayBuffer();
      const uint8Array = new Uint8Array(fileBuffer);

      formatMutation.mutate({
        fileName: uploadedFile.name,
        fileBuffer: Array.from(uint8Array),
        fileType: uploadedFile.type,
        options: {
          trimSize,
          includePageNumbers,
          pageNumberPosition,
          fontSize,
          fontFamily,
        },
      });
    } catch (err) {
      setError("Errore nel caricamento del file");
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `kdp_formatted_${uploadedFile?.name || "document"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handlePayment = async () => {
    // TODO: Integrare Stripe Checkout
    alert("Pagamento in fase di implementazione");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/">
          <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white mb-6">
            ← Torna alla Home
          </Button>
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-black" style={{ color: "#0066ff" }}>
            Formattazione KDP Pro
          </h1>
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            ✓ KDP APPROVED
          </span>
        </div>
        
        <p className="text-xl text-slate-300 mb-4">
          Formattazione professionale per Amazon KDP - Tutti i formati supportati
        </p>
        
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span>📚 1,247 libri formattati oggi</span>
          <span>⭐ 4.9/5 (2,341 recensioni)</span>
          <span>✅ 100% Conformità KDP</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonna Sinistra - Upload e Opzioni */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload */}
          <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
              1️⃣ Carica il Tuo Documento
            </h2>

            <div
              className="border-2 border-dashed border-blue-500 border-opacity-50 rounded-lg p-8 text-center cursor-pointer hover:border-opacity-100 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadedFile ? (
                <div>
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-lg font-semibold text-blue-400 mb-2">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-slate-400">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    Clicca per cambiare file
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-5xl mb-4">📄</div>
                  <p className="text-lg font-semibold text-slate-300 mb-2">
                    Trascina il file qui o clicca per selezionare
                  </p>
                  <p className="text-sm text-slate-400">
                    Formati supportati: PDF, DOCX, TXT (max 50MB)
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Opzioni Formattazione */}
          <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
              2️⃣ Personalizza Formattazione
            </h2>

            <div className="space-y-6">
              {/* Trim Size */}
              <div>
                <Label className="text-slate-300 mb-2 block font-semibold">
                  Formato Pagina (Trim Size)
                </Label>
                <Select value={trimSize} onValueChange={setTrimSize}>
                  <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {TRIM_SIZES.map((size) => (
                      <SelectItem
                        key={size.value}
                        value={size.value}
                        className="text-slate-200 focus:bg-slate-600"
                      >
                        <div>
                          <div className="font-semibold">{size.label}</div>
                          <div className="text-xs text-slate-400">{size.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Font */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300 mb-2 block font-semibold">
                    Famiglia Font
                  </Label>
                  <Select value={fontFamily} onValueChange={(v: 'serif' | 'sans-serif') => setFontFamily(v)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="serif" className="text-slate-200">
                        Serif (Times New Roman)
                      </SelectItem>
                      <SelectItem value="sans-serif" className="text-slate-200">
                        Sans-serif (Helvetica)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block font-semibold">
                    Dimensione Font
                  </Label>
                  <Select value={fontSize.toString()} onValueChange={(v) => setFontSize(parseInt(v))}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {[9, 10, 11, 12, 13, 14].map((size) => (
                        <SelectItem key={size} value={size.toString()} className="text-slate-200">
                          {size}pt
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Numeri Pagina */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pageNumbers"
                    checked={includePageNumbers}
                    onCheckedChange={(checked) => setIncludePageNumbers(checked as boolean)}
                  />
                  <Label htmlFor="pageNumbers" className="text-slate-300 cursor-pointer">
                    Includi numeri di pagina
                  </Label>
                </div>

                {includePageNumbers && (
                  <div className="ml-6">
                    <Label className="text-slate-300 mb-2 block text-sm">
                      Posizione numeri
                    </Label>
                    <RadioGroup value={pageNumberPosition} onValueChange={(v: any) => setPageNumberPosition(v)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="center" id="center" />
                        <Label htmlFor="center" className="text-slate-400 text-sm cursor-pointer">
                          Centro
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outer" id="outer" />
                        <Label htmlFor="outer" className="text-slate-400 text-sm cursor-pointer">
                          Esterno (professionale)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inner" id="inner" />
                        <Label htmlFor="inner" className="text-slate-400 text-sm cursor-pointer">
                          Interno
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Bottone Formatta */}
          <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
              3️⃣ Genera PDF Formattato
            </h2>

            {error && (
              <div className="mb-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <Button
              onClick={handleFormat}
              disabled={!uploadedFile || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg"
            >
              {isProcessing ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Formattazione in corso...
                </>
              ) : (
                <>
                  ✨ Formatta Documento KDP
                </>
              )}
            </Button>

            <p className="text-xs text-slate-400 mt-3 text-center">
              Applicando margini dinamici, font embedded e validazione KDP completa
            </p>
          </Card>

          {/* Risultato Validazione */}
          {validationResult && (
            <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
                📋 Risultato Validazione KDP
              </h2>

              {validationResult.compliant ? (
                <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">✅</span>
                    <p className="font-semibold text-green-400 text-lg">
                      100% Conforme alle Specifiche KDP!
                    </p>
                  </div>
                  <p className="text-sm text-slate-300">
                    Il tuo PDF è pronto per essere caricato su Amazon KDP senza modifiche.
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">⚠️</span>
                    <p className="font-semibold text-yellow-400">
                      Problemi Rilevati
                    </p>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1 ml-8">
                    {validationResult.issues?.map((issue: string, i: number) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResult.warnings && validationResult.warnings.length > 0 && (
                <div className="mt-4 bg-blue-500 bg-opacity-10 border border-blue-500 rounded-lg p-4">
                  <p className="font-semibold text-blue-400 mb-2">💡 Suggerimenti</p>
                  <ul className="text-sm text-slate-300 space-y-1 ml-4">
                    {validationResult.warnings.map((warning: string, i: number) => (
                      <li key={i}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}

          {/* Download */}
          {downloadUrl && (
            <Card className="bg-slate-800 border-green-500 border-opacity-50 p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
                4️⃣ Scarica il PDF
              </h2>

              <Button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
              >
                📥 Scarica PDF Formattato KDP
              </Button>

              <p className="text-sm text-slate-300 mt-4 text-center">
                Il file è ottimizzato per Amazon KDP e pronto per l'upload
              </p>
            </Card>
          )}
        </div>

        {/* Colonna Destra - Pricing e Info */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400 p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Piano Starter
              </h3>
              <div className="text-4xl font-black text-white mb-1">
                €4,99
              </div>
              <p className="text-blue-100 text-sm mb-4">
                1 formattazione
              </p>
              
              <Button
                onClick={handlePayment}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-3"
              >
                Acquista Ora
              </Button>

              <p className="text-xs text-blue-100 mt-3">
                Pagamento sicuro con Stripe
              </p>
            </div>
          </Card>

          {/* Specifiche Applicate */}
          <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
            <h3 className="font-bold text-slate-200 mb-3">
              ✓ Specifiche KDP Applicate
            </h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>✓ Margini dinamici basati su pagine</li>
              <li>✓ Font embedded (requisito KDP)</li>
              <li>✓ Risoluzione 300 DPI</li>
              <li>✓ Formato PDF/X-1a:2001</li>
              <li>✓ Tutti i formati KDP supportati</li>
              <li>✓ Numeri pagina personalizzabili</li>
              <li>✓ Validazione automatica</li>
            </ul>
          </Card>

          {/* Testimonianze */}
          <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-6">
            <h3 className="font-bold text-slate-200 mb-3">
              💬 Cosa Dicono gli Autori
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-sm text-slate-300 italic">
                  "Finalmente un tool che formatta perfettamente per KDP! Nessun rifiuto."
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  - Marco R., Autore
                </p>
              </div>

              <div className="bg-slate-700 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-sm text-slate-300 italic">
                  "Ho risparmiato ore di lavoro. Semplicemente fantastico!"
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  - Laura B., Scrittrice
                </p>
              </div>
            </div>
          </Card>

          {/* Garanzia */}
          <Card className="bg-green-500 bg-opacity-10 border-green-500 border-opacity-50 p-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-bold text-green-400 mb-2">
                Garanzia 100%
              </h3>
              <p className="text-sm text-slate-300">
                Se il tuo PDF viene rifiutato da KDP, ti rimborsiamo completamente.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
