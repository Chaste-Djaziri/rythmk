export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="min-h-screen flex relative"
      style={{ 
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full flex items-center justify-center relative min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Image Section */}
          <div className="relative group order-2 md:order-1">
            <div className="relative bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 p-4 sm:p-6 md:p-8 hover:border-zinc-600/50 transition-all duration-300" style={{ borderRadius: 0 }}>
              <img
                src="/logo.png"
                alt="rythmk - music. motion. meaning. Electronic artist logo"
                className="w-full h-auto object-contain"
                style={{ borderRadius: 0 }}
                width={800}
                height={800}
              />
            </div>
          </div>

          {/* Bio Content Section */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 order-1 md:order-2">
            {/* Bio Header */}
            <div className="space-y-3">
              <div className="inline-block">
                <span className="text-xs md:text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] border-b-2 border-purple-500 pb-1">
                  Biography
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                rythmk.
              </h2>
            </div>

            {/* Tagline */}
            <div className="relative pl-3 sm:pl-4 border-l-4 border-purple-500">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-relaxed">
                MUSIC. MOTION. MEANING.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed">
                Rythmk is all about turning your words, ideas, and energy into music that feels alive.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed">
                Lyricists bring the heart, AI adds a spark of magic, and together we shape vibes you can actually feel. Whether it’s a story, a mood, or just a moment you want to capture, Rythmk blends human creativity with smart tech to bring your sound to life in a fresh, modern way.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#singles"
                className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-white font-semibold border-2 border-white hover:border-accent hover:text-accent transition-colors text-center"
                style={{ borderRadius: 0 }}
              >
                Explore My Work
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}