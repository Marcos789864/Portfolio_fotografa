import imageUrlBuilder from '@sanity/image-url'
import { client } from './client' // Tu archivo donde configuraste el projectId

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}