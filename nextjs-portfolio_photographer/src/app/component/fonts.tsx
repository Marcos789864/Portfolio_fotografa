import { Courier_Prime, JetBrains_Mono } from 'next/font/google'

// Configuramos la fuente
const courier = Courier_Prime({ 
  weight: "300", 
  subsets: ['latin'],
  variable: '--font-courier', // Creamos una variable CSS
})

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${courier.variable}`}>
      <body>{children}</body>
    </html>
  )
}