'use server';

import * as z from 'zod';
import { Resend } from 'resend';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string(),
  message: z.string(),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Error de validación. Por favor, revise los campos.',
      success: false,
    };
  }
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!toEmail) {
    console.error('RESEND_TO_EMAIL is not configured in .env');
    return {
      message: 'Ocurrió un error de configuración en el servidor.',
      success: false,
    };
  }

  const { name, email, company, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: '.merlo Contact Form <onboarding@resend.dev>',
      to: toEmail,
      subject: `Nuevo Mensaje de Contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Nuevo Envío de Formulario de Contacto</h2>
          <p>Has recibido un nuevo mensaje a través de la web de .merlo.</p>
          <hr>
          <h3>Detalles del Contacto:</h3>
          <ul>
            <li><strong>Nombre:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Empresa:</strong> ${company}</li>
          </ul>
          <h3>Mensaje:</h3>
          <p style="background-color: #f4f4f4; border-left: 4px solid #ccc; padding: 10px;">
            ${message}
          </p>
          <hr>
          <p style="font-size: 0.8em; color: #888;">Este correo fue enviado automáticamente desde el sitio web.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        message: 'Ocurrió un error al enviar el email.',
        success: false,
      };
    }

    return {
      message: '¡Formulario enviado con éxito!',
      success: true,
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      message: 'Ocurrió un error inesperado al enviar el formulario.',
      success: false,
    };
  }
}
