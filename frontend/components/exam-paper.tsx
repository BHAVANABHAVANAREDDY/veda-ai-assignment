"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2 } from "lucide-react"

interface Question {
  id: number
  text: string
  marks: number
  difficulty: "easy" | "medium" | "hard"
}

interface ExamSection {
  name: string
  instructions: string
  questions: Question[]
}

interface ExamPaperProps {
  title: string
  subject: string
  duration: string
  totalMarks: number
  sections: ExamSection[]
}

const difficultyColors = {
  easy: "bg-success/20 text-success border-success/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  hard: "bg-destructive/20 text-destructive border-destructive/30",
}

export function ExamPaper({ title, subject, duration, totalMarks, sections }: ExamPaperProps) {
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="border-border">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" className="border-border">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" className="border-border">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Exam Paper */}
      <Card className="border-border bg-card">
        <CardHeader className="text-center border-b border-border pb-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {subject}
            </p>
            <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
          </div>
          <div className="flex justify-center gap-8 mt-4 text-sm text-muted-foreground">
            <span>Duration: {duration}</span>
            <span>Total Marks: {totalMarks}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Student Info Section */}
          <div className="mb-8 p-4 rounded-lg bg-accent/30 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-muted-foreground text-xs">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="bg-card border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber" className="text-muted-foreground text-xs">
                  Roll Number
                </Label>
                <Input
                  id="rollNumber"
                  placeholder="Enter roll number"
                  className="bg-card border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section" className="text-muted-foreground text-xs">
                  Section
                </Label>
                <Input
                  id="section"
                  placeholder="Enter section"
                  className="bg-card border-border"
                />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Exam Sections */}
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-foreground">
                    {section.name}
                  </h2>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {section.questions.reduce((acc, q) => acc + q.marks, 0)} marks
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {section.instructions}
                </p>
                <div className="space-y-4">
                  {section.questions.map((question, questionIndex) => (
                    <div
                      key={question.id}
                      className="p-4 rounded-lg bg-accent/20 border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                              {questionIndex + 1}
                            </span>
                            <Badge
                              variant="outline"
                              className={difficultyColors[question.difficulty]}
                            >
                              {question.difficulty}
                            </Badge>
                          </div>
                          <p className="text-foreground leading-relaxed pl-10">
                            {question.text}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-medium text-primary">
                            [{question.marks} marks]
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
