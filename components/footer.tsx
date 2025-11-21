'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: 'Instagram', url: 'https://www.instagram.com/_rythmk_/' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@_rythmk_' },
    { label: 'X', url: 'https://x.com/_rythmk_' },
    { label: 'Audiomack', url: 'https://audiomack.com/rythmk' },
    { label: 'Bluesky', url: 'https://bsky.app/profile/rythmk.bsky.social' },
    { label: 'Threads', url: 'https://www.threads.com/@_rythmk_' },
    { label: 'SoundCloud', url: 'https://soundcloud.com/rythmk' },
    { label: 'YouTube', url: 'https://www.youtube.com/@rythmk' },
    { label: 'Spotify', url: 'https://open.spotify.com/artist/4Kjr9Sr12YxL6ajh4AfR14?si=yxknO9KEQaKqwnDXJHLDMg' },
    { label: 'Boomplay', url: 'https://www.boomplay.com/artists/119766505' },
  ]

  return (
    <footer id="footer" className="bg-card/30 border-t border-border py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
          {/* Email */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">Get In Touch</p>
            <a href="mailto:caidenrynna@gmail.com" className="text-base sm:text-lg text-accent hover:text-accent/80 transition-colors break-all">
              caidenrynna@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-white text-foreground hover:border-accent hover:text-accent transition-colors text-xs sm:text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border w-full text-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} rythmk. — All Rights Reserved
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              music. motion. meaning.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
