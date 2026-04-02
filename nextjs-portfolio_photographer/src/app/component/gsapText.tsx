"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin"; // <--- NO OLVIDAR

// Registramos el plugin (requerido una vez por aplicación)
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

interface TypewriterMinimalProps {
  textoCompleto: string; // El texto largo que quieres mostrar
}

export default function TypewriterMinimal({ textoCompleto }: TypewriterMinimalProps) {
  const container = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // Empieza cuando la sección está cerca de verse
        toggleActions: "play none none none", // Solo se reproduce una vez
      },
    });

    // 1. Animación del texto largo
    tl.to(textRef.current, {
      duration: textoCompleto.length * 0.04, // Duración dinámica basada en la longitud
      text: textoCompleto,
      ease: "none", // Velocidad mecánica constante
    });

    // 2. Animación del cursor parpadeante (paralela)
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1, // Infinito
      yoyo: true, // Va y viene
      duration: 0.6,
      ease: "power2.inOut",
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="py-24 w-full mx-auto px-8 my-16 bg-[#0c0c0c] rounded-3xl border border-white/5 shadow-2xl "
    >
      <div className="w-full">
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-[family-name:var(--font-courier)] font-normal  text-amber-600 leading-[1.3] ttracking-[0.15em]:">

          <span ref={textRef}></span>
          
          <span 
            ref={cursorRef} 
            className="inline-block w-[0.6em] h-[1em] bg-amber-600 ml-1 translate-y-[0.15em]"
          ></span>
        </h3>
      </div>
    </section>
  );
}