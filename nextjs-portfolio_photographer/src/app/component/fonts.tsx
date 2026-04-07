import { Courier_Prime, JetBrains_Mono } from 'next/font/google'

// Configuramos la fuente
const courier = Courier_Prime({ 
  weight: "400", 
  subsets: ['latin'],
  variable: '--font-courier', // Creamos una variable CSS
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${courier.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}