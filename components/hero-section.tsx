'use client'

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 sm:mb-12 animate-fade-in-up text-balance tracking-tight" style={{ fontFamily: 'Impact, Charcoal, sans-serif' }}>
          rythmk.
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <button
            onClick={() => scrollToSection('about')}
            className="text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('singles')}
            className="text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            MUSIC
          </button>
          <button
            onClick={() => scrollToSection('newsletter')}
            className="text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            NEWSLETTER
          </button>
          <button
            onClick={() => scrollToSection('footer')}
            className="text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            SOCIALS
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="text-muted-foreground text-sm">Scroll to explore</div>
      </div>
    </section>
  )
}
