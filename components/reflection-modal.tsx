"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Award, Sparkles } from "lucide-react"

type Props = {
  onClose: () => void
}

export default function ReflectionModal({ onClose }: Props) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full" />
              <Award className="w-20 h-20 text-accent relative animate-bounce" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center text-balance">Mission Complete!</DialogTitle>
          <DialogDescription className="text-center leading-relaxed">
            Congratulations! You've earned a new badge and expanded your knowledge of AI in the real world.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">
              Keep exploring more missions to see how AI is transforming different industries and helping solve
              real-world problems!
            </p>
          </div>
        </div>
        <Button onClick={onClose} size="lg" className="w-full">
          Continue Exploring
        </Button>
      </DialogContent>
    </Dialog>
  )
}
