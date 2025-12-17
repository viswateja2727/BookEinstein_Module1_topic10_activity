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
    <Card className="border-2 border-accent bg-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-6 h-6 text-accent" />
          Your Badge Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-2 p-4 bg-background rounded-lg border border-border hover:border-accent transition-colors"
            >
              <div className="text-4xl">{badge.icon}</div>
              <div className="text-center">
                <p className="font-semibold text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
