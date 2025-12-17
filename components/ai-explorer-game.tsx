"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Sparkles, CheckCircle2, Award, ChevronRight, Lightbulb, Users } from "lucide-react"
import MissionCard from "./mission-card"
import ReflectionModal from "./reflection-modal"
import BadgeCollection from "./badge-collection"

type Badge = {
  id: string
  name: string
  description: string
  icon: string
}

type Mission = {
  id: number
  title: string
  category: string
  description: string
  scenario: string
  aiApplication: string
  completed: boolean
  badge?: Badge
}

const missions: Mission[] = [
  {
    id: 1,
    title: "Healthcare Hero",
    category: "Medical AI",
    description: "Help Dr. Sarah use AI to diagnose patient symptoms faster and more accurately.",
    scenario:
      "Dr. Sarah receives hundreds of X-rays daily. An AI system analyzes them to detect early signs of diseases like pneumonia or tumors.",
    aiApplication: "Computer Vision & Pattern Recognition",
    completed: false,
    badge: {
      id: "health",
      name: "Healthcare Hero",
      description: "Understood AI in medical diagnosis",
      icon: "🏥",
    },
  },
  {
    id: 2,
    title: "Content Guardian",
    category: "Social Media Safety",
    description: "Protect online communities by understanding how AI moderates harmful content.",
    scenario:
      "Social media platforms use AI to detect cyberbullying, hate speech, and inappropriate content in real-time across millions of posts.",
    aiApplication: "Natural Language Processing (NLP)",
    completed: false,
    badge: {
      id: "guardian",
      name: "Content Guardian",
      description: "Explored AI content moderation",
      icon: "🛡️",
    },
  },
  {
    id: 3,
    title: "Climate Predictor",
    category: "Environmental Science",
    description: "Use AI to predict weather patterns and help communities prepare for disasters.",
    scenario:
      "Meteorologists use AI models to analyze satellite data, ocean temperatures, and wind patterns to predict hurricanes days in advance.",
    aiApplication: "Machine Learning & Predictive Analytics",
    completed: false,
    badge: {
      id: "climate",
      name: "Climate Predictor",
      description: "Discovered AI in weather forecasting",
      icon: "🌍",
    },
  },
  {
    id: 4,
    title: "Accessibility Advocate",
    category: "Assistive Technology",
    description: "Discover how AI helps people with disabilities navigate the world.",
    scenario:
      "AI-powered apps describe surroundings to visually impaired users, convert speech to text for the deaf, and predict text for people with mobility challenges.",
    aiApplication: "Computer Vision, Speech Recognition & NLP",
    completed: false,
    badge: {
      id: "accessibility",
      name: "Accessibility Advocate",
      description: "Learned AI assistive technologies",
      icon: "♿",
    },
  },
  {
    id: 5,
    title: "Fraud Fighter",
    category: "Cybersecurity",
    description: "Stop cybercriminals using AI-powered fraud detection systems.",
    scenario:
      "Banks use AI to analyze millions of transactions instantly, detecting unusual patterns that might indicate credit card fraud or identity theft.",
    aiApplication: "Anomaly Detection & Pattern Recognition",
    completed: false,
    badge: {
      id: "security",
      name: "Fraud Fighter",
      description: "Mastered AI security systems",
      icon: "🔒",
    },
  },
  {
    id: 6,
    title: "Education Innovator",
    category: "Personalized Learning",
    description: "Help students learn at their own pace with AI-powered tutoring systems.",
    scenario:
      "AI tutors adapt to each student's learning style, identifying knowledge gaps and providing personalized exercises and explanations.",
    aiApplication: "Adaptive Learning Algorithms",
    completed: false,
    badge: {
      id: "education",
      name: "Education Innovator",
      description: "Explored AI in education",
      icon: "📚",
    },
  },
]

export default function AIExplorerGame() {
  const [currentMissions, setCurrentMissions] = useState<Mission[]>(missions)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [showReflection, setShowReflection] = useState(false)
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([])
  const [gameStarted, setGameStarted] = useState(false)

  const completedCount = currentMissions.filter((m) => m.completed).length
  const progress = (completedCount / currentMissions.length) * 100

  const handleMissionComplete = (missionId: number) => {
    const updatedMissions = currentMissions.map((m) => (m.id === missionId ? { ...m, completed: true } : m))
    setCurrentMissions(updatedMissions)

    const completedMission = updatedMissions.find((m) => m.id === missionId)
    if (completedMission?.badge && !earnedBadges.find((b) => b.id === completedMission.badge!.id)) {
      setEarnedBadges([...earnedBadges, completedMission.badge])
    }

    setSelectedMission(null)
    setShowReflection(true)
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-2 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                <Brain className="w-24 h-24 text-accent relative" strokeWidth={1.5} />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-4xl font-bold text-balance">AI Explorer: Real World Missions</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                Embark on an interactive journey to discover how AI is transforming our world! Complete missions, earn
                badges, and connect AI concepts to real-life scenarios.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <Sparkles className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Present</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Explore 6 real-world AI scenarios across healthcare, education, security, and more
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg border border-secondary">
                <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Reflect</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Answer thought-provoking questions about AI's impact and ethical considerations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Users className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Connect</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Relate AI applications to your daily life and future career possibilities
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={() => setGameStarted(true)} size="lg" className="w-full text-lg h-14 font-semibold">
              Start Your AI Journey
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full" />
                <Brain className="w-10 h-10 text-accent relative" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Explorer</h1>
                <p className="text-sm text-muted-foreground">Real World Missions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold">
                  {completedCount}/{currentMissions.length}
                </p>
              </div>
              <UIBadge variant="secondary" className="px-4 py-2 text-base">
                <Award className="w-4 h-4 mr-2" />
                {earnedBadges.length} Badges
              </UIBadge>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={progress} className="h-3" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {selectedMission ? (
          <MissionCard
            mission={selectedMission}
            onComplete={handleMissionComplete}
            onBack={() => setSelectedMission(null)}
          />
        ) : (
          <div className="space-y-8">
            {/* Badge Collection */}
            {earnedBadges.length > 0 && <BadgeCollection badges={earnedBadges} />}

            {/* Mission Grid */}
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Your Missions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Choose a mission to explore how AI is being used in the real world. Complete all missions to become an
                  AI Expert!
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentMissions.map((mission) => (
                  <Card
                    key={mission.id}
                    className={`cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] ${
                      mission.completed ? "border-accent bg-accent/5" : "hover:border-accent/50"
                    }`}
                    onClick={() => setSelectedMission(mission)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <UIBadge variant={mission.completed ? "default" : "secondary"}>{mission.category}</UIBadge>
                        {mission.completed && <CheckCircle2 className="w-6 h-6 text-accent" />}
                      </div>
                      <CardTitle className="text-xl">{mission.title}</CardTitle>
                      <CardDescription className="leading-relaxed">{mission.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant={mission.completed ? "outline" : "default"} className="w-full">
                        {mission.completed ? "Review Mission" : "Start Mission"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Reflection Modal */}
      {showReflection && <ReflectionModal onClose={() => setShowReflection(false)} />}
    </div>
  )
}
