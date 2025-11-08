import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: "formatting" | "cover" | "seo" | "publishing";
}

const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "Come Formattare il Tuo Libro per Amazon KDP",
    description: "Guida completa su come usare il nostro formattatore per creare un PDF perfetto per Amazon KDP.",
    duration: "12:45",
    thumbnail: "📄",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "formatting",
  },
  {
    id: "2",
    title: "Creare una Copertina Professionale",
    description: "Impara a creare una copertina elegante e attraente con il nostro costruttore di copertine.",
    duration: "8:30",
    thumbnail: "🎨",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "cover",
  },
  {
    id: "3",
    title: "Ottimizzare il Tuo Libro per il SEO",
    description: "Scopri come ottimizzare il tuo libro per i motori di ricerca e aumentare la visibilità.",
    duration: "10:15",
    thumbnail: "📊",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "seo",
  },
  {
    id: "4",
    title: "Pubblicare il Tuo Libro su Amazon KDP",
    description: "Guida passo dopo passo per pubblicare il tuo libro formattato su Amazon KDP.",
    duration: "15:20",
    thumbnail: "🚀",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "publishing",
  },
  {
    id: "5",
    title: "Errori Comuni da Evitare",
    description: "Scopri gli errori più comuni che commettono gli autori e come evitarli.",
    duration: "9:45",
    thumbnail: "⚠️",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "formatting",
  },
  {
    id: "6",
    title: "Strategie di Marketing per Autori",
    description: "Impara le migliori strategie di marketing per promuovere il tuo libro.",
    duration: "14:00",
    thumbnail: "📢",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "publishing",
  },
];

export default function VideoTutorials() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | Tutorial["category"]>("all");
  const [selectedVideo, setSelectedVideo] = useState<Tutorial | null>(null);

  const filteredTutorials = selectedCategory === "all" 
    ? tutorials 
    : tutorials.filter(t => t.category === selectedCategory);

  const categoryLabels = {
    formatting: "Formattazione",
    cover: "Copertine",
    seo: "SEO",
    publishing: "Pubblicazione",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          <span style={{ color: "#0066ff" }}>Video Tutorial</span>
          <span style={{ color: "#0066ff", fontSize: "0.4em", opacity: 0.3, marginLeft: "4px" }}>✡</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Impara come usare KDP Formatter Pro con i nostri video tutorial gratuiti e dettagliati
        </p>
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-lg max-w-4xl w-full">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 border-t border-slate-700">
              <p className="text-slate-300 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-blue-400 font-semibold">Durata: {selectedVideo.duration}</span>
                <span className="text-slate-400">
                  Categoria: {categoryLabels[selectedVideo.category]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Tutti
          </button>
          <button
            onClick={() => setSelectedCategory("formatting")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === "formatting"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Formattazione
          </button>
          <button
            onClick={() => setSelectedCategory("cover")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === "cover"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Copertine
          </button>
          <button
            onClick={() => setSelectedCategory("seo")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === "seo"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            SEO
          </button>
          <button
            onClick={() => setSelectedCategory("publishing")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === "publishing"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Pubblicazione
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial) => (
            <Card
              key={tutorial.id}
              style={{ backgroundColor: "rgba(30, 41, 59, 0.5)", borderColor: "rgba(59, 130, 246, 0.2)" }}
              className="border overflow-hidden hover:border-blue-500 transition-all cursor-pointer group"
              onClick={() => setSelectedVideo(tutorial)}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-all">
                <span className="text-6xl">{tutorial.thumbnail}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {tutorial.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 text-sm font-semibold">
                    ⏱️ {tutorial.duration}
                  </span>
                  <span className="text-slate-500 text-xs bg-slate-700 px-3 py-1 rounded">
                    {categoryLabels[tutorial.category]}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Card style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.3)" }} className="border p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Pronto a Iniziare?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Guarda i nostri tutorial e inizia a formattare il tuo libro oggi stesso
          </p>
          <a href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
              Torna alla Home
            </Button>
          </a>
        </Card>
      </section>
    </div>
  );
}

