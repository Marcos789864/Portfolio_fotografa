"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/imageBuilder";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Trabajo {
  _id: string;
  title: string;
  imageUrl: string;
  categoria: string;
}

export default function TrabajosGallery({ initialImages }: { initialImages: Trabajo[] }) {
  const [filter, setFilter] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef(null);

  // Categorías únicas extraídas de los datos
  const categorias = ["Todos", ...new Set(initialImages.map((img) => img.categoria))];

  // Filtrado de imágenes
  const filteredImages = initialImages
    .filter((img) => filter === "Todos" || img.categoria === filter)
    .slice(0, visibleCount);

  // Animación cuando cambian las imágenes visibles
  useGSAP(() => {
    gsap.from(".card-trabajo", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [filter, visibleCount]); // Se dispara al filtrar o cargar más

  return (
    <section ref={containerRef} className="py-20 max-w-7xl mx-auto px-8">
      
      {/* 1. FILTROS AESTHETIC */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setVisibleCount(4); }}
            className={`text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
              filter === cat ? "text-[#B18A12] border-b border-[#B18A12] pb-1" : "text-gray-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. GRID EDITORIAL (Irregular) */}

      
      <div className="columns-1 md:columns-2 gap-8 lg:gap-12 space-y-8 lg:space-y-12">
  {filteredImages.map((img) => (
    <div 
      key={img._id} 
      className="card-trabajo relative overflow-hidden rounded-xl group break-inside-avoid"
    >
      <Image
        src={urlFor(img.imageUrl).width(1200).url()}
        alt={img.title}
        width={1200}
        height={1600} // Next.js lo usará para calcular la proporción inicial
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-[#B18A12] font-mono text-sm uppercase tracking-widest">{img.title}</p>
            </div>
    </div>
  ))}
</div>

      {/* 3. BOTÓN "VER MÁS" */}
      {visibleCount < initialImages.length && (
        <div className="flex justify-center mt-20">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-10 py-4 border border-white/20 hover:border-[#B18A12] hover:text-[#B18A12] transition-all duration-500 rounded-full uppercase text-xs tracking-[0.3em]"
          >
            Explorar más trabajos
          </button>
        </div>
      )}
    </section>
  );
}
