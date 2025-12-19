"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Sparkles, CheckCircle2, Award, Star, Rocket, Zap } from "lucide-react"
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
    title: "🏥 Healthcare Hero",
    category: "Medical AI 🩺",
    description: "Help Dr. Sarah use super-smart AI to save lives by finding diseases faster! 🚑",
    scenario:
      "Imagine Dr. Sarah looks at hundreds of X-rays every single day! 😮 That's like looking at every student in your school's photo... twice! An AI system acts like a super-detective 🔍, analyzing X-rays to spot early signs of diseases like pneumonia or tumors. It helps doctors help people faster!",
    aiApplication: "Computer Vision & Pattern Recognition 👁️🧠",
    completed: false,
    badge: {
      id: "health",
      name: "Healthcare Hero 🏥",
      description: "Mastered AI in medical diagnosis!",
      icon: "🏥",
    },
  },
  {
    id: 2,
    title: "🛡️ Content Guardian",
    category: "Social Media Safety 📱",
    description: "Be a superhero protecting online communities from bullies and mean content! 💪",
    scenario:
      "Social media platforms are HUGE! 🌎 Millions of posts every minute! AI acts like a digital superhero 🦸, scanning posts super fast to detect cyberbullying, hate speech, and inappropriate content. It helps keep everyone safe online - including you and your friends!",
    aiApplication: "Natural Language Processing (NLP) 💬🤖",
    completed: false,
    badge: {
      id: "guardian",
      name: "Content Guardian 🛡️",
      description: "Protected the digital world!",
      icon: "🛡️",
    },
  },
  {
    id: 3,
    title: "🌍 Climate Predictor",
    category: "Environmental Science 🌦️",
    description: "Use AI superpowers to predict weather and save communities from dangerous storms! ⛈️",
    scenario:
      "Weather scientists use AI like a crystal ball 🔮 - but way more accurate! AI looks at satellite images 🛰️, ocean temperatures 🌊, and wind patterns 💨 to predict hurricanes DAYS before they happen. This gives families time to stay safe. Pretty cool, right? 😎",
    aiApplication: "Machine Learning & Predictive Analytics 📊🔮",
    completed: false,
    badge: {
      id: "climate",
      name: "Climate Predictor 🌍",
      description: "Forecasted the future weather!",
      icon: "🌍",
    },
  },
  {
    id: 4,
    title: "♿ Accessibility Advocate",
    category: "Assistive Technology 🤝",
    description: "Discover how AI helps EVERYONE navigate the world - no matter their abilities! 🌟",
    scenario:
      "AI is like a helpful friend for people with disabilities! 👫 For people who can't see, AI describes everything around them through their phone 📱. For people who are deaf, it turns speech into text instantly 💬. For people with mobility challenges, it predicts what they want to type. AI makes the world more accessible for everyone!",
    aiApplication: "Computer Vision, Speech Recognition & NLP 👁️🎤💬",
    completed: false,
    badge: {
      id: "accessibility",
      name: "Accessibility Advocate ♿",
      description: "Made the world more inclusive!",
      icon: "♿",
    },
  },
  {
    id: 5,
    title: "🔒 Fraud Fighter",
    category: "Cybersecurity 🛡️",
    description: "Stop bad guys online! Use AI to catch credit card thieves and protect people's money! 💳",
    scenario:
      "Imagine someone trying to steal from MILLIONS of bank accounts at once! 😱 That's what hackers do. But AI is faster! ⚡ Banks use AI to check every transaction in milliseconds. If something looks fishy 🐟 (like buying 100 PlayStations at 3am!), AI flags it instantly. You just became a digital detective! 🕵️",
    aiApplication: "Anomaly Detection & Pattern Recognition 🔍📊",
    completed: false,
    badge: {
      id: "security",
      name: "Fraud Fighter 🔒",
      description: "Defended against cyber criminals!",
      icon: "🔒",
    },
  },
  {
    id: 6,
    title: "📚 Education Innovator",
    category: "Personalized Learning 🎓",
    description: "Help every student learn at their own perfect pace with AI tutoring! 🚀",
    scenario:
      "Everyone learns differently, right? 🤔 Some students zoom through math ➗, while others need more time. AI tutors are like having a personal teacher 👨‍🏫 who knows EXACTLY how you learn best! It spots what you're struggling with, gives you perfect practice problems, and celebrates when you improve! 🎉",
    aiApplication: "Adaptive Learning Algorithms 🧠📈",
    completed: false,
    badge: {
      id: "education",
      name: "Education Innovator 📚",
      description: "Revolutionized learning with AI!",
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
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-2 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center">
              <div className="relative animate-bounce">
                <div className="absolute inset-0 bg-cyan-400/30 blur-3xl rounded-full" />
                <div className="text-6xl relative animate-pulse">🚀</div>
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-4xl font-bold text-balance">🌟 AI Explorer: Real World Missions 🌟</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                Get ready for an EPIC adventure! 🎮 Discover how AI is changing our world RIGHT NOW! Complete awesome
                missions, collect cool badges, and become an AI expert! 🏆
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-teal-400/20 to-teal-500/10 rounded-xl border-2 border-teal-400/30 hover:scale-105 transition-transform shadow-lg">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="font-semibold mb-1 text-lg">🌟 Present</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Explore 6 AMAZING real-world AI adventures in healthcare, gaming, weather, and MORE! Each one is
                    cooler than the last! 🤯
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-400/20 to-blue-500/10 rounded-xl border-2 border-blue-400/30 hover:scale-105 transition-transform shadow-lg">
                <div className="text-3xl">🧠</div>
                <div>
                  <h3 className="font-semibold mb-1 text-lg">💡 Reflect</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Test your brain power! 💪 Answer fun questions and see how much you've learned! No boring stuff - we
                    promise! 😄
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-400/20 to-purple-500/10 rounded-xl border-2 border-purple-400/30 hover:scale-105 transition-transform shadow-lg">
                <div className="text-3xl">🔗</div>
                <div>
                  <h3 className="font-semibold mb-1 text-lg">✨ Connect</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    See how AI affects YOUR life today and discover awesome future careers! Maybe you'll build the next
                    AI that changes the world! 🌍
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setGameStarted(true)}
              size="lg"
              className="w-full text-lg h-16 font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white hover:scale-105 transition-all shadow-lg"
            >
              <Rocket className="w-6 h-6 mr-2" />
              Start Your EPIC AI Adventure! 🚀
              <Sparkles className="w-6 h-6 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/40 blur-xl rounded-full" />
                <div className="text-5xl relative animate-bounce">🎮</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">🌟 AI Explorer 🌟</h1>
                <p className="text-sm text-gray-600">Real World Missions!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right bg-cyan-100 px-4 py-2 rounded-xl border-2 border-cyan-300 shadow-md">
                <p className="text-sm text-cyan-700 flex items-center gap-1 font-semibold">
                  <Star className="w-4 h-4" /> Progress
                </p>
                <p className="text-2xl font-bold text-cyan-600">
                  {completedCount}/{currentMissions.length}
                </p>
              </div>
              <UIBadge
                variant="secondary"
                className="px-4 py-2 text-base hover:scale-110 transition-transform bg-purple-100 text-purple-700 border-2 border-purple-300"
              >
                <Award className="w-4 h-4 mr-2" />
                {earnedBadges.length} Badges 🏆
              </UIBadge>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full shadow-inner"
                style={{ width: `${progress}%` }}
              />
              {progress > 0 && (
                <div className="absolute top-0.5 left-2 text-xs font-bold text-white drop-shadow-lg">
                  {Math.round(progress)}% Complete! 🎯
                </div>
              )}
            </div>
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
            {earnedBadges.length > 0 && (
              <div className="animate-in slide-in-from-top-4 duration-500">
                <BadgeCollection badges={earnedBadges} />
              </div>
            )}

            <div>
              <div className="mb-6 text-center">
                <h2 className="text-4xl font-bold mb-2 text-balance text-gray-800">
                  🎯 Choose Your Next Adventure! 🎯
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Pick any mission below to start exploring! Each one teaches you something AWESOME about AI! 🚀
                  Complete all 6 to become a certified AI Explorer! 🏆
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentMissions.map((mission, idx) => {
                  const gradients = [
                    "from-teal-400/20 to-teal-500/10 border-teal-300", // Healthcare - teal
                    "from-blue-400/20 to-blue-500/10 border-blue-300", // Social Media - blue
                    "from-yellow-400/20 to-yellow-500/10 border-yellow-300", // Weather - yellow
                    "from-purple-400/20 to-purple-500/10 border-purple-300", // Accessibility - purple
                    "from-cyan-400/20 to-cyan-500/10 border-cyan-300", // Fraud - cyan
                    "from-pink-400/20 to-pink-500/10 border-pink-300", // Education - coral/pink
                  ]

                  return (
                    <Card
                      key={mission.id}
                      className={`cursor-pointer transition-all hover:shadow-2xl hover:scale-105 animate-in fade-in-0 zoom-in-95 duration-500 bg-gradient-to-br ${gradients[idx]} ${
                        mission.completed ? "border-3 shadow-xl" : "border-2"
                      }`}
                      style={{ animationDelay: `${idx * 100}ms` }}
                      onClick={() => setSelectedMission(mission)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <UIBadge
                            variant={mission.completed ? "default" : "secondary"}
                            className="text-sm hover:scale-110 transition-transform bg-white/80 text-gray-700 border"
                          >
                            {mission.category}
                          </UIBadge>
                          {mission.completed && (
                            <div className="animate-bounce">
                              <CheckCircle2 className="w-7 h-7 text-cyan-600" />
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-xl text-balance text-gray-800">{mission.title}</CardTitle>
                        <CardDescription className="leading-relaxed text-gray-700">
                          {mission.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant={mission.completed ? "outline" : "default"}
                          className={`w-full group hover:scale-105 transition-all ${
                            mission.completed
                              ? "border-2 border-cyan-400 text-cyan-700 hover:bg-cyan-50"
                              : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                          }`}
                        >
                          {mission.completed ? (
                            <>
                              <Star className="w-4 h-4 mr-2" />
                              Play Again! 🔄
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                              Start Mission! 🚀
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
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
