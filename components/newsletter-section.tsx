'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, X } from 'lucide-react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const result = await subscribeToNewsletter(email)

    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      setEmail('')
      setIsModalOpen(true)
    } else {
      setStatus('error')
      setMessage(result.error || 'Failed to subscribe. Please try again.')
      setIsModalOpen(true)
    }
  }

  return (
    <section id="newsletter" className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 bg-card/30">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-center text-balance">stay updated.</h2>
        <p className="text-center text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 px-2">
          Join the rythmk. newsletter to receive new music, exclusive tracks, and updates straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>

        {/* Success Modal */}
        <Dialog open={isModalOpen && status === 'success'} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-black border-2 border-white max-w-[90vw] sm:max-w-lg" style={{ borderRadius: 0 }}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 sm:gap-3 text-white text-base sm:text-lg">
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span>Success!</span>
              </DialogTitle>
              <DialogDescription className="sr-only">
                Newsletter subscription successful
              </DialogDescription>
            </DialogHeader>
            <div className="py-3 sm:py-4">
              <p className="text-white text-sm sm:text-base">{message}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 text-white font-semibold border-2 border-white hover:border-accent hover:text-accent transition-colors text-sm sm:text-base"
              style={{ borderRadius: 0 }}
            >
              Close
            </button>
          </DialogContent>
        </Dialog>

        {/* Error Modal */}
        <Dialog open={isModalOpen && status === 'error'} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-black border-2 border-white max-w-[90vw] sm:max-w-lg" style={{ borderRadius: 0 }}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 sm:gap-3 text-white text-base sm:text-lg">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                <span>Error</span>
              </DialogTitle>
              <DialogDescription className="sr-only">
                Newsletter subscription error
              </DialogDescription>
            </DialogHeader>
            <div className="py-3 sm:py-4">
              <p className="text-white text-sm sm:text-base">{message}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 text-white font-semibold border-2 border-white hover:border-accent hover:text-accent transition-colors text-sm sm:text-base"
              style={{ borderRadius: 0 }}
            >
              Close
            </button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
