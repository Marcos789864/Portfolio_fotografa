"use client"; // <--- Esta es la "llave" que permite usar useRef y GSAP

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


export default function HeroUI() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".titulo-animado", {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.5
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative z-20 pl-4 md:pl-12 lg:pl-20 max-w-2xl">
      <h2 className="titulo-animado text-5xl md:text-8xl font-black mb-4 leading-[0.9] tracking-tighter">
        Nombre
      </h2>
      <p className=" titulo-animado text-lg md:text-xl text-gray-300 mb-8 max-w-md">
        Slogan
      </p>
    </div>
  );
}