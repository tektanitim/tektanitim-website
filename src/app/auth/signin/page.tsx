// app/auth/signin/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth"; // NextAuth.js yapılandırma dosyanızın yolu
import SignInForm from "@/components/auth/SignInForm";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <SignInForm /> {/* Client Component'i burada kullanıyoruz */}
    </div>
  );
}