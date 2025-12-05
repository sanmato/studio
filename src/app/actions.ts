'use server';

import * as z from 'zod';

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
  
  try {
    // Here you would typically send an email, save to a database, etc.
    // For this example, we'll just log it to the console.
    console.log('New contact form submission:');
    console.log(validatedFields.data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: '¡Formulario enviado con éxito!',
      success: true,
    };
  } catch (error) {
    return {
      message: 'Ocurrió un error al enviar el formulario.',
      success: false,
    };
  }
}
