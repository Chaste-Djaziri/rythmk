import { HeroSection } from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import { SinglesSection } from '@/components/singles-section'
import { NewsletterSection } from '@/components/newsletter-section'
import { Footer } from '@/components/footer'

const siteUrl = 'https://rythmk.micorp.pro'

// Structured Data (JSON-LD) for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'rythmk',
  description: 'music. motion. meaning. Electronic artist creating atmospheric and experimental soundscapes.',
  url: siteUrl,
  image: `${siteUrl}/background.jpg`,
  sameAs: [
    'https://www.instagram.com/_rythmk_/',
    'https://www.tiktok.com/@_rythmk_',
    'https://x.com/_rythmk_',
    'https://audiomack.com/rythmk',
    'https://bsky.app/profile/rythmk.bsky.social',
    'https://www.threads.com/@_rythmk_',
    'https://soundcloud.com/rythmk',
    'https://www.youtube.com/@rythmk',
    'https://open.spotify.com/artist/4Kjr9Sr12YxL6ajh4AfR14',
    'https://www.boomplay.com/artists/119766505',
  ],
  email: 'caidenrynna@gmail.com',
  genre: ['Electronic', 'Experimental', 'Atmospheric'],
  foundingLocation: {
    '@type': 'Place',
    name: 'United States',
  },
}

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="bg-background bg-cover bg-fixed bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
        <HeroSection />
        <AboutSection />
        <SinglesSection />
        <NewsletterSection />
        <Footer />
      </main>
    </>
  )
}
