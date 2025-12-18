'use server';

import * as z from 'zod';
import { Resend } from 'resend';

const formSchema = z.object({
  name: z.string().min(2, "El nombre es requerido."),
  email: z.string().email("El email no es válido."),
  company: z.string().min(2, "La empresa es requerida."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

// Helper to validate email format
const emailSchema = z.string().email();

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.issues.map(issue => issue.message).join(' ');
    console.error('Validation Error:', errorMessages);
    return {
      message: `Error de validación: ${errorMessages}`,
      success: false,
    };
  }
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const toEmailsRaw = process.env.RESEND_TO_EMAIL || '';
  const toEmails = toEmailsRaw
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(email => email);

  if (toEmails.length === 0) {
    console.error('RESEND_TO_EMAIL is not configured in .env or is empty.');
    return {
      message: 'Ocurrió un error de configuración en el servidor.',
      success: false,
    };
  }

  // Stricter validation for each email
  const invalidEmails = toEmails.filter(email => !emailSchema.safeParse(email).success);
  if (invalidEmails.length > 0) {
    console.error('Invalid email address format in RESEND_TO_EMAIL:', invalidEmails);
    return {
      message: `El servidor encontró una dirección de correo no válida: ${invalidEmails.join(', ')}`,
      success: false,
    };
  }


  const { name, email, company, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: '.merlo Contact Form <onboarding@resend.dev>',
      to: toEmails,
      subject: `Nuevo Mensaje de Contacto de ${name}`,
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; background-color: #f0f4f8; padding: 40px; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div style="background-color: #1C3F5E; color: #ffffff; padding: 20px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-family: 'Poppins', sans-serif;">.merlo</h1>
              <h2 style="margin: 5px 0 0; font-size: 18px; font-weight: 300;">Nuevo Contacto desde la Web</h2>
            </div>
            <div style="padding: 30px;">
              <h3 style="color: #1C3F5E; font-family: 'Poppins', sans-serif; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 20px;">Detalles del Contacto</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 15px;"><strong>Nombre:</strong> ${name}</li>
                <li style="margin-bottom: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></li>
                <li style="margin-bottom: 15px;"><strong>Empresa:</strong> ${company}</li>
              </ul>
              <h3 style="color: #1C3F5E; font-family: 'Poppins', sans-serif; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; margin-top: 30px; margin-bottom: 20px;">Mensaje</h3>
              <div style="background-color: #f9f9f9; border-left: 4px solid #007bff; padding: 15px; border-radius: 4px;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="background-color: #f0f4f8; text-align: center; padding: 20px; font-size: 12px; color: #888;">
              <p style="margin: 0;">Este correo fue enviado automáticamente desde el sitio web de .merlo.</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      // Enhanced error logging
      console.error('Resend API error:', JSON.stringify(error, null, 2));
      return {
        message: 'Ocurrió un error al enviar el email.',
        success: false,
      };
    }

    return {
      message: '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.',
      success: true,
    };
  } catch (error) {
    // Enhanced error logging
    console.error('Error submitting form:', JSON.stringify(error, null, 2));
    return {
      message: 'Ocurrió un error inesperado al enviar el formulario.',
      success: false,
    };
  }
}
