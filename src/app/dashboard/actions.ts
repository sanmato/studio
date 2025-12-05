'use server';

import { getLandingPageOptimizationSuggestions } from '@/ai/flows/landing-page-optimization';
import * as z from 'zod';

const formSchema = z.object({
  pageContent: z.string(),
  userAnalytics: z.string(),
  marketAnalysis: z.string(),
  audienceSegment: z.string(),
});

export async function getOptimizations(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    pageContent: formData.get('pageContent'),
    userAnalytics: formData.get('userAnalytics'),
    marketAnalysis: formData.get('marketAnalysis'),
    audienceSegment: formData.get('audienceSegment'),
  });

  if (!validatedFields.success) {
    return {
      suggestions: '',
      reasoning: '',
      error: 'Invalid form data. Please check your inputs.',
    };
  }

  try {
    const result = await getLandingPageOptimizationSuggestions(validatedFields.data);
    return {
      suggestions: result.suggestions,
      reasoning: result.reasoning,
      error: '',
    };
  } catch (error) {
    console.error('AI flow error:', error);
    return {
      suggestions: '',
      reasoning: '',
      error: 'Failed to get optimization suggestions from the AI. Please try again later.',
    };
  }
}
