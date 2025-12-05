'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';

import { getOptimizations } from './actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  pageContent: z.string().min(50, 'Page content must be at least 50 characters.'),
  userAnalytics: z.string().min(10, 'User analytics data is required.'),
  marketAnalysis: z.string().min(10, 'Market analysis data is required.'),
  audienceSegment: z.string().min(10, 'Audience segment description is required.'),
});

type FormValues = z.infer<typeof formSchema>;

const initialState = {
  suggestions: '',
  reasoning: '',
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Get Optimization Suggestions
    </Button>
  );
}

export default function DashboardPage() {
  const [state, formAction] = useFormState(getOptimizations, initialState);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageContent: '',
      userAnalytics: '{\n  "bounceRate": "75%",\n  "conversionRate": "1.2%",\n  "avgSessionDuration": "45s"\n}',
      marketAnalysis: '{\n  "competitorStrategies": ["Focus on video content", "Aggressive social media ads"],\n  "trendingKeywords": ["AI marketing", "growth hacking"]\n}',
      audienceSegment: 'Startups in the SaaS industry, looking for scalable marketing strategies.',
    },
  });

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Landing Page Optimization AI
          </CardTitle>
          <CardDescription>
            Input your landing page data to receive AI-powered optimization suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="pageContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Content (HTML)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your landing page HTML here..." className="min-h-[150px] font-mono text-xs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="userAnalytics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Analytics (JSON)</FormLabel>
                      <FormControl>
                        <Textarea placeholder='e.g., {"bounceRate": "75%"}' className="min-h-[120px] font-mono text-xs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marketAnalysis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Analysis (JSON)</FormLabel>
                      <FormControl>
                        <Textarea placeholder='e.g., {"trendingKeywords": ["AI marketing"]}' className="min-h-[120px] font-mono text-xs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="audienceSegment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience Segment</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your target audience..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton />
            </form>
          </Form>

          {(state.suggestions || state.error) && (
            <div className="mt-8 pt-8 border-t">
              {state.error ? (
                 <Card className="bg-destructive/10 border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription className="text-destructive">{state.error}</CardDescription>
                    </CardHeader>
                 </Card>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Optimization Suggestions</h3>
                    <div className="prose prose-blue max-w-none rounded-md border bg-stone-50 p-4 whitespace-pre-wrap">{state.suggestions}</div>
                  </div>
                   <div>
                    <h3 className="text-2xl font-bold mb-2">Reasoning</h3>
                    <div className="prose prose-blue max-w-none rounded-md border bg-stone-50 p-4 whitespace-pre-wrap">{state.reasoning}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
