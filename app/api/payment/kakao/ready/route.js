import { NextRequest, NextResponse, userAgent } from "next/server";
import { postRequest } from '../../../../utils/request'
import supabase from '../../../../database/supabase'

export async function POST(request) {
  const payload = await request.json();
  console.log(request);
  console.log("payload: " + payload);

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
    approval_url: process.env.NEXT_PUBLIC_BASEURL + "/api/payment/kakao/success",
    fail_url: "https://developers.kakao.com/fail",
    cancel_url: "https://developers.kakao.com/cancel",
  };
  const response = await postRequest(url, {
    Authorization: `SECRET_KEY ${process.env.NEXT_PUBLIC_SECRET_KEY_DEV}`,
    "Content-Type": "application/json",
  }, JSON.stringify(data))

  const result = await response;
  // console.log(result.data);
  // DB에 결제 고유번호 (tid) 를 추가한다.
  // const { inserted , error } = supabase.from("payment").insert({"tid": result.data.tid, "type":"kakao"})

  const {device} = userAgent(request)

  // todo: 디바이스 타입별로 next_redirect_url 구분한다.
  return NextResponse.json({
    "url": result.data.next_redirect_pc_url,
    // "redirect_app_url": result.data.next_redirect_app_url,
    // "redirect_mobile_url": result.data.next_redirect_mobile_url,
  })
  // return result;
}
