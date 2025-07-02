"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"; // <-- Bu satır düzeltildi!
import { useRouter } from 'next/navigation';
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiLogOut,
  FiUserPlus,
  FiLogIn
} from "react-icons/fi"; 

import { Dialog } from "@headlessui/react";

import { useSession, signOut } from "next-auth/react";

import { client } from "@/sanity/client";
import { getAllCategoriesWithIconsQuery } from "@/sanity/queries";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  iconUrl: string;
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const { getCartItemCount } = useCart();
  const { getFavoriteCount } = useFavorites(); // useFavorites hook'undan favori sayısını al


  useEffect(() => {
    async function fetchCategories() {
      const data = await client.fetch(getAllCategoriesWithIconsQuery);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const cartItemCount = getCartItemCount();
  const favoriteItemCount = getFavoriteCount(); // Favori ürün sayısını al


  const closeUserMenu = () => setIsUserMenuOpen(false);

  return (
    <header className="bg-white shadow-sm relative z-40">
      {/* Üst Bar */}
      <div className="bg-blue-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold text-blue-800">
            <Image
              src='/images/tek_Logo.png'
              alt="Ucuzbezcanta"
              width={120}
              height={40}
              priority
            />
          </Link>

          {/* Arama */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Ürün ara..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                onClick={handleSearch}
              >
                <FiSearch size={20} />
              </button>
            </div>
          </div>

          {/* İkonlar */}
          <div className="flex items-center space-x-4">
            {/* Favori ikonu güncellendi */}
            <Link href="/favorites" className="p-2 text-gray-600 hover:text-blue-600 relative">
              <FiHeart size={20} />
              {favoriteItemCount > 0 && ( // Sadece favori varsa sayıyı göster
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoriteItemCount}
                </span>
              )}
            </Link>
            {/* Sepet ikonu */}
            <Link href="/cart" className="p-2 text-gray-600 hover:text-blue-600 relative">
              <FiShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {/* Kullanıcı İkonu ve Menüsü */}
            <div className="relative">
              <button
                className="p-2 text-gray-600 hover:text-blue-600"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <FiUser size={20} />
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50"
                  onMouseLeave={closeUserMenu} // Fare menünün dışına çıkınca menüyü kapat
                >
                  {loading ? ( // Oturum yükleniyorsa
                    <div className="px-4 py-2 text-sm text-gray-500">Yükleniyor...</div>
                  ) : session ? ( // Kullanıcı giriş yapmışsa
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        Merhaba, {session.user?.name || session.user?.email || "Kullanıcı"}!
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        onClick={() => {closeUserMenu(); setIsMobileMenuOpen(false);}}
                      >
                        <FiUser size={16} className="mr-2" /> Profilim
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        onClick={() => {closeUserMenu(); setIsMobileMenuOpen(false);}}
                      >
                        <FiShoppingCart size={16} className="mr-2" /> Siparişlerim
                      </Link>
                      <button
                        onClick={() => {signOut({ callbackUrl: '/' }); closeUserMenu();}} // Çıkış yap ve anasayfaya yönlendir
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <FiLogOut size={16} className="mr-2" /> Çıkış Yap
                      </button>
                    </>
                  ) : ( // Kullanıcı giriş yapmamışsa
                    <>
                      <Link
                        href="/auth/signin"
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        onClick={() => {closeUserMenu(); setIsMobileMenuOpen(false);}}
                      >
                        <FiLogIn size={16} className="mr-2" /> Giriş Yap
                      </Link>
                      <Link
                        href="/auth/register" // Kayıt sayfası linki (bu sayfayı sizin oluşturmanız gerekecek)
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        onClick={() => {closeUserMenu(); setIsMobileMenuOpen(false);}}
                      >
                        <FiUserPlus size={16} className="mr-2" /> Kayıt Ol
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <button
              className="p-2 text-gray-600 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Alt Navigasyon */}
      <div className="bg-blue-100 hidden md:block">
        <div className="container mx-auto flex items-center justify-between p-0">
          {/* Kategoriler */}
          <div className="relative group">
            <button
              className="flex items-center space-x-2 bg-blue-600 text-white py-3 px-6 hover:bg-blue-700"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              onMouseEnter={() => setIsCategoriesOpen(true)}
            >
              <span>Tüm Kategoriler</span>
              <FiChevronDown size={16} />
            </button>

            {isCategoriesOpen && (
              <div
                className="absolute left-0 top-full w-[800px] bg-white shadow-xl z-50 p-6 grid grid-cols-3 gap-6"
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/category/${cat.slug.current}`}
                      className="flex items-center gap-3 hover:bg-blue-50 p-2 rounded"
                    >
                      {cat.iconUrl && (
                        <Image
                          src={cat.iconUrl}
                          alt={cat.title}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      )}
                      <span className="text-gray-700">{cat.title}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">Kategoriler yükleniyor...</p>
                )}
              </div>
            )}
          </div>

          {/* Menü */}
          <nav className="flex items-center space-x-6 pr-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium py-3">Anasayfa</Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium py-3">Blog</Link>
            <Link href="/hakkimizda" className="text-gray-700 hover:text-blue-600 font-medium py-3">Hakkımızda</Link>
            <Link href="/iletisim" className="text-gray-700 hover:text-blue-600 font-medium py-3">İletişim</Link>
          </nav>
        </div>
      </div>

      {/* MOBİL MENÜ */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Arka plan overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Ana menü içeriği */}
          <div className="relative bg-white z-50 h-[85vh] mt-[15vh] overflow-y-auto overscroll-contain">
            <div className="p-4 bg-blue-50 sticky top-0">
              {/* Arama alanı */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={handleSearch}
                >
                  <FiSearch size={20} />
                </button>
              </div>
            </div>

            {/* Kullanıcı Giriş/Kayıt/Çıkış Mobil Menüde <-- Yeni eklendi */}
            <div className="px-4 py-3 border-b border-t">
              {loading ? (
                <div className="py-2 text-gray-500">Yükleniyor...</div>
              ) : session ? (
                <>
                  <div className="py-2 text-sm text-gray-700">
                    Merhaba, {session.user?.name || session.user?.email || "Kullanıcı"}!
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center py-2 text-gray-800 font-medium"
                    onClick={() => {setIsMobileMenuOpen(false); setIsUserMenuOpen(false);}}
                  >
                    <FiUser size={18} className="mr-2" /> Profilim
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center py-2 text-gray-800 font-medium"
                    onClick={() => {setIsMobileMenuOpen(false); setIsUserMenuOpen(false);}}
                  >
                    <FiShoppingCart size={18} className="mr-2" /> Siparişlerim
                  </Link>
                  <button
                    onClick={() => {signOut({ callbackUrl: '/' }); setIsMobileMenuOpen(false);}}
                    className="w-full text-left flex items-center py-2 text-red-600 font-medium"
                  >
                    <FiLogOut size={18} className="mr-2" /> Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="w-full text-left flex items-center py-2 text-gray-800 font-medium"
                    onClick={() => {setIsMobileMenuOpen(false);}}
                  >
                    <FiLogIn size={18} className="mr-2" /> Giriş Yap
                  </Link>
                  <Link
                    href="/auth/register"
                    className="w-full flex items-center py-2 text-gray-800 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FiUserPlus size={18} className="mr-2" /> Kayıt Ol
                  </Link>
                </>
              )}
            </div>

            {/* Kategoriler Butonu */}
            <div className="border-t px-4">
              <button
                className="w-full flex items-center justify-between py-3 text-gray-800"
                onClick={() => setIsCategoryDialogOpen(true)}
              >
                <span>Tüm Kategoriler</span>
                <FiChevronDown size={16} />
              </button>
            </div>

            {/* Diğer Menü Öğeleri */}
            <nav className="space-y-2 p-4">
              <Link
                href="/"
                className="block py-3 text-gray-800 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Anasayfa
              </Link>
              <Link
                href="/blog"
                className="block py-3 text-gray-800 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/hakkimizda"
                className="block py-3 text-gray-800 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="block py-3 text-gray-800 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İletişim
              </Link>
            </nav>

            {/* Alt İkonlar (Masaüstü ile aynı olması için kaldırılabilir veya sadeleştirilebilir) */}
            {/* Bu kısmı tamamen silebilirsiniz veya sade bırakabilirsiniz */}
            {/* <div className="flex justify-around p-4 border-t bg-blue-50 sticky bottom-0">
              <Link href="/favorites" className="p-2 text-gray-600 relative">
                <FiHeart size={20} />
                {favoriteItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoriteItemCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="p-2 text-gray-600 relative">
                <FiShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button className="p-2 text-gray-600">
                <FiUser size={20} />
              </button>
            </div> */}
          </div>
        </div>
      )}

      {/* MOBİL KATEGORİ DİALOG */}
      <Dialog
        open={isCategoryDialogOpen}
        onClose={() => setIsCategoryDialogOpen(false)}
        className="relative z-[60] md:hidden"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" aria-hidden="true" />
        <div className="fixed inset-0 z-50 flex items-end">
          <Dialog.Panel className="w-full bg-white rounded-t-lg shadow-xl max-h-[80vh] overflow-y-auto overscroll-contain">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <Dialog.Title className="text-xl font-bold text-blue-800">Kategoriler</Dialog.Title>
              <button
                onClick={() => setIsCategoryDialogOpen(false)}
                className="text-gray-600 p-1"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="divide-y">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug.current}`}
                    className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50"
                    onClick={() => {
                      setIsCategoryDialogOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {cat.iconUrl && (
                      <Image
                        src={cat.iconUrl}
                        alt={cat.title}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    )}
                    <span>{cat.title}</span>
                  </Link>
                ))
              ) : (
                <p className="p-4 text-sm text-gray-400">Yükleniyor...</p>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </header>
  );
}