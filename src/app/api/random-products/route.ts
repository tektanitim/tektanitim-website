import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
  const query = groq`
  *[_type == "product"] | order(_createdAt desc)[0...20]{
    _id,
    title,
    slug,
    price,
    images[]{
      asset->{
        url
      }
    }
  }
`;
  const allProducts = await client.fetch(query);

  // Rastgele 6 ürün seç
  const randomProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
  return NextResponse.json(randomProducts);
}
