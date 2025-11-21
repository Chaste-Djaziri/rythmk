'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { fetchSpotifyTracks, type SpotifyTrack } from '@/app/actions/spotify'

// Add your Spotify track IDs here
// You can find track IDs in Spotify URLs: https://open.spotify.com/track/TRACK_ID
// Or use artist ID to fetch all tracks: fetchSpotifyArtistTracks(ARTIST_ID)
const SPOTIFY_TRACK_IDS: string[] = [
  // Add your Spotify track IDs here
  // Example: '4iV5W9uYEdYUVa79Axb7Rh', // Replace with your actual track IDs
  // 'another-track-id',
]

// Alternative: Use artist ID to automatically fetch tracks
// Set this if you want to fetch all tracks from an artist
// Find your artist ID from: https://open.spotify.com/artist/ARTIST_ID
const SPOTIFY_ARTIST_ID = '4Kjr9Sr12YxL6ajh4AfR14' // rythmk artist ID

export function SinglesSection() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTracks() {
      setLoading(true)
      try {
        let fetchedTracks: SpotifyTrack[] = []
        
        if (SPOTIFY_ARTIST_ID) {
          // Fetch tracks by artist ID
          const { fetchSpotifyArtistTracks } = await import('@/app/actions/spotify')
          fetchedTracks = await fetchSpotifyArtistTracks(SPOTIFY_ARTIST_ID, 10)
        } else if (SPOTIFY_TRACK_IDS.length > 0) {
          // Fetch tracks by track IDs
          fetchedTracks = await fetchSpotifyTracks(SPOTIFY_TRACK_IDS)
        }
        
        setTracks(fetchedTracks)
      } catch (error) {
        console.error('Error loading tracks:', error)
      } finally {
        setLoading(false)
      }
    }
    loadTracks()
  }, [])


  if (loading) {
    return (
      <section id="singles" className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 sm:mb-12 md:mb-16 text-white uppercase tracking-tight px-2" style={{ fontFamily: 'Impact, Charcoal, sans-serif' }}>
            MUSIC
          </h2>
          <div className="flex items-center justify-center py-12 sm:py-20">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (tracks.length === 0) {
    return (
      <section id="singles" className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 sm:mb-12 md:mb-16 text-white uppercase tracking-tight px-2" style={{ fontFamily: 'Impact, Charcoal, sans-serif' }}>
            MUSIC
          </h2>
          <p className="text-white/60 text-center text-sm sm:text-base">No tracks available</p>
        </div>
      </section>
    )
  }

  return (
    <section id="singles" className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* MUSIC Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 sm:mb-12 md:mb-16 text-white uppercase tracking-tight px-2" style={{ fontFamily: 'Impact, Charcoal, sans-serif' }}>
          MUSIC
        </h2>

        {/* Track Grid - Side by Side Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {tracks.map((track) => (
            <div key={track.id} className="w-full">
              {/* Spotify Player - Only Content */}
              <div 
                dangerouslySetInnerHTML={{ __html: track.embed_html }}
                className="spotify-player"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
