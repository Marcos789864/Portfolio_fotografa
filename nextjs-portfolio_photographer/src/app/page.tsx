import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageBuilder";
import Image from "next/image";
import HeroUI from "./component/gsap";
import TypewriterSection from "./component/gsapText";
import AboutMeSection from "./component/aboutme";
import TrabajosGallery from "./component/gallery";

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

  const SINGLE_IMAGE_QUERY = `*[_type == "Imagenes" && slug.current == $slug][0]{
  _id,
  title,
  descripcion,
  categoria,
  "imageUrl": image.asset->url
}`;

const singleImage = await client.fetch(SINGLE_IMAGE_QUERY, { slug: "portada" });
const personImage = await client.fetch(SINGLE_IMAGE_QUERY, { slug: "modelo" });


  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-[2rem]">
      <div className="flex justify-around width-full height h-16rem bg-none mb-[2rem]" >
         <a href="#sobre mi"  className=" text-lg text-amber-600 hover:text-white transition-colors duration-500 ease-in-out">
          Sobre mi
        </a>
        <a href="#sobre mi" className="text-lg text-amber-600 hover:text-white transition-colors duration-500 ease-in-out">
          Estudios
        </a>
        <a href="#sobre mi" className="text-lg text-amber-600 hover:text-white transition-colors duration-500 ease-in-out">
          Trabajos
        </a>
        <a href="#sobre mi" className="text-lg text-amber-600 hover:text-white transition-colors duration-500 ease-in-out">
          Contacto
        </a>
      </div>
      
  <section className="relative w-full h-[80vh] flex items-center justify-start overflow-hidden rounded-2xl">
        <Image 
          src={urlFor(singleImage.imageUrl).width(1920).quality(90).url()} 
          alt={singleImage.title}
          fill
          priority
          className="object-cover z-0"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent z-10"></div>

        {/* COMPONENTE ANIMADO CON GSAP */}
        <HeroUI  
        />
      </section>
      <TypewriterSection 
        textoCompleto="La luz no solo ilumina, sino que también revela la esencia de cada momento capturado." 
      />
      <AboutMeSection 
        nombre="Mila Rossi" 
        biografia="Mi trabajo es una búsqueda constante de la quietud en medio del movimiento. Entiendo la fotografía no como el acto de capturar lo que está allí, sino de revelar lo que se esconde en las sombras: la arquitectura de una mirada, el peso de un silencio y la geometría natural del cuerpo humano.
Formada en las artes visuales y con base en Buenos Aires, mi enfoque editorial combina una estética minimalista con una narrativa cruda y honestidad técnica. Colaboro con marcas y editoriales que creen que la verdadera elegancia reside en la sustracción, no en el exceso." 
        imageUrl= {personImage.imageUrl}
      />
    <section id="trabajos" className="pt-20">
        <h2 className="text-center font-mono text-[#B18A12] text-sm tracking-[0.5em] uppercase mb-10">
          Portfolio Seleccionado
        </h2>
        <TrabajosGallery initialImages={imagenes} />
      </section>
    </main>
  );
}

