import { NextRequest, NextResponse } from "next/server";
import {getSupabaseClient} from '../../../database/supabase';


export async function POST(request) {
    const client = getSupabaseClient();
    const inserted = await client.from("product").upsert(
        [
            {
                "name" : "test-product-1",
                "price": 2000,
            },
            {
                "name": "test-product-2",
                "price": 3000,
            }
        ], {
            onConflict: "name", ignoreDuplicates: true
        }
    ).select('*');
    // onConflict 를 쓰려면, 명시된 컬럼에 constraint가 있어야 한다. 이 예시의 경우 unique를 추가했음.
    console.log(inserted);
    return NextResponse.json(inserted);
}

export async function GET(request) {
    const client = getSupabaseClient();
    const fetched = await client.from("product").select('*');
    console.log(fetched);
    return NextResponse.json(fetched);
}

