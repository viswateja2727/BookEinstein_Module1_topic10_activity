"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Sparkles, Brain, CheckCircle2, Rocket, Star, Trophy, Zap } from "lucide-react"

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

const allQuizQuestions: Record<
  number,
  Array<{
    id: string
    question: string
    options: string[]
    correct: number
    funFact: string
  }>
> = {
  1: [
    // Healthcare
    {
      id: "h1",
      question: "Why is AI super helpful for doctors looking at X-rays? 🏥",
      options: [
        "🚀 It can analyze thousands of images WAY faster than humans!",
        "🤖 It completely replaces doctors (no humans needed)",
        "💰 It makes X-rays cheaper to take",
        "🎨 It makes the X-rays look prettier",
      ],
      correct: 0,
      funFact: "AI can analyze an X-ray in seconds, while a human might take minutes! ⚡",
    },
    {
      id: "h2",
      question: "What's the MOST important rule when using AI in healthcare? 🤔",
      options: [
        "💸 Always choose the cheapest AI",
        "👨‍⚕️ Doctors should ALWAYS review AI suggestions before treating patients!",
        "🤐 Keep the AI technology a secret",
        "🤖 Let AI make all decisions without humans",
      ],
      correct: 1,
      funFact: "AI is a helper, not a replacement! Doctors + AI = Dream Team! 💪",
    },
    {
      id: "h3",
      question: "How does AI learn to spot diseases in X-rays? 🧠",
      options: [
        "🎓 By studying thousands of examples from real X-rays!",
        "🎲 It guesses randomly until it gets it right",
        "📚 By reading medical textbooks",
        "🔮 It uses magic!",
      ],
      correct: 0,
      funFact: "AI learns from millions of examples - the more it sees, the smarter it gets! 📈",
    },
  ],
  2: [
    // Social Media
    {
      id: "s1",
      question: "How fast can AI check posts for bullying or mean content? 💨",
      options: [
        "🐌 About as fast as a human reading carefully",
        "⚡ Instantly! It checks millions of posts per second!",
        "📅 It takes about a day to check each post",
        "📧 It only checks posts that are reported",
      ],
      correct: 1,
      funFact: "AI can scan your entire school's social media posts in less than a second! 🤯",
    },
    {
      id: "s2",
      question: "What should happen when AI finds something that MIGHT be bullying? 🤔",
      options: [
        "🗑️ Instantly delete it without checking",
        "👁️ A human should review it to make sure!",
        "🙈 Ignore it if the person is popular",
        "📢 Post it publicly to shame the person",
      ],
      correct: 1,
      funFact: "AI sometimes makes mistakes, so humans double-check to keep it fair! ⚖️",
    },
    {
      id: "s3",
      question: "Why is AI content moderation important for kids like you? 👧👦",
      options: [
        "🛡️ It helps keep online spaces safe and friendly for everyone!",
        "👮 To get people in trouble",
        "💰 To make social media companies rich",
        "📊 Just to collect data",
      ],
      correct: 0,
      funFact: "Safe online spaces mean you can have fun without worrying about bullies! 🎉",
    },
  ],
  3: [
    // Weather
    {
      id: "w1",
      question: "How far in advance can AI predict hurricanes? 🌀",
      options: [
        "⏰ Just a few hours before",
        "📅 Days or even a week ahead!",
        "🔮 Months before they form",
        "❌ AI can't predict hurricanes",
      ],
      correct: 1,
      funFact: "Knowing about hurricanes early saves lives! Families can evacuate safely! 🏃‍♀️",
    },
    {
      id: "w2",
      question: "What does AI look at to predict the weather? 👀",
      options: [
        "🐸 It asks frogs (they predict rain!)",
        "🛰️ Satellite images, ocean temps, wind patterns, and tons more!",
        "📺 Weather channel hosts",
        "🌡️ Just temperature",
      ],
      correct: 1,
      funFact: "AI analyzes more data in one second than you could read in your entire life! 📚",
    },
    {
      id: "w3",
      question: "How does weather prediction AI help YOUR life? 🤔",
      options: [
        "📱 You check the weather app before going to school!",
        "🏖️ It only helps people at the beach",
        "❄️ It only predicts snow",
        "🎮 It has nothing to do with daily life",
      ],
      correct: 0,
      funFact: "Weather apps use AI! So you're already using AI every day! 😎",
    },
  ],
  4: [
    // Accessibility
    {
      id: "a1",
      question: "How does AI help someone who can't see? 👁️",
      options: [
        "📱 AI describes their surroundings through their phone!",
        "🕶️ It gives them special glasses that fix their vision",
        "❌ AI can't help with vision problems",
        "📖 It reads books slowly to them",
      ],
      correct: 0,
      funFact: "Apps can tell you 'There's a red car 10 feet ahead' or 'Your friend is smiling!' 📸",
    },
    {
      id: "a2",
      question: "What's AWESOME about AI accessibility tools? 🌟",
      options: [
        "💰 They're always super expensive",
        "♿ They help people with disabilities do things independently!",
        "👥 Only adults can use them",
        "🏢 They only work in special buildings",
      ],
      correct: 1,
      funFact: "AI accessibility tools help millions of people live more independent lives! 💪",
    },
    {
      id: "a3",
      question: "How does AI help people who have trouble typing? ⌨️",
      options: [
        "💬 It predicts what they want to write before they finish!",
        "🤖 It types random words for them",
        "❌ It doesn't help with typing",
        "🎤 It only works with voice commands",
      ],
      correct: 0,
      funFact: "Predictive text uses AI! Your phone already knows what you might say next! 💭",
    },
  ],
  5: [
    // Fraud
    {
      id: "f1",
      question: "How does AI know if someone's credit card was stolen? 💳",
      options: [
        "🔮 It has a crystal ball",
        "🔍 It spots weird patterns, like buying 50 video games at 3am!",
        "📞 It calls the person to ask",
        "🎲 It guesses randomly",
      ],
      correct: 1,
      funFact: "AI knows your normal shopping habits, so it notices when something's fishy! 🐟",
    },
    {
      id: "f2",
      question: "How fast does AI check bank transactions for fraud? ⚡",
      options: [
        "📅 Once a week",
        "⏰ A few times a day",
        "⚡ Every single transaction in MILLISECONDS!",
        "📧 Only when you report something",
      ],
      correct: 2,
      funFact: "Milliseconds are SUPER tiny - way faster than you can blink! 👁️",
    },
    {
      id: "f3",
      question: "Why is AI fraud detection important for YOUR family? 👨‍👩‍👧‍👦",
      options: [
        "🛡️ It protects your family's money from thieves!",
        "💰 It makes banks richer",
        "👮 To catch criminals for fun",
        "❌ It's not important for regular people",
      ],
      correct: 0,
      funFact: "AI fraud detection saved people over $28 BILLION last year! That's a lot of money! 💵",
    },
  ],
  6: [
    // Education
    {
      id: "e1",
      question: "What makes AI tutors different from regular teaching? 🤔",
      options: [
        "👨‍🏫 They're stricter than human teachers",
        "🎯 They adapt to YOUR personal learning style and speed!",
        "💰 They cost more money",
        "📚 They only teach one subject",
      ],
      correct: 1,
      funFact: "AI tutors can teach the EXACT way YOU learn best - pretty cool! 🧠",
    },
    {
      id: "e2",
      question: "How does an AI tutor know what you're struggling with? 🔍",
      options: [
        "📊 It tracks which problems you get wrong and figures out the pattern!",
        "🔮 It guesses based on your age",
        "📝 Your teacher tells it",
        "🎲 It assigns random practice",
      ],
      correct: 0,
      funFact: "AI is like a super-detective that figures out exactly where you need help! 🕵️",
    },
    {
      id: "e3",
      question: "What's the BEST thing about AI learning tools? 🌟",
      options: [
        "🤖 They replace teachers completely",
        "🎯 Everyone can learn at their own perfect pace!",
        "📱 They let you use your phone in class",
        "❌ There are no good things about them",
      ],
      correct: 1,
      funFact: "No more feeling rushed or bored in class - AI adapts to YOU! 🚀",
    },
  ],
}

export default function MissionCard({ mission, onComplete, onBack }: Props) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [reflection, setReflection] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<(typeof allQuizQuestions)[1]>([])

  useEffect(() => {
    const missionQuestions = allQuizQuestions[mission.id] || []
    const shuffled = [...missionQuestions].sort(() => Math.random() - 0.5)
    setSelectedQuestions(shuffled.slice(0, 2))
  }, [mission.id])

  const handleQuizSubmit = () => {
    setShowResults(true)
  }

  const handleMissionComplete = () => {
    if (reflection.trim().length > 20) {
      onComplete(mission.id)
    }
  }

  const correctAnswers = Object.entries(answers).filter(
    ([qId, ansIdx]) => selectedQuestions.find((q) => q.id === qId)?.correct === ansIdx,
  ).length

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="mb-4 hover:scale-105 transition-transform hover:bg-cyan-100">
        <ChevronLeft className="w-4 h-4 mr-2" />← Back to Missions
      </Button>

      <Card className="border-2 shadow-2xl bg-white">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-sm bg-cyan-100 text-cyan-700 border border-cyan-300">
              {mission.category}
            </Badge>
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <div
                    className={`transition-all rounded-full ${
                      s === step
                        ? "bg-cyan-500 w-10 h-3 shadow-lg shadow-cyan-500/50" // Cyan active step
                        : s < step
                          ? "bg-cyan-400 w-3 h-3" // Cyan completed step
                          : "bg-gray-300 w-3 h-3"
                    }`}
                  />
                  <span className="text-xs text-muted-foreground">{s === 1 ? "📖" : s === 2 ? "🧠" : "✨"}</span>
                </div>
              ))}
            </div>
          </div>
          <CardTitle className="text-3xl text-balance text-gray-800">{mission.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed text-gray-600">{mission.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-2 text-cyan-700 font-bold text-lg bg-cyan-100 p-3 rounded-xl border-2 border-cyan-300">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span>Step 1: The Amazing Scenario! 🎯</span>
              </div>

              <div className="bg-gradient-to-br from-teal-400/20 to-teal-500/10 p-6 rounded-2xl border-2 border-teal-300 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">📖</span>
                  <h3 className="font-bold text-xl text-gray-800">The Real-World Story</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">{mission.scenario}</p>

                <div className="pt-4 border-t-2 border-teal-300">
                  <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl backdrop-blur-sm">
                    <Brain className="w-6 h-6 text-teal-600 shrink-0 mt-1 animate-pulse" />
                    <div>
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-800">🤖 AI Technology Used</h4>
                      <p className="text-gray-700 font-semibold">{mission.aiApplication}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-400/20 to-blue-500/10 p-6 rounded-2xl border-2 border-blue-300 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">⚙️</span>
                  <h3 className="font-bold text-xl text-gray-800">How Does It Work? 🔧</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-white/70 p-3 rounded-xl hover:scale-105 transition-transform backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span className="leading-relaxed text-gray-700">
                      <strong>💨 Super Speed:</strong> AI analyzes MASSIVE amounts of data that would take humans years
                      to process!
                    </span>
                  </li>
                  <li className="flex items-start gap-3 bg-white/70 p-3 rounded-xl hover:scale-105 transition-transform backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span className="leading-relaxed text-gray-700">
                      <strong>📈 Gets Smarter:</strong> The more it learns, the better it gets - like leveling up in a
                      video game! 🎮
                    </span>
                  </li>
                  <li className="flex items-start gap-3 bg-white/70 p-3 rounded-xl hover:scale-105 transition-transform backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span className="leading-relaxed text-gray-700">
                      <strong>👨‍💼 Human Teamwork:</strong> AI and humans work TOGETHER - AI suggests, humans decide!
                      Best of both worlds! 💪
                    </span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => setStep(2)}
                size="lg"
                className="w-full text-lg h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:scale-105 transition-all shadow-lg"
              >
                <Zap className="w-5 h-5 mr-2 animate-pulse" />
                Ready for the Quiz! 🧠
                <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-lg bg-purple-100 p-3 rounded-xl border-2 border-purple-300">
                <Brain className="w-6 h-6 animate-pulse" />
                <span>Step 2: Test Your Brain Power! 🧠💪</span>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                <p className="text-center text-sm text-gray-700">
                  <strong>📝 Quick Quiz Time!</strong> Don't worry - these questions help you learn! No pressure! 😊
                </p>
              </div>

              <div className="space-y-6">
                {selectedQuestions.map((q, idx) => (
                  <Card key={q.id} className="border-2 hover:border-cyan-400 transition-all hover:shadow-xl bg-white">
                    <CardHeader className="bg-gradient-to-r from-cyan-50 to-transparent">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="text-lg px-3 py-1 bg-cyan-500 text-white">
                          Question {idx + 1} {idx === 0 ? "🥇" : "🥈"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-balance leading-relaxed text-gray-800">{q.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <RadioGroup
                        value={answers[q.id]?.toString()}
                        onValueChange={(value) => setAnswers({ ...answers, [q.id]: Number.parseInt(value) })}
                      >
                        {q.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className={`flex items-start gap-3 mb-3 p-3 rounded-xl border-2 transition-all hover:border-cyan-400 hover:bg-cyan-50 ${
                              answers[q.id] === optIdx ? "border-cyan-500 bg-cyan-50 shadow-md" : "border-gray-200"
                            }`}
                          >
                            <RadioGroupItem value={optIdx.toString()} id={`q${q.id}-${optIdx}`} className="mt-1" />
                            <Label
                              htmlFor={`q${q.id}-${optIdx}`}
                              className="cursor-pointer leading-relaxed text-base flex-1 text-gray-700"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {showResults && (
                        <div
                          className={`mt-4 p-4 rounded-xl border-2 transition-all ${
                            answers[q.id] === q.correct
                              ? "bg-gradient-to-r from-teal-100 to-teal-50 border-teal-400 animate-in zoom-in-95 duration-300"
                              : "bg-gradient-to-r from-orange-100 to-orange-50 border-orange-400 animate-in zoom-in-95 duration-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {answers[q.id] === q.correct ? (
                              <>
                                <div className="text-4xl animate-bounce">🎉</div>
                                <div className="flex-1">
                                  <p className="font-bold text-teal-700 text-lg">AMAZING! You nailed it! 🌟</p>
                                  <p className="text-sm text-gray-700 mt-2">
                                    <strong>💡 Fun Fact:</strong> {q.funFact}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-4xl">🤔</div>
                                <div className="flex-1">
                                  <p className="font-bold text-orange-700 text-lg">Not quite - but that's okay!</p>
                                  <p className="text-sm mt-2 text-gray-700">
                                    <strong>✅ The right answer:</strong> {q.options[q.correct]}
                                  </p>
                                  <p className="text-sm text-gray-700 mt-2">
                                    <strong>💡 Fun Fact:</strong> {q.funFact}
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

              <div className="flex gap-4">
                {!showResults ? (
                  <Button
                    onClick={handleQuizSubmit}
                    size="lg"
                    disabled={Object.keys(answers).length < selectedQuestions.length}
                    className="w-full text-lg h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white hover:scale-105 transition-all shadow-lg"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Check My Answers! 🎯
                  </Button>
                ) : (
                  <Button
                    onClick={() => setStep(3)}
                    size="lg"
                    className="w-full text-lg h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:scale-105 transition-all shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Continue to Reflection! ✨
                    <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
                  </Button>
                )}
              </div>

              {showResults && (
                <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-2xl border-2 border-cyan-300 text-center animate-in zoom-in-95 duration-500">
                  <div className="text-6xl mb-3 animate-bounce">
                    {correctAnswers === selectedQuestions.length ? "🏆" : correctAnswers > 0 ? "🌟" : "💪"}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {correctAnswers === selectedQuestions.length
                      ? "PERFECT SCORE! You're a genius! 🎉"
                      : correctAnswers > 0
                        ? "Great effort! Keep learning! 🚀"
                        : "Every expert was once a beginner! 💪"}
                  </h3>
                  <p className="text-lg text-gray-700">
                    You got <strong className="text-cyan-700">{correctAnswers}</strong> out of{" "}
                    <strong>{selectedQuestions.length}</strong> correct!
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-2 text-pink-700 font-bold text-lg bg-pink-100 p-3 rounded-xl border-2 border-pink-300">
                <Star className="w-6 h-6 animate-pulse" />
                <span>Step 3: Connect AI to YOUR Life! ✨</span>
              </div>

              <div className="bg-gradient-to-br from-pink-400/20 to-pink-500/10 p-6 rounded-2xl border-2 border-pink-300 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">💭</span>
                  <h3 className="font-bold text-xl text-gray-800">Time to Think Deep! 🤔</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Now it's YOUR turn! Share your thoughts about how this AI technology connects to your life, your
                  future, or the world around you! 🌍
                </p>

                <div className="space-y-4">
                  <div className="bg-white/70 p-4 rounded-xl backdrop-blur-sm">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-800">
                      💡 Reflection Prompts (Pick one or answer all!):
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="shrink-0">🎯</span>
                        <span>How could this AI technology help YOU or your family right now?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="shrink-0">🚀</span>
                        <span>
                          If you could improve this AI, what would you add? What problems would you solve with it?
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="shrink-0">⚖️</span>
                        <span>What are the pros AND cons of using this AI? How can we make sure it's used fairly?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="shrink-0">🌟</span>
                        <span>Would you want to work on this kind of AI when you grow up? Why or why not?</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <Label htmlFor="reflection" className="text-base font-semibold mb-2 block text-gray-800">
                      ✍️ Your Reflection (Write at least 2-3 sentences):
                    </Label>
                    <Textarea
                      id="reflection"
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Type your thoughts here... Be honest and creative! There are no wrong answers! 💭✨"
                      className="min-h-[200px] text-base border-2 border-gray-300 focus:border-cyan-400 rounded-xl"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      {reflection.trim().length < 20
                        ? `Keep going! Write a bit more... (${reflection.trim().length} characters so far)`
                        : `Awesome! You wrote ${reflection.trim().length} characters! 🎉`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  size="lg"
                  className="flex-1 text-lg h-14 border-2 hover:bg-gray-100"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back to Quiz
                </Button>
                <Button
                  onClick={handleMissionComplete}
                  disabled={reflection.trim().length < 20}
                  size="lg"
                  className="flex-1 text-lg h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 disabled:opacity-50 text-white hover:scale-105 transition-all shadow-lg"
                >
                  <Rocket className="w-5 h-5 mr-2 animate-pulse" />
                  Complete Mission! 🏆
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
