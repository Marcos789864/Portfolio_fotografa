import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { nombre, email, mensaje } = await request.json();
    const cleanHeaders = new Headers();
cleanHeaders.append('accept', 'application/json');
cleanHeaders.append('content-type', 'application/json');
cleanHeaders.append('api-key', process.env.BREVO_API_KEY as string);
    // Usamos fetch directamente a la API V3 de Brevo
    // Esto es exactamente lo que hace el SDK por detrás, pero sin errores de formato
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: cleanHeaders,
      body: JSON.stringify({
        sender: { 
          name: nombre, 
          email: process.env.BREVO_SENDER_EMAIL // Debe estar verificado en Brevo
        },
        to: [
          { 
            email: process.env.BREVO_SENDER_EMAIL , 
            name: process.env.BREVO_SENDER_NAME  
          }
        ],
        replyTo: { email: email, name: nombre },

        subject: `Nuevo mensaje de: ${nombre}`,
        // Usamos el mismo estilo de HTML que ya conoces de tu proyecto NestJS
        htmlContent: `
          <div style="font-family: sans-serif; padding: 40px; background-color: #0a0a0a; color: #ffffff;">
            <h2 style="color: #B18A12; border-bottom: 1px solid #333; padding-bottom: 10px;">
              Nuevo mensaje de contacto
            </h2>
            <p style="margin-top: 20px;"><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid #333;">
              <p style="color: #ccc; font-style: italic; white-space: pre-line;">"${mensaje}"</p>
            </div>
            <p style="font-size: 12px; color: #555; margin-top: 30px;">
              Enviado desde el formulario de contacto del Portafolio.
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error de Brevo:", data);
      return NextResponse.json({ error: 'Error al enviar el mail' }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en la API Route:", error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}