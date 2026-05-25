"use client"

import { useState, useCallback } from "react"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import { format } from "date-fns"
import {
  Upload,
  FileText,
  Calendar as CalendarIcon,
  Sparkles,
  X,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface AssessmentFormProps {
  onGenerate: (data: AssessmentData) => void
  isGenerating: boolean
}

export interface AssessmentData {
  title: string
  file: File | null
  dueDate: Date | undefined
  questionType: string
  numberOfQuestions: number
  totalMarks: number
  instructions: string
}

export function AssessmentForm({ onGenerate, isGenerating }: AssessmentFormProps) {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [dueDate, setDueDate] = useState<Date>()
  const [questionType, setQuestionType] = useState("")
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)
  const [totalMarks, setTotalMarks] = useState(100)
  const [instructions, setInstructions] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  })

  const removeFile = () => {
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const response = await axios.post(
      "http://localhost:5000/api/assignments/create",
      {
        title,
        dueDate,
        questionType,
        numberOfQuestions,
        marks: totalMarks,
        instructions,
      }
    )

    console.log(response.data)

    onGenerate({
      title,
      file,
      dueDate,
      questionType,
      numberOfQuestions,
      totalMarks,
      instructions,
    })

    alert(response.data.generatedQuestions)
  } catch (error) {
    console.error(error)
    alert("Error creating assignment")
  }
}

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Sparkles className="h-5 w-5 text-primary" />
          Create New Assessment
        </CardTitle>
        <CardDescription>
          Upload your content and let AI generate a comprehensive assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Assessment Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Assessment Title</Label>
            <Input
              id="title"
              placeholder="e.g., Chapter 5: Cell Biology Quiz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload Content (PDF/Text)</Label>
            {!file ? (
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                  isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                )}
              >
                <input {...getInputProps()} />
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  {isDragActive
                    ? "Drop the file here..."
                    : "Drag & drop your file here, or click to browse"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF and TXT files
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Due Date and Question Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-input border-border",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">Multiple Choice</SelectItem>
                  <SelectItem value="short">Short Answer</SelectItem>
                  <SelectItem value="long">Long Answer</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Number of Questions and Total Marks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="questions">Number of Questions</Label>
              <Input
                id="questions"
                type="number"
                min={1}
                max={100}
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks">Total Marks</Label>
              <Input
                id="marks"
                type="number"
                min={1}
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="bg-input border-border"
              />
            </div>
          </div>

          {/* Additional Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="e.g., Focus on practical applications, include diagram-based questions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="bg-input border-border min-h-[100px]"
            />
          </div>

          {/* Generate Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Assessment...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Assessment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
