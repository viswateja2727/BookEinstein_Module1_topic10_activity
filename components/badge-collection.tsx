import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

type Badge = {
  id: string
  name: string
  description: string
  icon: string
}

type Props = {
  badges: Badge[]
}

export default function BadgeCollection({ badges }: Props) {
  return (
    <Card className="border-4 border-accent bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 shadow-2xl animate-in slide-in-from-top-4 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Award className="w-8 h-8 text-accent animate-bounce" />
          <span>🏆 Your Amazing Badge Collection! 🏆</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-background to-accent/5 rounded-xl border-2 border-accent/30 hover:border-accent hover:scale-110 transition-all shadow-lg hover:shadow-2xl cursor-pointer animate-in zoom-in-95 duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-5xl animate-bounce" style={{ animationDelay: `${idx * 150}ms` }}>
                {badge.icon}
              </div>
              <div className="text-center">
                <p className="font-bold text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
        {badges.length === 6 && (
          <div className="mt-6 text-center p-4 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl border-2 border-accent animate-pulse">
            <p className="text-2xl font-black text-accent">🎊 CONGRATULATIONS! 🎊</p>
            <p className="text-lg mt-2">You collected ALL the badges! You're officially an AI Expert! 🧠✨</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
