"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
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
  soundEnabled: boolean
  playAudio: (type: "success" | "click" | "correct" | "complete") => void
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
    {
      id: "h4",
      question: "What happens if AI finds something suspicious in a scan? 👀",
      options: [
        "⚠️ The doctor gets a detailed alert to review it carefully!",
        "🔔 It automatically removes the patient's scan",
        "📞 It calls the doctor without showing details",
        "❌ It ignores it if it's not 100% sure",
      ],
      correct: 0,
      funFact: "AI gives doctors a 'second opinion' - super useful! 🎯",
    },
    {
      id: "h5",
      question: "Which disease did AI help detect early MORE often? 💊",
      options: [
        "🫁 Lung cancer in early stages!",
        "🦷 Cavities in teeth",
        "💇 Hair loss conditions",
        "👣 Athlete's foot",
      ],
      correct: 0,
      funFact: "Early detection means better treatment options! 🌟",
    },
    {
      id: "h6",
      question: "If you were a doctor, would you use AI for diagnosis? 🤓",
      options: [
        "✅ YES! To help me catch things I might miss!",
        "❌ NO! I don't trust computers",
        "🤔 Only if the hospital forces me to",
        "⏰ Maybe in the future, but not now",
      ],
      correct: 0,
      funFact: "Most modern hospitals already use AI - it's THAT helpful! 🏥",
    },
  ],
  2: [
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
      funFact: "Humans and AI work together - neither is perfect alone! 🤝",
    },
    {
      id: "s3",
      question: "Can AI understand the difference between jokes and mean comments? 😄",
      options: [
        "🤷 Not always - context is tricky!",
        "✅ Yes, it's 100% accurate every time",
        "❌ No, it thinks everything is bullying",
        "🎭 Only if the comment has emojis",
      ],
      correct: 0,
      funFact: "That's why humans review AI decisions - context matters! 🧠",
    },
    {
      id: "s4",
      question: "What's the COOLEST part of AI content moderation? 🌟",
      options: [
        "🛡️ It protects millions of people INSTANTLY!",
        "💰 It saves money for social media companies",
        "🎮 It makes platforms more fun",
        "📱 It makes videos load faster",
      ],
      correct: 0,
      funFact: "Billions of people are safer online because of AI! 🌍",
    },
    {
      id: "s5",
      question: "How does AI learn what's 'bad' content? 📚",
      options: [
        "🏫 By studying millions of examples marked as bad by humans!",
        "🎲 It guesses randomly",
        "📖 It reads the platform's rule book once",
        "🤖 It just knows naturally",
      ],
      correct: 0,
      funFact: "Training data is SUPER important for AI! Quality + Quantity = Success! 💪",
    },
    {
      id: "s6",
      question: "If you could improve content moderation AI, what would you add? 🚀",
      options: [
        "🌐 Better cultural understanding across different countries!",
        "🎯 Make it block MORE posts",
        "🔇 Make it delete all negative comments",
        "⏰ Make it slower so humans can review more",
      ],
      correct: 0,
      funFact: "Different countries have different rules - AI must respect culture! 🌏",
    },
  ],
  3: [
    {
      id: "w1",
      question: "How can AI predict hurricanes DAYS before they happen? 🌪️",
      options: [
        "🛰️ By analyzing satellite images + ocean data + wind patterns!",
        "🔮 It reads weather wizard's crystal ball",
        "📡 It checks people's weather apps",
        "🌊 It talks to dolphins",
      ],
      correct: 0,
      funFact: "AI predictions can give families DAYS to prepare! Lives saved! 🏠",
    },
    {
      id: "w2",
      question: "What's cooler about AI weather - accuracy or SPEED? ⚡",
      options: [
        "⚡ SPEED! We get forecasts instantly!",
        "🎯 Accuracy! We know EXACTLY what will happen!",
        "👥 Neither - social media is better",
        "💰 Cost - it's cheaper",
      ],
      correct: 1,
      funFact: "Modern AI combines BOTH - super accurate AND super fast! 🌟",
    },
    {
      id: "w3",
      question: "Which data helps AI predict weather BEST? 📊",
      options: [
        "📍 Location data only",
        "🌡️ Temperature readings only",
        "🧬 ALL of it together - satellites, stations, ocean data!",
        "📱 Phone GPS signals",
      ],
      correct: 2,
      funFact: "Big Data + AI = Weather Superpowers! 🦸",
    },
    {
      id: "w4",
      question: "What's the most important job of weather AI RIGHT NOW? 🎯",
      options: [
        "⚠️ Warn people about dangerous storms so they stay safe!",
        "🎮 Make weather forecasting into a game",
        "💰 Sell weather data to TV companies",
        "🎬 Create dramatic weather predictions",
      ],
      correct: 0,
      funFact: "Every storm warning saves lives! 🏥🚑",
    },
    {
      id: "w5",
      question: "How has AI changed climate science? 🌍",
      options: [
        "🔬 It processes MASSIVE amounts of data scientists analyze!",
        "❌ It hasn't changed anything",
        "🎯 It made weather boring",
        "📺 It's only for TV weather reports",
      ],
      correct: 0,
      funFact: "AI helps us understand climate change better! 🌡️📈",
    },
    {
      id: "w6",
      question: "Would you want to work in AI weather prediction? 🚀",
      options: [
        "✅ YES! Helping people + Technology = DREAM JOB!",
        "❌ No, too complicated",
        "🤔 Maybe, if I could also be an astronaut",
        "📚 I prefer other types of AI",
      ],
      correct: 0,
      funFact: "Climate tech is one of the FASTEST growing AI fields! 🌍✨",
    },
  ],
  4: [
    {
      id: "a1",
      question: "How does AI help people who are blind see the world? 👁️",
      options: [
        "🎤 It describes everything around them through audio!",
        "🩹 It gives them eyesight back (magic!)",
        "🤖 It becomes their replacement eyes",
        "📸 It takes pictures instead of them",
      ],
      correct: 0,
      funFact: "AI audio descriptions let blind people navigate independently! 🦾",
    },
    {
      id: "a2",
      question: "What's an AWESOME way AI helps people who are deaf? 🎤",
      options: [
        "📝 It turns speech into text instantly - real-time captions!",
        "🎵 It plays music louder",
        "🔊 It gives them hearing somehow",
        "📱 It silences everything",
      ],
      correct: 0,
      funFact: "Live captions mean deaf people can participate in meetings & calls! 🎯",
    },
    {
      id: "a3",
      question: "How does AI help people with mobility challenges? 🛼",
      options: [
        "🎮 Voice control + predictive text = full device control!",
        "🚗 It drives cars for them",
        "💪 It gives them super strength",
        "🦽 It replaces wheelchairs",
      ],
      correct: 0,
      funFact: "Voice AI means people can control computers by talking! 🗣️",
    },
    {
      id: "a4",
      question: "Is accessibility tech cool or just necessary? 😊",
      options: [
        "🌟 BOTH! It's cool AND it helps millions of people!",
        "😴 It's just boring necessity stuff",
        "🎮 Only cool if it has video games",
        "👎 Not cool at all",
      ],
      correct: 0,
      funFact: "Inclusive tech benefits EVERYONE - you might use it someday! 🌍",
    },
    {
      id: "a5",
      question: "What percentage of people use accessibility features? 📊",
      options: [
        "📈 Billions! Captions, voice control, subtitles - many people use these!",
        "😅 Like 5 people max",
        "🌍 Just a few countries",
        "🔢 Nobody really",
      ],
      correct: 0,
      funFact: "Even non-disabled people use accessibility features every day! 🎯",
    },
    {
      id: "a6",
      question: "What's the future of AI in accessibility? 🚀",
      options: [
        "🌈 Making technology work for EVERYONE uniquely!",
        "🤖 Replacing all human assistants",
        "📱 Only for smartphones",
        "💻 Making computers more expensive",
      ],
      correct: 0,
      funFact: "The future is INCLUSIVE - AI for all abilities! ♿👁️🎤✨",
    },
  ],
  5: [
    {
      id: "f1",
      question: "How does AI catch fraudsters faster than humans? ⚡",
      options: [
        "🔍 It analyzes millions of transactions per SECOND looking for patterns!",
        "👮 It calls the police automatically",
        "💳 It blocks all transactions",
        "🎲 It guesses who's suspicious",
      ],
      correct: 0,
      funFact: "AI fraud detection happens in milliseconds! 🏃",
    },
    {
      id: "f2",
      question: "What counts as 'suspicious' to fraud AI? 🤔",
      options: [
        "🚨 Weird patterns like buying 100 PlayStations at 3am!",
        "🎮 Only actual fraud attempts",
        "💰 Any large transaction",
        "🏪 Shopping on weekends",
      ],
      correct: 0,
      funFact: "AI learns normal patterns for each person! 🧠",
    },
    {
      id: "f3",
      question: "Can AI fraud detection be WRONG? 🤷",
      options: [
        "✅ Yes! Sometimes legit purchases get flagged!",
        "❌ No, AI is always perfect",
        "⏰ Only on Mondays",
        "🌙 Only at night",
      ],
      correct: 0,
      funFact: "That's why you verify purchases! Balance = Security + Speed! 🛡️",
    },
    {
      id: "f4",
      question: "How much money does fraud AI SAVE every year? 💰",
      options: [
        "💵 BILLIONS! It stops massive theft constantly!",
        "🪙 Like $50",
        "📦 Only a few thousand",
        "❌ None - fraud still wins",
      ],
      correct: 0,
      funFact: "Banks save more money than they spend on fraud AI! 📊",
    },
    {
      id: "f5",
      question: "What makes a good fraud detection AI? 🎯",
      options: [
        "⚙️ Speed + Accuracy + Learning from new fraud tricks!",
        "🔒 Just blocking everything",
        "🚫 Blocking nothing",
        "💭 Thinking really hard",
      ],
      correct: 0,
      funFact: "Hackers constantly evolve - AI must evolve too! 🔄",
    },
    {
      id: "f6",
      question: "Would you want to work stopping cybercriminals? 👮",
      options: [
        "🎯 YES! Using AI to catch bad guys = AWESOME!",
        "❌ No way, too dangerous",
        "🤔 Only if I get a cape",
        "🎮 I'd rather make games",
      ],
      correct: 0,
      funFact: "Cybersecurity is one of the HOTTEST tech careers! 💼🚀",
    },
  ],
  6: [
    {
      id: "e1",
      question: "How does personalized AI tutoring help students? 🎓",
      options: [
        "🧠 It spots what you're struggling with and gives perfect practice!",
        "👨‍🏫 It replaces all teachers",
        "😴 It makes learning boring",
        "📱 It only works on phones",
      ],
      correct: 0,
      funFact: "AI tutors adapt to YOUR learning style! 🎯",
    },
    {
      id: "e2",
      question: "What's cooler - AI tutors or human teachers? 🤔",
      options: [
        "🤝 BOTH! Teachers + AI = Ultimate Learning Team!",
        "🤖 Only AI",
        "👨‍🏫 Only humans",
        "📚 Neither, I prefer books",
      ],
      correct: 0,
      funFact: "The future of education is HYBRID! 🌟",
    },
    {
      id: "e3",
      question: "How does AI know you're struggling with a topic? 📊",
      options: [
        "📈 It tracks your answers, time spent, and mistakes!",
        "🧠 It reads your mind",
        "📱 It checks your notifications",
        "🎮 It plays games to test you",
      ],
      correct: 0,
      funFact: "Data collection helps education - ethically! 🔒",
    },
    {
      id: "e4",
      question: "Can AI celebrate YOUR personal wins? 🎉",
      options: [
        "🎯 YES! It notices your progress and celebrates it!",
        "😐 No, it's emotionless",
        "🎮 Only in video games",
        "📊 Only if you're the top student",
      ],
      correct: 0,
      funFact: "Motivation matters! AI celebration = confidence boost! 💪",
    },
    {
      id: "e5",
      question: "What subject could AI tutoring help MOST? 📚",
      options: [
        "🧮 Math! (Complex problems, instant feedback - perfect for AI!)",
        "📝 Only writing",
        "🎨 Only art",
        "⚽ Only sports",
      ],
      correct: 0,
      funFact: "But AI can tutor literally ANY subject! 🌈",
    },
    {
      id: "e6",
      question: "Are YOU ready to be an Education Innovator? 🚀",
      options: ["✅ YES! Learning + AI = Future Success!", "❌ No way", "🤔 Maybe later", "😴 School is boring anyway"],
      correct: 0,
      funFact: "YOU could build AI tutors that change education forever! 🌍",
    },
  ],
}

export default function MissionCard({ mission, onComplete, onBack, soundEnabled, playAudio }: Props) {
  const [currentStage, setCurrentStage] = useState<"scenario" | "quiz" | "complete">("scenario")
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showFunFact, setShowFunFact] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<(typeof allQuizQuestions)[1]>([])

  useEffect(() => {
    const allQuestions = allQuizQuestions[mission.id]
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    setQuizQuestions(shuffled.slice(0, 6))
  }, [mission.id])

  const currentQuestion = quizQuestions[quizIndex]
  const questionsCount = quizQuestions.length

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index)
    setAnswered(true)
    setShowFunFact(true)

    if (index === currentQuestion.correct) {
      setCorrectAnswers(correctAnswers + 1)
      playAudio("correct")
    } else {
      playAudio("click")
    }
  }

  const handleNextQuestion = () => {
    if (quizIndex < questionsCount - 1) {
      setQuizIndex(quizIndex + 1)
      setSelectedAnswer(null)
      setAnswered(false)
      setShowFunFact(false)
      playAudio("click")
    } else {
      setCurrentStage("complete")
      playAudio("success")
    }
  }

  if (currentStage === "scenario") {
    return (
      <Card className="max-w-4xl mx-auto border-2 shadow-xl animate-in fade-in-0 zoom-in-95 duration-500">
        <CardHeader className="bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border-b-2">
          <div className="flex items-start justify-between mb-4">
            <Button onClick={onBack} variant="ghost" size="sm" className="hover:bg-cyan-100/50">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm">{mission.category}</Badge>
          </div>
          <CardTitle className="text-3xl text-balance">{mission.title}</CardTitle>
          <CardDescription className="text-lg mt-2">{mission.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl border-2 border-teal-200">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              The Real-World Scenario 🌍
            </h3>
            <p className="text-base leading-relaxed whitespace-pre-wrap">{mission.scenario}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              The AI Technology 🤖
            </h3>
            <p className="text-base leading-relaxed">{mission.aiApplication}</p>
          </div>

          <Button
            onClick={() => {
              setCurrentStage("quiz")
              playAudio("click")
            }}
            size="lg"
            className="w-full text-lg h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:scale-105 transition-all shadow-lg font-bold"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Ready for 6 EPIC Questions? 🎮
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (currentStage === "quiz" && currentQuestion) {
    return (
      <Card className="max-w-2xl mx-auto border-2 shadow-xl animate-in fade-in-0 zoom-in-95 duration-500">
        <CardHeader className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 border-b-2">
          <div className="flex items-center justify-between mb-4">
            <Button onClick={onBack} variant="ghost" size="sm" className="hover:bg-cyan-100/50">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold bg-cyan-100 px-3 py-1 rounded-full border-2 border-cyan-300">
                Question {quizIndex + 1} / {questionsCount}
              </div>
              <div className="text-sm font-bold bg-green-100 px-3 py-1 rounded-full border-2 border-green-300">
                ✅ {correctAnswers} Correct
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((quizIndex + 1) / questionsCount) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <h3 className="text-2xl font-bold text-balance text-gray-800">{currentQuestion.question}</h3>

          <RadioGroup value={selectedAnswer?.toString() || ""}>
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                    answered
                      ? idx === currentQuestion.correct
                        ? "bg-green-100 border-green-400 shadow-lg"
                        : idx === selectedAnswer
                          ? "bg-red-100 border-red-400 shadow-lg"
                          : "bg-gray-50 border-gray-300 opacity-50"
                      : selectedAnswer === idx
                        ? "bg-blue-100 border-blue-400 shadow-lg"
                        : "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  onClick={() => !answered && handleAnswerClick(idx)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value={idx.toString()}
                      id={`option-${idx}`}
                      disabled={answered}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <Label htmlFor={`option-${idx}`} className="text-base cursor-pointer font-medium flex-1">
                      {option}
                    </Label>
                    {answered && idx === currentQuestion.correct && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 animate-bounce" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>

          {showFunFact && (
            <div className="animate-in slide-in-from-bottom-4 duration-300 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-2 border-yellow-400 shadow-lg">
              <p className="font-semibold text-base flex items-start gap-2">
                <span className="text-xl">💡</span>
                <span>{currentQuestion.funFact}</span>
              </p>
            </div>
          )}

          {answered && (
            <Button
              onClick={handleNextQuestion}
              size="lg"
              className="w-full text-lg h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:scale-105 transition-all shadow-lg font-bold animate-in slide-in-from-bottom-4 duration-300"
            >
              {quizIndex === questionsCount - 1 ? (
                <>
                  <Trophy className="w-5 h-5 mr-2" />
                  See My Results! 🏆
                  <Star className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Next Question
                  <Zap className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (currentStage === "complete") {
    const percentage = Math.round((correctAnswers / questionsCount) * 100)
    const isPerfect = correctAnswers === questionsCount
    const isGreat = correctAnswers >= questionsCount - 1

    return (
      <Card className="max-w-2xl mx-auto border-3 shadow-2xl animate-in zoom-in-95 duration-500">
        <CardHeader className="text-center space-y-4 bg-gradient-to-r from-green-100 to-emerald-100 border-b-3">
          <div className="flex justify-center">
            <div className="relative animate-bounce">
              {isPerfect ? (
                <div className="text-7xl">🏆</div>
              ) : isGreat ? (
                <div className="text-7xl">⭐</div>
              ) : (
                <div className="text-7xl">🎉</div>
              )}
            </div>
          </div>
          <CardTitle className="text-4xl font-black text-balance">
            {isPerfect ? "PERFECT SCORE! 🌟" : isGreat ? "EXCELLENT!" : "MISSION COMPLETE!"}
          </CardTitle>
          <div className="text-3xl font-bold text-green-600">
            {correctAnswers} / {questionsCount} Correct! ({percentage}%)
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
            <h3 className="font-bold text-lg mb-3">Your Achievement: 🎯</h3>
            <p className="text-base leading-relaxed">
              {isPerfect
                ? "WOW! PERFECT SCORE! You're an absolute AI GENIUS! 🧠✨ You've completely mastered this mission!"
                : isGreat
                  ? "FANTASTIC! You really understand this AI application! You're becoming an AI expert! 💪"
                  : "AWESOME! You learned so much about " + mission.title + "! Keep playing to master every mission!"}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
            <h3 className="font-bold text-lg mb-3">🌟 Badge Earned:</h3>
            <div className="flex items-center gap-4">
              <div className="text-6xl">{mission.badge?.icon}</div>
              <div>
                <p className="font-bold text-lg">{mission.badge?.name}</p>
                <p className="text-sm text-gray-600">{mission.badge?.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => {
                onComplete(mission.id)
              }}
              size="lg"
              className="w-full text-lg h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:scale-105 transition-all shadow-lg font-bold"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Back to Missions! 🚀
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => {
                setCurrentStage("scenario")
                setQuizIndex(0)
                setSelectedAnswer(null)
                setAnswered(false)
                setShowFunFact(false)
                setCorrectAnswers(0)
              }}
              size="lg"
              variant="outline"
              className="w-full text-lg h-14 border-2 hover:scale-105 transition-all font-bold"
            >
              <Star className="w-5 h-5 mr-2" />
              Play Again! 🔄
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
