import { NextRequest, NextResponse } from "next/server";
import { postRequest } from '../../../utils/request'

export async function POST(request) {
  const payload = request.json();

  const url = "https://open-api.kakaopay.com/online/v1/payment/ready";
  const data = {
    cid: process.env.NEXT_PUBLIC_SINGLE_PAYMENT_CID,
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "테스트",
    quantity: "1",
    total_amount: "2200",
    vat_amount: "200",
    tax_free_amount: "0",
    approval_url: "https://developers.kakao.com/success",
    fail_url: "https://developers.kakao.com/fail",
    cancel_url: "https://developers.kakao.com/cancel",
  };
  const response = await postRequest(url, {
    Authorization: `SECRET_KEY ${process.env.NEXT_PUBLIC_SECRET_KEY_DEV}`,
    "Content-Type": "application/json",
  }, JSON.stringify(data))

  const result = await response;
  console.log(result.data);
  return NextResponse.json(result.data)
  // return result;
}
