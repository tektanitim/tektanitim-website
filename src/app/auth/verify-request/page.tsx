// app/auth/verify-request/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          {/* Buraya logonuzu ekleyebilirsiniz */}
          <Image src="/images/tek_Logo.png" alt="Logo" width={100} height={100} priority />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">E-posta Onayı Gerekli</h2>
        <p className="text-gray-700 mb-6">
          Giriş yapmak için e-posta adresinize gönderdiğimiz sihirli bağlantıya tıklayın.
        </p>
        <p className="text-sm text-gray-600">
          E-posta kutunuzu kontrol edin. Gelen kutusunda bulamazsanız, spam klasörünüze de bakmayı unutmayın.
        </p>
        <Link href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}