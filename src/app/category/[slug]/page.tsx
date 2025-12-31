import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import SortFilter from "@/components/SortFilter";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  slug: { current: string };
};

const productQuery = (slug: string, sort: string) => {
  let sortBy = "";

  switch (sort) {
    case "price-asc":
      sortBy = "| order(price asc)";
      break;
    case "price-desc":
      sortBy = "| order(price desc)";
      break;
    case "newest":
      sortBy = "| order(_createdAt desc)";
      break;
    default:
      sortBy = "";
  }

  return groq`
    *[_type == "product" && category->slug.current == $slug] ${sortBy} {
      _id,
      title,
      price,
      "imageUrl": images[0].asset->url,
      slug
    }
  `;
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>; // searchParams'ı Promise olarak tanımlıyoruz
}) {
  const { slug } = await params; // params'ı asenkron olarak çözüyoruz
  const { sort = "" } = await searchParams; // searchParams'ı asenkron olarak çözüyoruz, varsayılan değer ""
  const products: Product[] = await client.fetch(productQuery(slug, sort), { slug });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold capitalize">{slug} Ürünleri</h1>
        <SortFilter /> {/* ✅ Bu sadece bir client component */}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">Bu kategoriye ait ürün bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id}>
              <div className="border border-gray-100 rounded-lg shadow p-4 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-200">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4"
                  width={600}
                  height={600}
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-blue-600 font-bold">{product.price} TL</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}