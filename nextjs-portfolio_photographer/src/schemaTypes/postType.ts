import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'Imagenes',
  title: 'Imágenes del Portafolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título de la foto',
      validation: (rule) => rule.required(),
    }),
    // --- ESTO ES LO NUEVO: EL SLUG ---
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Amigable (Slug)',
      options: {
        source: 'title', // Genera el slug automáticamente usando el título
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Archivo de imagen',
      options: {
        hotspot: true, // Permite elegir el centro de atención de la foto
      },
    }),
    // --- ESTO ES LO NUEVO: LA CATEGORÍA ---
    defineField({
      name: 'categoria',
      type: 'string',
      title: 'Categoría',
      options: {
        list: [
          {title: 'Recitales', value: 'recitales'},
          {title: 'Cumpleaños', value: 'cumpleaños'},
          {title: 'Sesiones de fotos', value: 'sesiones'},
          {title: 'Fiestas', value: 'fiestas'},
        ],
        layout: 'radio', // O 'dropdown' si prefieres una lista desplegable
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descripcion',
      type: 'string',
      title: 'Descripción / Pie de foto',
      validation: (rule) => rule.required(),
    }),
  ],
})
                     