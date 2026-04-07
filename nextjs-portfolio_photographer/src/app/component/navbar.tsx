
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. INTRO: Refinamos para que el estado final sea PERMANENTE
    gsap.fromTo(".nav-link", 
      { 
        y: -100, 
        opacity: 0 
      }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out",
        delay: 0.2,
        // IMPORTANTE: No limpiamos la opacidad aquí, 
        // solo el transform para que no moleste al hover
        onComplete: () => {
          gsap.set(".nav-link", { clearProps: "y" });
        }
      }
    );
  }, { scope: containerRef });

  const onMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector(".nav-line");
    const tl = gsap.timeline({ overwrite: true });

    tl.to(e.currentTarget, {
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    })
    .to(line, {
      scaleX: 1,
      duration: 0.4,
      ease: "power2.inOut"
    }, 0);
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector(".nav-line");
    const tl = gsap.timeline({ overwrite: true });

    tl.to(e.currentTarget, {
      color: "#B18A12",
      duration: 0.3,
      ease: "power2.inOut"
    })
    .to(line, {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.inOut"
    }, 0);
  };

  const links = [
    { name: "Sobre mi", href: "#sobre-mi" },
    { name: "Estudios", href: "#estudios" },
    { name: "Trabajos", href: "#trabajos" },
    { name: "Contacto", href: "#contacto" }
  ];

  return (
  <nav 
    ref={containerRef} 
    className="fixed top-0 left-0 w-full h-20 md:h-24 z-[100] flex justify-center items-center px-4"
  >
    {/* gap-6 para móvil, gap-16/20 para desktop */}
    <div className="flex gap-4 sm:gap-8 md:gap-16 lg:gap-20 items-center px-6 md:px-10 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/5 w-full max-w-fit overflow-x-auto no-scrollbar">
      {links.map((link) => (
        <a 
          key={link.name}
          href={link.href}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onLeave}
          // Bajamos el tracking y el text size en móvil para que entre todo
          className="nav-link relative opacity-0 text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-light text-[#B18A12] py-2 whitespace-nowrap"
        >
          {link.name}
          <span 
            className="nav-line absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-left" 
          />
        </a>
      ))}
    </div>
  </nav>
);
}