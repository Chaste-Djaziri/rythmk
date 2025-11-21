import { MetadataRoute } from 'next'

const siteUrl = 'https://rythmk.micorp.pro'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'rythmk - music. motion. meaning.',
    short_name: 'rythmk',
    description: 'music. motion. meaning. Explore the music of rythmk, an electronic artist creating atmospheric and experimental soundscapes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}

