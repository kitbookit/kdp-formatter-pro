import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function KDPFormatter() {
  const { user, isAuthenticated } = useAuth();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatMutation = trpc.formatter.formatDocument.useMutation({
    onSuccess: (data) => {
      setDownloadUrl(data.downloadUrl);
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
      // Valida il tipo di file
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
      if (!validTypes.includes(file.type)) {
        setError("Formato non supportato. Usa PDF, DOCX o TXT");
        return;
      }

      // Valida la dimensione (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError("File troppo grande. Massimo 50MB");
        return;
      }

      setUploadedFile(file);
      setError(null);
      setDownloadUrl(null);
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
      // Leggi il file come buffer
      const fileBuffer = await uploadedFile.arrayBuffer();
      const uint8Array = new Uint8Array(fileBuffer);

      formatMutation.mutate({
        fileName: uploadedFile.name,
        fileBuffer: Array.from(uint8Array),
        fileType: uploadedFile.type,
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
      a.download = `formatted_${uploadedFile?.name || "document"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/">
          <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white mb-6">
            ← Torna alla Home
          </Button>
        </Link>
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#0066ff" }}>
          Formattazione KDP
        </h1>
        <p className="text-xl text-slate-300">
          Carica il tuo documento e ricevi un PDF perfettamente formattato per Amazon KDP
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8">
          {/* Upload Area */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#0066ff" }}>
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
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Format Button */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#0066ff" }}>
              2️⃣ Applica Formattazione KDP
            </h2>

            <div className="bg-slate-700 bg-opacity-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-slate-300 mb-3">Specifiche KDP Applicate:</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>✓ Formato pagina: 6" x 9" (standard Amazon KDP)</li>
                <li>✓ Margini: 1 pollice su tutti i lati</li>
                <li>✓ Risoluzione immagini: 300 DPI</li>
                <li>✓ Font: Leggibile e professionale</li>
                <li>✓ Spaziatura: Ottimizzata per la stampa</li>
              </ul>
            </div>

            <Button
              onClick={handleFormat}
              disabled={!uploadedFile || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg"
            >
              {isProcessing ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Formattazione in corso...
                </>
              ) : (
                "Formatta il Documento"
              )}
            </Button>
          </div>

          {/* Download Section */}
          {downloadUrl && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#0066ff" }}>
                3️⃣ Scarica il PDF Formattato
              </h2>

              <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">✅</span>
                  <div>
                    <p className="font-semibold text-green-400">Formattazione Completata!</p>
                    <p className="text-sm text-slate-300">Il tuo PDF è pronto per Amazon KDP</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg"
              >
                📥 Scarica PDF Formattato
              </Button>

              <p className="text-sm text-slate-400 mt-4 text-center">
                Il file è pronto per essere caricato su Amazon KDP senza ulteriori modifiche
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-6">
            <h3 className="font-semibold text-slate-300 mb-3">💡 Come Funziona</h3>
            <ol className="text-sm text-slate-400 space-y-2">
              <li>1. Carica il tuo documento (con testo e immagini già dentro)</li>
              <li>2. Clicca "Formatta il Documento"</li>
              <li>3. Scarica il PDF pronto per Amazon KDP</li>
              <li>4. Carica il PDF su Amazon KDP - nessuna modifica necessaria!</li>
            </ol>
          </div>
        </Card>

        {/* Pricing Card */}
        <Card className="bg-slate-800 border-blue-500 border-opacity-30 p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0066ff" }}>
            Prezzo
          </h2>
          <p className="text-3xl font-bold text-blue-400 mb-4">€2,99</p>
          <p className="text-slate-300 mb-6">
            Formattazione illimitata per questo documento
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2">
            Effettua il Pagamento
          </Button>
        </Card>
      </div>
    </div>
  );
}

