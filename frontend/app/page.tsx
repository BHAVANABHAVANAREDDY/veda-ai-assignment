"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AssessmentForm } from "@/components/assessment-form"

export default function Home() {
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = (data: any) => {
    setIsGenerating(true)

    setTimeout(() => {
      setGeneratedContent(`
SECTION A - Multiple Choice Questions

1. What is the powerhouse of the cell?
2. Which organelle contains DNA?
3. What is photosynthesis?

SECTION B - Short Answer Questions

4. Explain cell membrane structure.
5. Describe mitochondria function.

SECTION C - Long Answer Questions

6. Explain photosynthesis in detail.
      `)

      setIsGenerating(false)
    }, 1000)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-6">
        {!generatedContent ? (
          <AssessmentForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        ) : (
          <div className="bg-white text-black p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Generated Question Paper</h1>

            <div className="mb-6">
              <p>Name: ________________________</p>
              <p>Roll No: ______________________</p>
              <p>Section: ______________________</p>
            </div>

            <pre className="whitespace-pre-wrap text-lg">
              {generatedContent}
            </pre>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}