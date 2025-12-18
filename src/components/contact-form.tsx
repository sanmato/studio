'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

import { submitContactForm } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Mensaje Enviado",
          description: state.message,
        });
        // Reset controlled components
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
      } else {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <Card id="contacto" className="w-full max-w-lg mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Contanos de tu marca</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Tu nombre completo" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="tu@empresa.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input 
              id="company" 
              name="company" 
              placeholder="Nombre de tu proyecto o marca" 
              required 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Tu Mensaje</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="¿Cuál es tu mayor desafío hoy?" 
              className="min-h-[100px]" 
              required 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
