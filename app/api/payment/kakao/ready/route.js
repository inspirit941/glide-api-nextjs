import { NextRequest, NextResponse, userAgent } from "next/server";
import { postRequest } from "../../../../utils/request";
import { getSupabaseClient } from "../../../../database/supabase";

export async function POST(request) {
  const payload = await request.json();
  const name = payload.name;
  const price = payload.price;
  const vat_price = payload.price * 0.1;
  let randomStr = Math.random().toString(36).substring(2, 12);
  const partner_order_id = randomStr;
  const url = "https://open-api.kakaopay.com/online/v1/payment/ready";
  const data = {
    cid: process.env.NEXT_PUBLIC_SINGLE_PAYMENT_CID,
    partner_order_id: partner_order_id,
    partner_user_id: "partner_user_id",
    item_name: name,
    quantity: "1",
    total_amount: price + vat_price,
    vat_amount: vat_price,
    tax_free_amount: "0",
    approval_url:
      process.env.NEXT_PUBLIC_BASEURL +
      "/api/payment/kakao/success?partner_order_id=" +
      partner_order_id,
    fail_url: process.env.NEXT_PUBLIC_BASEURL + "/payments/fail",
    cancel_url: process.env.NEXT_PUBLIC_BASEURL + "/payments/cancel",
  };
  const response = await postRequest(
    url,
    {
      Authorization: `SECRET_KEY ${process.env.NEXT_PUBLIC_SECRET_KEY_DEV}`,
      "Content-Type": "application/json",
    },
    JSON.stringify(data)
  );

  const result = await response;
  if (result.status === 200) {
    const tid = result.data.tid;
    console.log(tid);
    const client = getSupabaseClient();
    const insertResult = await client.from("payment").insert({
      tid: result.data.tid,
      type: "kakao",
      partner_order_id: partner_order_id,
    });
    // result struct -> {
    //   error: null,
    //       data: null,
    //     count: null,
    //     status: 201,
    //     statusText: 'Created'
    // }
    // DB에 저장 안되면, fail url을 리턴해줘야 한다
    if (insertResult.status !== 201) {
      console.log(insertResult.error);
      return NextResponse.json({
        url: data.fail_url,
        message:
          "서버가 불안정하여 결제가 실패하였습니다. 관리자에게 문의해주세요.",
      });
    }
  }
  const { device } = userAgent(request);

  // todo: 디바이스 타입별로 next_redirect_url 구분한다.
  return NextResponse.json({
    url: result.data.next_redirect_pc_url,
    message: "request success",
    // "redirect_app_url": result.data.next_redirect_app_url,
    // "redirect_mobile_url": result.data.next_redirect_mobile_url,
  });
}
