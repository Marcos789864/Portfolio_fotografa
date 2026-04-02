



import { client } from "@/sanity/client";
import Image from "next/image"; // Componente optimizado de Next.js
const ALL_IMAGES_QUERY = `*[_type == "Imagenes"] | order(_createdAt desc) {
  _id,
  title,
  descripcion,
  categoria,
  "slug": slug.current,
  "imageUrl": image.asset->url
}`;
export default async function PortfolioPage() {
  // 1. Obtenemos los datos de Sanity
  const imagenes = await client.fetch(ALL_IMAGES_QUERY);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Encabezado Estilo "Hero" */}
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Portafolio</h1>
        <p className="text-gray-400">Capturando historias a través del lente.</p>
      </header>

      {/* Grid de Imágenes */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imagenes.map((img: any) => (
          <div 
            key={img._id} 
            className="group relative overflow-hidden rounded-lg bg-[#1a1a1a] transition-all hover:scale-[1.02]"
          >
            {/* Imagen optimizada */}
            <div className="aspect-[4/5] relative">
              <Image
                src={img.imageUrl}
                alt={img.title}
                fill
                className="object-cover transition-opacity group-hover:opacity-80"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Información al hacer Hover (Toque Senior) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs uppercase tracking-widest text-[#55f055] font-bold">
                {img.categoria}
              </span>
              <h2 className="text-xl font-semibold">{img.title}</h2>
              <p className="text-sm text-gray-300 line-clamp-2">{img.descripcion}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}