"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [user, setUser] = useState({});
  const router = useRouter();
  /// supabase Client
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  // 로그인 성공했으니 user 정보를 supabase에서 가져온다.
  // empty []를 파라미터로 넣었으므로, 페이지 최초 로딩 시에만 1번 실행된다.
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        // value.data.user
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    // 로그아웃 -> root 페이지로
    console.log(error);
    router.push("/");
  }

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        {/* User property가 있을 경우에만 동작 */}
        {Object.keys(user).length !== 0 ? (
          <>
            <h1>Success</h1>
            <button onClick={() => signOutUser()}>LogOut</button>
          </>
        ) : (
          <>
            <h1>user is not logged in</h1>
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              Go back
            </button>
          </>
        )}
      </div>
    </main>
  );
}
