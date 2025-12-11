'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

import { submitContactForm } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, ingrese un email válido.' }),
  company: z.string().min(2, { message: 'El nombre de la empresa es requerido.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});

type FormValues = z.infer<typeof formSchema>;

const initialState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full text-lg font-bold bg-gradient-to-br from-primary to-[hsl(215,80%,45%)] hover:from-primary/90 hover:to-[hsl(215,80%,40%)] transition-all transform hover:scale-105"
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Enviar y agendar diagnóstico
    </Button>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitContactForm, initialState);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Mensaje Enviado",
        description: "Gracias por contactarnos. Nos pondremos en contacto con usted en breve.",
      });
      form.reset();
    } else if (state.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, form, toast]);

  return (
    <Card id="contacto" className="w-full max-w-lg mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Contanos de tu marca</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu proyecto o marca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu Mensaje</FormLabel>
                  <FormControl>
                    <Textarea placeholder="¿Cuál es tu mayor desafío hoy?" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
