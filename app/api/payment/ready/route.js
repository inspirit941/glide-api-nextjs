import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const payload = request.json();

  const url = "https://open-api.kakaopay.com/online/v1/payment/ready";
  const data = {
    cid: process.env.SINGLE_PAYMENT_CID,
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "테스트",
    quantity: "1",
    total_amount: "2200",
    vat_amount: "200",
    tax_fee_amount: "0",
    approval_url: "https://developers.kakao.com/success",
    fail_url: "https://developers.kakao.com/fail",
    cancel_url: "https://developers.kakao.com/cancel",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `SECRET_KEY ${process.env.NEXT_PUBLIC_SECRET_KEY_DEV}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
  return result;
}
