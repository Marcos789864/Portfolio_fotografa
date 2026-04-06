"use client";

import { useState } from "react";
import { DiscAlbum,MessageCircle, Send } from "lucide-react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) setSent(true);
    setLoading(false);
  };

  return (
    <section id="contacto" className="py-32 max-w-7xl mx-auto px-8 border-t border-white/5">
      <div className="flex flex-col md:flex-row gap-20">
        
        {/* COLUMNA IZQUIERDA: Texto e Iconos */}
        <div className="flex-1 space-y-8">
          <h2 className="text-[#B18A12] font-mono text-sm tracking-[0.5em] uppercase">
            Contacto
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Contáctame
          </h3>
          <p className="text-xl text-gray-400 font-light leading-relaxed max-w-md">
            ¿Tienes un proyecto en mente o simplemente quieres saludar? Mi lente siempre está listo para nuevas historias. Hablemos de cómo podemos capturar tu visión.
          </p>

          <div className="flex gap-6 pt-4">
            {/* WhatsApp */}
            <a 
              href= {process.env.NEXT_PUBLIC_WHATSAPP_URL}
              suppressHydrationWarning
              target="_blank"
              className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all"
            >
              <div className="p-4 rounded-full border border-white/10 group-hover:border-[#B18A12] group-hover:shadow-[0_0_15px_rgba(177,138,18,0.3)] transition-all">
                <MessageCircle size={24} />
              </div>
              <span className="text-xs uppercase tracking-widest hidden md:block">WhatsApp</span>
            </a>

            {/* Instagram */}
            <a 
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
              target="_blank"
              className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all"
            >
              <div className="p-4 rounded-full border border-white/10 group-hover:border-[#B18A12] group-hover:shadow-[0_0_15px_rgba(177,138,18,0.3)] transition-all">
                <DiscAlbum size={24} />
              </div>
              <span className="text-xs uppercase tracking-widest hidden md:block">Instagram</span>
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario Aesthetic */}
        <div className="flex-1 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#B18A12]/20 rounded-full flex items-center justify-center text-[#B18A12]">
                <Send size={32} />
              </div>
              <h4 className="text-2xl font-bold">¡Mensaje enviado!</h4>
              <p className="text-gray-400">Mila se pondrá en contacto contigo muy pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#B18A12] mb-2">Nombre</label>
                <input 
                  name="nombre" 
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#B18A12] outline-none transition-all font-light"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#B18A12] mb-2">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#B18A12] outline-none transition-all font-light"
                  placeholder="hola@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#B18A12] mb-2">Mensaje</label>
                <textarea 
                  name="mensaje" 
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#B18A12] outline-none transition-all font-light resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-4 bg-[#B18A12] text-black font-bold uppercase text-xs tracking-[0.3em] rounded-full hover:bg-white transition-all duration-500 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}