import { NextRequest, NextResponse } from 'next/server'
import groq from '@/lib/ai'

export async function POST(req: NextRequest) {
   try {
      const { prompt, systemPrompt } = await req.json()

      if (!prompt) {
         return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
      }

      const completion = await groq.chat.completions.create({
         messages: [
            {
               role: 'system',
               content: systemPrompt || 'You are a professional resume writer and career coach.',
            },
            {
               role: 'user',
               content: prompt,
            },
         ],
         model: 'llama-3.3-70b-versatile',
         temperature: 0.5,
         max_tokens: 1024,
      })

      const response = completion.choices[0]?.message?.content || ''
      return NextResponse.json({ response })
   } catch (error: any) {
      console.error('AI API Error:', error)
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
   }
}
