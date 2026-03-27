'use client'

import React, { useState } from 'react'
import Button from '@/components/Button'
import { Sparkles } from 'lucide-react'

interface AIActionButtonProps {
   prompt: string
   systemPrompt?: string
   onSuccess: (response: string) => void
   label?: string
   className?: string
   size?: 'sm' | 'md' | 'lg'
}

const AIActionButton: React.FC<AIActionButtonProps> = ({
   prompt,
   systemPrompt,
   onSuccess,
   label = 'AI Generate',
   className = '',
   size = 'sm',
}) => {
   const [isLoading, setIsLoading] = useState(false)

   const handleGenerate = async () => {
      if (!prompt) return

      setIsLoading(true)
      try {
         const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               prompt,
               systemPrompt,
            }),
         })

         const data = await response.json()
         if (data.response) {
            onSuccess(data.response)
         } else if (data.error) {
            console.error('AI Error:', data.error)
         }
      } catch (error) {
         console.error('AI Fetch Error:', error)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <Button
         label={label}
         icon={<Sparkles size={16} className="mr-2" />}
         iconType="lucide"
         onClick={handleGenerate}
         isLoading={isLoading}
         size={size}
         theme="primary"
         variant="solid"
         className={className}
      />
   )
}

export default AIActionButton
