import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code"); // supabase callback이 돌려주는 code
  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.exchangeCodeForSession(code); // code 있을 경우, cookie 사용한 session 생성.
  }
  // back to our application -> 로그인 이후 떨어져야 하는 페이지는 여길 바꾸면 된다.
  return NextResponse.redirect(requestUrl.origin + "/success");
}
