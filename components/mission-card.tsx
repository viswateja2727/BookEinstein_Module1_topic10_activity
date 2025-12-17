"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Sparkles, Brain, CheckCircle2, AlertCircle } from "lucide-react"

type Mission = {
  id: number
  title: string
  category: string
  description: string
  scenario: string
  aiApplication: string
  completed: boolean
}

type Props = {
  mission: Mission
  onComplete: (missionId: number) => void
  onBack: () => void
}

const quizQuestions = [
  {
    id: 1,
    question: "What is the main benefit of using AI in this scenario?",
    options: [
      "Speed and efficiency in processing large amounts of data",
      "Completely replacing human expertise",
      "Making decisions without any human oversight",
      "Reducing costs at any expense",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "What ethical consideration is most important when using AI in this field?",
    options: [
      "Maximizing profit",
      "Ensuring fairness, transparency, and accountability",
      "Keeping the technology secret",
      "Using AI for all decisions without human input",
    ],
    correct: 1,
  },
]

export default function MissionCard({ mission, onComplete, onBack }: Props) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [reflection, setReflection] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleQuizSubmit = () => {
    setShowResults(true)
  }

  const handleMissionComplete = () => {
    if (reflection.trim().length > 20) {
      onComplete(mission.id)
    }
  }

  const correctAnswers = Object.entries(answers).filter(
    ([qId, ansIdx]) => quizQuestions[Number.parseInt(qId) - 1].correct === ansIdx,
  ).length

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Missions
      </Button>

      <Card className="border-2 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-sm">
              {mission.category}
            </Badge>
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full ${
                    s === step ? "bg-accent w-8" : s < step ? "bg-accent/50" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle className="text-3xl text-balance">{mission.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{mission.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Present */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Sparkles className="w-5 h-5" />
                <span>Step 1: Present - The Real-World Scenario</span>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <h3 className="font-semibold text-lg mb-3">The Scenario</h3>
                <p className="text-foreground leading-relaxed mb-4">{mission.scenario}</p>

                <div className="pt-4 border-t border-accent/20">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">AI Technology Used</h4>
                      <p className="text-sm text-muted-foreground">{mission.aiApplication}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 p-6 rounded-lg border border-secondary">
                <h3 className="font-semibold mb-3">How It Works</h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>AI analyzes patterns in massive datasets that would take humans years to process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Machine learning models improve accuracy over time through continuous training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Human experts review AI recommendations to ensure safety and accuracy</span>
                  </li>
                </ul>
              </div>

              <Button onClick={() => setStep(2)} size="lg" className="w-full">
                Continue to Quiz
                <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </div>
          )}

          {/* Step 2: Reflect (Quiz) */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Brain className="w-5 h-5" />
                <span>Step 2: Reflect - Test Your Understanding</span>
              </div>

              <div className="space-y-6">
                {quizQuestions.map((q, idx) => (
                  <Card key={q.id} className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Question {idx + 1}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{q.question}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={answers[q.id]?.toString()}
                        onValueChange={(value) => setAnswers({ ...answers, [q.id]: Number.parseInt(value) })}
                      >
                        {q.options.map((option, optIdx) => (
                          <div key={optIdx} className="flex items-start gap-3 mb-3">
                            <RadioGroupItem value={optIdx.toString()} id={`q${q.id}-${optIdx}`} className="mt-1" />
                            <Label htmlFor={`q${q.id}-${optIdx}`} className="cursor-pointer leading-relaxed">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {showResults && (
                        <div
                          className={`mt-4 p-4 rounded-lg ${answers[q.id] === q.correct ? "bg-accent/10 border border-accent/20" : "bg-destructive/10 border border-destructive/20"}`}
                        >
                          <div className="flex items-start gap-2">
                            {answers[q.id] === q.correct ? (
                              <>
                                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-semibold text-accent">Correct!</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Great job understanding this concept.
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-semibold text-destructive">Not quite right</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    The correct answer is: {q.options[q.correct]}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {!showResults ? (
                <Button
                  onClick={handleQuizSubmit}
                  size="lg"
                  className="w-full"
                  disabled={Object.keys(answers).length < quizQuestions.length}
                >
                  Submit Answers
                </Button>
              ) : (
                <div className="space-y-4">
                  <Card className="border-2 border-accent bg-accent/5">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Your Score</p>
                        <p className="text-4xl font-bold text-accent">
                          {correctAnswers}/{quizQuestions.length}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {correctAnswers === quizQuestions.length
                            ? "Perfect! You mastered this topic!"
                            : "Good effort! Review the feedback above."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Button onClick={() => setStep(3)} size="lg" className="w-full">
                    Continue to Reflection
                    <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Connect */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Sparkles className="w-5 h-5" />
                <span>Step 3: Connect - Personal Reflection</span>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-balance">How does this AI application connect to your life?</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Think about how you might use, benefit from, or even create something similar in the future. Share
                    your thoughts below (minimum 20 characters).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Example: This AI could help my grandmother who has vision problems by describing her surroundings. I'm interested in learning more about computer vision to create accessibility tools..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="min-h-[150px] leading-relaxed"
                  />
                  <p className="text-xs text-muted-foreground mt-2">{reflection.length} characters</p>
                </CardContent>
              </Card>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Career Connections
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                  This AI technology opens doors to careers like:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Data Scientist</Badge>
                  <Badge variant="outline">AI Engineer</Badge>
                  <Badge variant="outline">Machine Learning Specialist</Badge>
                  <Badge variant="outline">Ethics Researcher</Badge>
                  <Badge variant="outline">Product Manager</Badge>
                </div>
              </div>

              <Button
                onClick={handleMissionComplete}
                size="lg"
                className="w-full"
                disabled={reflection.trim().length < 20}
              >
                Complete Mission & Earn Badge
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
