import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../database/supabase";

export async function GET(request) {
  const client = getSupabaseClient();
  const fetched = await client.from("product").select("*");
  // console.log(fetched);
  return NextResponse.json(fetched.data);
}
