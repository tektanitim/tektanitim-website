// app/auth/register/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth"; // NextAuth.js yapılandırma dosyanızın yolu
import Image from "next/image";
import Link from "next/link";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
  if (session) {
    redirect("/");
  }

  // Supabase ile doğrudan kayıt için API route veya client-side fonksiyonu kullanabiliriz.
  // NextAuth.js adaptörü genellikle login akışını yönetir, ama yeni kayıt için
  // NextAuth'ın email provider'ı sadece "signin" (magic link) sağlar, doğrudan şifreli kayıt değil.
  // Bu yüzden buraya manuel bir kayıt formu eklemeliyiz.
  // Basitlik adına, şimdilik sadece bilgilendirme ve giriş sayfasına yönlendirme yapabiliriz.
  // Gerçek bir kayıt için Supabase JS Client'ı kullanarak kayıt API'si oluşturmanız gerekir.

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          {/* Buraya logonuzu ekleyebilirsiniz */}
          <Image src="/images/tek_Logo.png" alt="Logo" width={100} height={100} priority />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Kayıt Ol</h2>
        <p className="text-center text-gray-600 mb-4">
          Şu anda doğrudan şifre ile kayıt seçeneği aktif değildir.{" "}
          Giriş yapmak için e-posta adresinizi kullanarak sihirli bir bağlantı isteyebilirsiniz.
        </p>
        <p className="text-center text-sm text-gray-600 mt-6">
          Zaten bir hesabınız var mı?{" "}
          <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Giriş Yap
          </Link>
        </p>
        {/* Eğer gerçek bir kayıt formu eklemek isterseniz, buraya Supabase JS Client ile bir form ekleyebilirsiniz.
            Örnek:
            <form onSubmit={async (e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement).email.value;
              const password = (e.target as HTMLFormElement).password.value;
              const { data, error } = await supabase.auth.signUp({ email, password });
              if (error) alert(error.message);
              else alert("Kayıt başarılı! Lütfen e-postanızı onaylayın.");
            }} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
                <input id="email" name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                <input id="password" name="password" type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Kayıt Ol</button>
            </form>
        */}
      </div>
    </div>
  );
}