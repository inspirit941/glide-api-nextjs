"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {getSupabaseClient} from "@/app/database/supabase";

// 모든 상황의 시작점.
export async function getProducts(){
  const client = getSupabaseClient();
  const data = await client.from("product").select('*');
  return data;
}

export default function Page() {
  const [data, setData] = useState([]);

  // console.log(products.data)
  useEffect(() => {
    const getProductsFromSupabase = async () => {
      const products = await getProducts();
      console.log(products);
      if (products.data) {
        const result = [];
        for (const key in products.data) {
          result.push({
            id: key,
            ...products[key],
          });
          console.log(result)
        }
        setData(result);
      }
    }
    getProductsFromSupabase();
  }, []);
  const handleClick = async (event) => {
    event.preventDefault()
    // todo: 여기서 api 요청보낼 때 param 값 포함하기.
    const res = await fetch(process.env.NEXT_PUBLIC_BASEURL + "/api/payment/kakao/ready", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify(data),
    });
    const toJson = await res.json()
    window.open(toJson.url, "_blank", "toolbar=0,location=0,menubar=0"); // new window (not new tap)
  };

  return (
    <div>
      <button onClick={handleClick}>상품</button>
    </div>
  );
}