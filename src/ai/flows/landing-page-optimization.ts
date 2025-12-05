'use server';

/**
 * @fileOverview This file contains the Genkit flow for providing landing page optimization suggestions.
 *
 * - getLandingPageOptimizationSuggestions - A function that returns landing page optimization suggestions.
 * - LandingPageOptimizationInput - The input type for the getLandingPageOptimizationSuggestions function.
 * - LandingPageOptimizationOutput - The return type for the getLandingPageOptimizationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LandingPageOptimizationInputSchema = z.object({
  pageContent: z
    .string()
    .describe('The current HTML content of the landing page.'),
  userAnalytics: z
    .string()
    .describe('JSON formatted data representing user analytics for the landing page, including metrics like bounce rate, conversion rate, and average session duration.'),
  marketAnalysis: z
    .string()
    .describe('JSON formatted data representing market analysis, including competitor strategies and trending keywords.'),
  audienceSegment: z
    .string()
    .describe('Description of the target audience segment for the landing page.'),
});
export type LandingPageOptimizationInput = z.infer<
  typeof LandingPageOptimizationInputSchema
>;

const LandingPageOptimizationOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of specific, actionable suggestions for optimizing the landing page, including modifications to page layout, copy, and the call to action.'),
  reasoning: z
    .string()
    .describe('The AI agents reasoning for the provided suggestions, referencing the provided analytics and market analysis.'),
});
export type LandingPageOptimizationOutput = z.infer<
  typeof LandingPageOptimizationOutputSchema
>;

export async function getLandingPageOptimizationSuggestions(
  input: LandingPageOptimizationInput
): Promise<LandingPageOptimizationOutput> {
  return landingPageOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'landingPageOptimizationPrompt',
  input: {schema: LandingPageOptimizationInputSchema},
  output: {schema: LandingPageOptimizationOutputSchema},
  prompt: `You are an expert landing page optimization specialist.

  Based on the provided landing page content, user analytics, market analysis, and target audience segment, provide specific, actionable suggestions for optimizing the landing page to improve conversion rates.

  Landing Page Content:
  {{pageContent}}

  User Analytics:
  {{userAnalytics}}

  Market Analysis:
  {{marketAnalysis}}

  Target Audience Segment:
  {{audienceSegment}}

  Provide a detailed explanation of your reasoning for each suggestion, referencing the provided analytics and market analysis data to justify your recommendations.
  Consider modifications to page layout, copy, and the call to action.
  Ensure the suggestions are tailored to the described audience segment.
  `,
});

const landingPageOptimizationFlow = ai.defineFlow(
  {
    name: 'landingPageOptimizationFlow',
    inputSchema: LandingPageOptimizationInputSchema,
    outputSchema: LandingPageOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
