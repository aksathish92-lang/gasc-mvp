import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useImages } from '@/hooks/useSiteData';

export default function Gallery() {
  const { images, loading } = useImages('gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );

  return (
    <div>
      {/* Page header */}
      <div className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Gallery</h2>
          <p className="text-slate-300 text-sm">Glimpses of Our Campus</p>
        </div>
      </div>

      {/* Gallery grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <p className="text-center text-slate-500 py-8">Loading gallery...</p>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-slate-200"
                >
                  <img
                    src={img.image_url}
                    alt={img.title || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {img.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm font-medium">{img.title}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">No images in the gallery yet.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={images[lightboxIndex].image_url}
            alt={images[lightboxIndex].title || 'Gallery image'}
            className="max-w-[90%] max-h-[80%] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          {images[lightboxIndex].title && (
            <p className="absolute bottom-8 left-0 right-0 text-center text-white text-sm">
              {images[lightboxIndex].title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
