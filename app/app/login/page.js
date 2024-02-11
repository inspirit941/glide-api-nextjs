"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  /// supabase Client
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  // user sign out / login 등의 이벤트 발생
  supabase.auth.onAuthStateChange(async (event) => {
    console.log(event);
    if (event === "SIGNED_IN") {
      // forward to Success url
      router.push("/success");
    }
  });

  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       // redirect to -> verify email
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   });
  //   router.refresh();
  // };
  // const handleSignIn = async () => {
  //   await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });
  //   router.refresh();
  // };
  // const handleSignWithKakao = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: "kakao",
  //   });
  // };
  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  // };

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["kakao"]}
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      </div>
    </main>
  );
}
