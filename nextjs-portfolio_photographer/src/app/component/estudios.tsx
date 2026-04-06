"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos el plugin (importante hacerlo fuera o en un useEffect)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const estudios = [
  {
    year: "2023 - 2025",
    title: "Especialización en Fotografía Editorial",
    school: "Escuela de Arte de Buenos Aires",
    description: "Enfoque en narrativa visual y manejo de luz natural para moda."
  },
  {
    year: "2022",
    title: "Workshop de Retoque High-End",
    school: "Masterclass Online",
    description: "Técnicas avanzadas de Frequency Separation y Color Grading."
  },
  {
    year: "2020",
    title: "Licenciatura en Artes Visuales",
    school: "Universidad Nacional de las Artes",
    description: "Formación integral en composición, historia del arte y estética."
  }
];

export default function EstudiosSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animamos cada fila de estudio
    gsap.from(".estudio-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Empieza cuando el top del contenedor llega al 80% del viewport
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.3, // Diferencia de tiempo entre cada item
      ease: "power3.out",
    });

    // Animación extra para la línea divisoria (efecto de crecimiento)
    gsap.from(".linea-divisoria", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.5,
      stagger: 0.3,
      ease: "power2.inOut",
    });
  }, { scope: containerRef }); // Limitamos el scope al contenedor para evitar conflictos

  return (
    <section ref={containerRef} className="py-24 max-w-4xl mx-auto px-8 overflow-hidden">
      <h1 className="text-2xl uppercase tracking-[0.4em] text-[#B18A12] mb-20 text-center opacity-80">
        Trayectoria & Formación
      </h1>

      <div className="space-y-16">
        {estudios.map((item, index) => (
          <div key={index} className="estudio-item group relative grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 md:gap-12">
            
            {/* Año con un estilo mono elegante */}
            <div className="text-gray-500 font-mono text-sm pt-1 tracking-tighter">
              [{item.year}]
            </div>

            {/* Contenido con la línea animada */}
            <div className="relative pb-4">
              <h3 className="text-2xl font-light text-white mb-2 group-hover:text-[#B18A12] transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-[#B18A12] text-xs mb-6 uppercase tracking-[0.2em] font-medium">
                {item.school}
              </p>
              <p className="text-gray-400 font-light leading-relaxed max-w-xl">
                {item.description}
              </p>
              
              {/* Línea divisoria animada */}
              <div className="linea-divisoria absolute bottom-0 left-0 w-full h-[1px] bg-white/10 mt-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}