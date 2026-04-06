"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

interface TypewriterMinimalProps {
  textoCompleto: string;
}

export default function TypewriterMinimal({ textoCompleto }: TypewriterMinimalProps) {
  const container = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  // Ref para la esfera de luz
  const orbRef = useRef(null);

  useGSAP(() => {
    // --- 1. ANIMACIÓN DE LA ESFERA (Pulse Orgánico de Expansión) ---
    // Ajustes Senior para que sea natural:
    // - Duración larga (5s ida y vuelta).
    // - Animamos 'scale' (escala), no solo desenfoque.
    // - 'sine.inOut' para una curva de respiración rítmica.
    gsap.to(orbRef.current, {
      scale: 1.2,          // Se expande un 20%
      opacity: 0.12,       // Aumenta el brillo sutilmente
      duration: 3,         // Más tiempo para que el cambio sea imperceptible
      repeat: -1,          // Infinito
      yoyo: true,          // Ida y vuelta
      ease: "sine.inOut",  // Curva de respiración natural
    });

    // --- 2. TIMELINE DE ENTRADA (Texto y Cursor) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Revelado del texto: un toque más lento y elegante
    tl.to(textRef.current, {
      duration: textoCompleto.length * 0.07, 
      text: textoCompleto,
      ease: "none", // Velocidad mecánica constante (estilo máquina)
    });

    // Cursor parpadeante: más lento y sutil (como una respiración)
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.9,
      ease: "power1.inOut",
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      // py-40 y h-[90vh] aseguran espacio suficiente para que la esfera "flote"
      className="relative py-40 w-full min-h-[90vh] overflow-hidden flex items-center justify-center my-12"
    >
      
      {/* LA ESFERA DE LUZ ANIMADA (Estado Inicial) */}
      <div 
        ref={orbRef}
        // h-[50vh] y aspect-square crean un círculo perfecto.
        // bg-[#B18A12]/8: un toque de ámbar muy suave.
        // blur-[180px]: bordes extremadamente difusos para naturalidad.
        className="absolute h-[50vh] aspect-square bg-[#B18A12]/8 blur-[180px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-05"
      />

      <div className="relative z-10 text-center max-w-5xl px-8">
        {/* PEQUEÑO INDICADOR SUPERIOR (Nivel Senior) */}
        <span className="text-[10px] uppercase tracking-[0.8em] text-[#B18A12]/40 mb-12 block">
          Manifesto
        </span>

        <h3 className="text-2xl md:text-5xl font-extralight italic text-gray-100 leading-[1.8] tracking-tight">
          {/* COMILLAS DECO */}
          <span className="text-[#B18A12] not-italic serif opacity-30 text-6xl block mb-6">“</span>
          
          <span ref={textRef} className="inline"></span>
          
          {/* CURSOR DE LUZ TIPO LÍNEA */}
          <span 
            ref={cursorRef} 
            className="inline-block w-[1px] h-[1em] bg-[#B18A12]/80 ml-2 translate-y-[0.1em]"
          ></span>

          {/* COMILLAS DECO */}
          <span className="text-[#B18A12] not-italic serif opacity-30 text-6xl block mt-6">”</span>
        </h3>
      </div>
    </section>
  );
}