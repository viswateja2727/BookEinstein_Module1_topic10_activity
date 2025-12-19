"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sparkles, Star, Trophy, Zap } from "lucide-react"

type Props = {
  onClose: () => void
}

export default function ReflectionModal({ onClose }: Props) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-4 border-accent shadow-2xl">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/40 blur-3xl rounded-full animate-pulse" />
              <div className="relative flex gap-2">
                <Trophy className="w-16 h-16 text-accent animate-bounce" />
                <Star className="w-12 h-12 text-yellow-500 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-6xl mb-2 animate-bounce">🎉</div>
            <DialogTitle className="text-3xl text-center text-balance font-black">MISSION COMPLETE! 🏆</DialogTitle>
            <DialogDescription className="text-center leading-relaxed text-lg">
              <strong>WOW!</strong> You just earned a new badge and became smarter about AI! You're on your way to
              becoming an AI expert! 🌟
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 p-5 rounded-xl border-2 border-accent/30 shadow-inner">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-accent shrink-0 mt-1 animate-pulse" />
            <p className="leading-relaxed font-semibold">
              🚀 Keep going! There are more AWESOME missions waiting for you! Each one teaches you something new about
              how AI is changing the world RIGHT NOW! 💡
            </p>
          </div>
        </div>
        <Button
          onClick={onClose}
          size="lg"
          className="w-full text-lg h-14 bg-gradient-to-r from-accent to-accent/80 hover:scale-105 transition-all shadow-lg font-bold"
        >
          <Zap className="w-5 h-5 mr-2 animate-pulse" />
          Continue My Adventure! 🎮
          <Star className="w-5 h-5 ml-2" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
