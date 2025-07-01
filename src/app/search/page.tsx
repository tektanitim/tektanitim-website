
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from "@/sanity/client"; // Sanity client'ınızın yolu
import { FiSearch } from 'react-icons/fi'; // Arama ikonunu da ekleyelim
import Image from 'next/image'; // Ürün görselleri için
import Link from 'next/link';


type Product = {
    _id: string;
    title: string; // "name" yerine "title" olarak değiştirildi
    slug: string;
    imageUrl: string;
    price: number;
    // ... diğer ürün alanları
};

export default function SearchPage() {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('q'); // URL'den 'q' parametresini oku

    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

        useEffect(() => {
        async function fetchSearchResults() {
            setLoading(true);
            setError(null);
            setResults([]);

            console.log("UYGULAMADAN Aranan Terim (searchTerm):", searchTerm);
            console.log("UYGULAMADAN Router Query:", searchParams.toString());

            if (!searchTerm || searchTerm.trim() === '') {
                setLoading(false);
                setResults([]);
                return;
            }

            try {
                // PARAMETREYİ DÜZELTİYORUZ: Arama teriminin başına ve sonuna joker karakter ekliyoruz
                const searchParamValue = `*${searchTerm.trim()}*`; // Buradaki 'trim()' önemli!
                // Eğer sadece başında eşleşme isterseniz: const searchParamValue = `${searchTerm.trim()}*`;

                const query = `*[_type == "product" && (title match $searchTerm || pt::text(description) match $searchTerm)]{
                    _id,
                    title,
                    "slug": slug.current,
                    "imageUrl": images[0].asset->url,
                    price
                }`;
                
                // Sorguya gönderilen parametre objesini güncelliyoruz
                const data = await client.fetch(query, { searchTerm: searchParamValue }); // Joker karakterli değeri gönderiyoruz
                
                setResults(data);
            } catch (err) {
                console.error("Sanity arama hatası:", err);
                setError("Ürünler aranırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            } finally {
                setLoading(false);
            }
        }
        fetchSearchResults();
    }, [searchTerm]);

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                <FiSearch className="inline-block mr-2 text-blue-600" size={28} />
                Arama Sonuçları: <span className="text-blue-600">"{searchTerm || 'boş'}"</span>
            </h1>

            {loading ? (
                <p className="text-center text-lg text-gray-600 mt-10">Ürünler aranıyor...</p>
            ) : error ? (
                <p className="text-center text-lg text-red-600 mt-10">{error}</p>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map(product => (
                        <Link 
                            key={product._id} 
                            href={`/products/${product.slug}`} // Ürün detay sayfasına yönlendirme
                            className="block border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                        >
                            {product.imageUrl && (
                                <Image
                                    src={product.imageUrl}
                                    alt={product.title}
                                    width={300} // Optimizasyon için genişlik
                                    height={300} // Optimizasyon için yükseklik
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.title}</h2>
                                <p className="text-blue-600 font-bold">{product.price.toFixed(2)} TL</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-600 mt-10">
                    "{searchTerm}" için hiçbir sonuç bulunamadı.
                    <br/>
                    Lütfen farklı bir terimle arama yapmayı deneyin.
                </p>
            )}
        </div>
    );
}