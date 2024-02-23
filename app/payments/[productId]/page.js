"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// 모든 상황의 시작점.

export default function Page({ params }) {
  const [data, setData] = useState(params.productId);
  const handleClick = async () => {
    await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/payment/ready", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <div>
      <button onClick={handleClick}>상품 {params.productId}번</button>
    </div>
  );
}
