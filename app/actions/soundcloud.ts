'use server'

export interface SoundCloudTrack {
  title: string
  artist: string
  thumbnail_url: string
  html: string
  author_name: string
  author_url: string
  track_url: string
}

export async function fetchSoundCloudTrack(trackUrl: string): Promise<SoundCloudTrack | null> {
  try {
    const oembedUrl = `https://soundcloud.com/oembed?url=${encodeURIComponent(trackUrl)}&format=json`
    const response = await fetch(oembedUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      console.error('Failed to fetch SoundCloud track:', response.statusText)
      return null
    }

    const data = await response.json()
    
    // Extract track ID from the oEmbed iframe src
    // The iframe src contains: ...url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2214467768...
    let trackId: string | null = null
    
    // Try to extract from URL-encoded format in HTML
    const encodedMatch = data.html.match(/tracks%2F(\d+)/) || data.html.match(/tracks%252F(\d+)/)
    if (encodedMatch) {
      trackId = encodedMatch[1]
    }
    
    // Try to extract from decoded format
    if (!trackId) {
      const decodedMatch = data.html.match(/tracks\/(\d+)/)
      if (decodedMatch) {
        trackId = decodedMatch[1]
      }
    }
    
    // Fallback: try to extract from the original track URL
    if (!trackId) {
      const urlMatch = trackUrl.match(/tracks\/(\d+)/) || trackUrl.match(/\/(\d+)$/)
      if (urlMatch) {
        trackId = urlMatch[1]
      }
    }

    // Construct compact player iframe with specific parameters
    // Format: https://api.soundcloud.com/tracks/soundcloud:tracks:TRACK_ID
    const trackApiUrl = `https://api.soundcloud.com/tracks/soundcloud:tracks:${trackId || ''}`
    const encodedTrackUrl = encodeURIComponent(trackApiUrl)
    const iframeSrc = `https://w.soundcloud.com/player/?url=${encodedTrackUrl}&color=%23151515&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
    
    const compactPlayerHtml = `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="${iframeSrc}"></iframe>`

    return {
      title: data.title.split(' by ')[0] || data.title,
      artist: data.author_name || 'rythmk',
      thumbnail_url: data.thumbnail_url || '',
      html: compactPlayerHtml,
      author_name: data.author_name,
      author_url: data.author_url,
      track_url: trackUrl,
    }
  } catch (error) {
    console.error('Error fetching SoundCloud track:', error)
    return null
  }
}

export async function fetchSoundCloudTracks(trackUrls: string[]): Promise<SoundCloudTrack[]> {
  const tracks = await Promise.all(
    trackUrls.map(url => fetchSoundCloudTrack(url))
  )
  return tracks.filter((track): track is SoundCloudTrack => track !== null)
}

