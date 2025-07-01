// components/auth/SignInForm.tsx
"use client"; // Bu bir Client Component

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [providers, setProviders] = useState<Awaited<ReturnType<typeof getProviders>> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("email", { email, callbackUrl: "/" }); // Giriş sonrası ana sayfaya yönlendir
  };

  const emailProvider = providers?.email;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex justify-center mb-6">
        {/* Buraya logonuzu ekleyebilirsiniz */}
        <Image src="/images/tek_Logo.png" alt="Logo" width={100} height={100} priority />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Giriş Yap</h2>

      {emailProvider && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-posta Adresi
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="ornek@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            E-posta ile Giriş Yap
          </button>
        </form>
      )}

      {/* Sosyal medya sağlayıcıları (isteğe bağlı) */}
      {/*
      <div className="mt-6 space-y-3">
        {providers && Object.values(providers).map((provider) => {
          if (provider.id === "email") return null;
          return (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {provider.name} ile Giriş Yap
            </button>
          );
        })}
      </div>
      */}

      <p className="mt-6 text-center text-sm text-gray-600">
        Hesabınız yok mu?{" "}
        <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
}