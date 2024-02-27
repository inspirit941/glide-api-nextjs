import { NextRequest, NextResponse } from "next/server";
import { postRequest } from '../../../../utils/request'

export async function GET(request) {
    const pg_token = request.nextUrl.searchParams.get("pg_token")
    console.log(pg_token);
    const url = "https://open-api.kakaopay.com/online/v1/payment/approve";
    const data = {
        cid: process.env.NEXT_PUBLIC_SINGLE_PAYMENT_CID,
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        pg_token: pg_token,
    };
    const response = await postRequest(url, {
        Authorization: `SECRET_KEY ${process.env.NEXT_PUBLIC_SECRET_KEY_DEV}`,
        "Content-Type": "application/json",
    }, JSON.stringify(data))

    const result = await response;
    console.log(result.data);
    // 결제 승인 실패
    if (result.status >= 400) {
        console.log("결제 실패!")
        return NextResponse.redirect("/payments/fail")
    } else {
        // 결제 승인 성공
        console.log("결제 성공. DB에 데이터 저장.")
        return NextResponse.redirect("/payments/approve");
    }


    // return result;
}
