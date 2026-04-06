"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // <--- IMPORTANTE

// Registramos ScrollTrigger (solo una vez en la app)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutMeProps {
  nombre: string;
  biografia: string;
  imageUrl: string;
}

export default function AboutMeSection({ nombre, biografia, imageUrl }: AboutMeProps) {
  const container = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    // Creamos un Timeline que se active con el scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%", // Empieza cuando el 30% superior de la sección entra en vista
        toggleActions: "play none none none", // Solo se reproduce una vez
      },
    });

    // 1. Animación del TEXTO (Entrada desde abajo con BLUR)
    tl.from(textRef.current, {
      y: 100,             // Viene desde 100px abajo
      opacity: 0,         // Empieza invisible
      filter: "blur(15px)", // <--- EL TRUCO: Empieza muy desenfocado
      duration: 1.8,      // Duración lenta y elegante
      ease: "power3.out",  // Curva de aceleración suave
    });

    // 2. Animación de la IMAGEN (Aparece un poco después)
    tl.from(imageRef.current, {
      x: 50,              // Viene sutilmente desde la derecha
      opacity: 0,
      scale: 1.1,         // Empieza un poquito más grande
      duration: 1.5,
      ease: "power2.out",
    }, "-=1.2"); // Empieza 1.2s antes de que termine la animación del texto

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="py-32 max-w-7xl mx-auto px-8 my-20 bg-[#0a0a0a] text-white"
    >
      {/* Estructura en 2 Columnas con Flexbox */}
      <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        
        {/* COLUMNA IZQUIERDA: Texto (Animado) */}
        <div ref={textRef} className="flex-1 space-y-6">
          <h1 className="text-2xl  md:text-2xl font-normal text-[#B18A12] uppercase tracking-[0.2em]">
            Sobre Mí
          </h1>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight tracking-tighter">
            Soy {nombre}
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed font-light max-w-xl">
            {biografia}
          </p>
        </div>

        {/* COLUMNA DERECHA: Imagen de la Cara (Animada) */}
        <div ref={imageRef} className="flex-1 w-full max-w-md md:max-w-none mx-auto md:mx-0">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            {/* Aspect Ratio 4:5 es ideal para retratos */}
            <Image 
              src={imageUrl} 
              alt={`Retrato de ${nombre}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}