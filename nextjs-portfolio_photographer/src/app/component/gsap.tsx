"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroUI() {
  const container = useRef(null);

  useGSAP(() => {
    // Animación escalonada para que no aparezcan pegados
    gsap.from(".titulo-animado", {
      x: -30,          // Movimiento más sutil
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,    // El slogan aparece justo después del nombre
      ease: "power4.out",
      delay: 0.5
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative z-20 pl-4 md:pl-12 lg:pl-20 max-w-4xl">
      {/* NOMBRE: Tipografía Fina y Espaciada */}
      <h2 className="titulo-animado text-5xl md:text-7xl text-white font-extralight mb-4 leading-tight tracking-[0.3em] uppercase">
        Mila <span className="text-gray-400">Vetrano</span>
      </h2>

      {/* SLOGAN: Elegante, en Dorado y con tracking abierto */}
      <p className="titulo-animado text-sm md:text-base text-[#B18A12] font-light uppercase tracking-[0.5em] mt-2">
        Capturando la luz que no ves
      </p>

      {/* DETALLE VISUAL: Una línea fina que refuerza el estilo editorial */}
      <div className="titulo-animado w-12 h-[1px] bg-[#B18A12]/50 mt-8" />
    </div>
  );
}