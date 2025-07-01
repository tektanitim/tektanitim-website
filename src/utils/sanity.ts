// src/utils/sanity.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types'; // TypeScript için ekledik

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // .env.local'dan gelir
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,     // .env.local'dan gelir
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION, // .env.local'dan gelir (örn: '2023-05-03')
  useCdn: true, // Verileri önbellekten mi yoksa her seferinde mi çekeceğini belirler
});

// Resim URL'lerini oluşturmak için builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}