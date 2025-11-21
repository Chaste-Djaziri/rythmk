'use server'

export interface SpotifyTrack {
  id: string
  title: string
  artist: string
  thumbnail_url: string
  embed_html: string
  track_url: string
  duration_ms: number
  album_name?: string
}

// Get Spotify access token (Client Credentials flow for public data)
async function getSpotifyAccessToken(): Promise<string | null> {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error('Spotify credentials not configured')
      return null
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
      next: { revalidate: 3600 } // Cache token for 1 hour
    })

    if (!response.ok) {
      console.error('Failed to get Spotify access token:', response.statusText)
      return null
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Error getting Spotify access token:', error)
    return null
  }
}

// Fetch track by ID
async function fetchSpotifyTrack(trackId: string): Promise<SpotifyTrack | null> {
  try {
    const accessToken = await getSpotifyAccessToken()
    if (!accessToken) {
      return null
    }

    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      console.error('Failed to fetch Spotify track:', response.statusText)
      return null
    }

    const data = await response.json()

    // Construct Spotify embed iframe (dark theme)
    const embedHtml = `<iframe style="border-radius: 12px" src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`

    return {
      id: data.id,
      title: data.name,
      artist: data.artists.map((a: any) => a.name).join(', '),
      thumbnail_url: data.album?.images?.[0]?.url || data.album?.images?.[1]?.url || '',
      embed_html: embedHtml,
      track_url: data.external_urls?.spotify || `https://open.spotify.com/track/${trackId}`,
      duration_ms: data.duration_ms,
      album_name: data.album?.name,
    }
  } catch (error) {
    console.error('Error fetching Spotify track:', error)
    return null
  }
}

// Fetch tracks by artist ID using Get Artist's Albums endpoint
export async function fetchSpotifyArtistTracks(
  artistId: string, 
  limit: number = 10,
  includeGroups: string = 'album,single',
  market: string = 'US'
): Promise<SpotifyTrack[]> {
  try {
    const accessToken = await getSpotifyAccessToken()
    if (!accessToken) {
      return []
    }

    // Get artist's albums using the Get Artist's Albums endpoint
    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=${includeGroups}&market=${market}&limit=50`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        next: { revalidate: 3600 }
      }
    )

    if (!albumsResponse.ok) {
      console.error('Failed to fetch artist albums:', albumsResponse.statusText)
      return []
    }

    const albumsData = await albumsResponse.json()
    
    if (!albumsData.items || albumsData.items.length === 0) {
      return []
    }

    // Get tracks from albums - prioritize singles, then albums
    const allTracks: SpotifyTrack[] = []
    
    // Sort albums: singles first, then albums
    const sortedAlbums = albumsData.items.sort((a: any, b: any) => {
      if (a.album_type === 'single' && b.album_type !== 'single') return -1
      if (a.album_type !== 'single' && b.album_type === 'single') return 1
      return 0
    })

    for (const album of sortedAlbums) {
      const tracksResponse = await fetch(
        `https://api.spotify.com/v1/albums/${album.id}/tracks?market=${market}&limit=50`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          next: { revalidate: 3600 }
        }
      )

      if (tracksResponse.ok) {
        const tracksData = await tracksResponse.json()
        for (const track of tracksData.items) {
          const trackData = await fetchSpotifyTrack(track.id)
          if (trackData) {
            allTracks.push(trackData)
          }
          if (allTracks.length >= limit) break
        }
      }
      if (allTracks.length >= limit) break
    }

    return allTracks.slice(0, limit)
  } catch (error) {
    console.error('Error fetching Spotify artist tracks:', error)
    return []
  }
}

// Fetch tracks by track IDs
export async function fetchSpotifyTracks(trackIds: string[]): Promise<SpotifyTrack[]> {
  const tracks = await Promise.all(
    trackIds.map(id => fetchSpotifyTrack(id))
  )
  return tracks.filter((track): track is SpotifyTrack => track !== null)
}

// Search for tracks (alternative method)
export async function searchSpotifyTracks(query: string, limit: number = 10): Promise<SpotifyTrack[]> {
  try {
    const accessToken = await getSpotifyAccessToken()
    if (!accessToken) {
      return []
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        next: { revalidate: 3600 }
      }
    )

    if (!response.ok) {
      console.error('Failed to search Spotify tracks:', response.statusText)
      return []
    }

    const data = await response.json()
    const trackIds = data.tracks?.items?.map((track: any) => track.id) || []
    
    return fetchSpotifyTracks(trackIds)
  } catch (error) {
    console.error('Error searching Spotify tracks:', error)
    return []
  }
}

