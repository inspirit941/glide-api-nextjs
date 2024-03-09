"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSupabaseClient } from "../database/supabase";

// 모든 상황의 시작점.
async function getProducts() {
  const client = getSupabaseClient();
  const data = await client.from("product").select("*");
  return data.data;
}

export default function Page() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({});

  // 페이지 로딩 시 DB에서 값을 가져옴
  useEffect(() => {
    const getProductsFromSupabase = async () => {
      const products = await getProducts();
      if (products.length !== 0) {
        const result = [];
        for (const key in products) {
          result.push({
            id: key,
            ...products[key],
          });
        }
        setProducts(result);
      }
    };
    getProductsFromSupabase();
  }, []);

  const handleClick = async (product) => {
    // todo: 여기서 api 요청보낼 때 param 값 포함하기.
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + "/api/payment/kakao/ready",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    const toJson = await res.json();
    window.open(toJson.url, "_blank", "toolbar=0,location=0,menubar=0"); // new window (not new tap)
  };
  console.log(products);
  return (
    <div>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <h2>Name : {product.name}</h2>
                <p>Price: {product.price}</p>
                {/*<p>Created At: {new Date(product.created_at).toLocaleString()}</p>*/}
                <button onClick={() => handleClick(product)}>구매</button>
              </li>
            );
          })}
        </ul>
      )}
      {/*}*/}
      {/*{data.map(product => {*/}
      {/*  {*/}
      {/*    Object.entries(product).map(([field, value]) => (*/}
      {/*        <div key={field}>*/}
      {/*          <label>{field}: </label>*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            value={formData[product.id]?.[field] || value}*/}
      {/*            readOnly  // Set the input field to be read-only*/}
      {/*            onChange={(e) => handleChange(e, product.id, field)}*/}
      {/*        />*/}
      {/*        <button onClick={() => handleSubmit(product.id, field)}>Submit {field}</button>*/}
      {/*      </div>*/}
      {/*  ))}*/}
      {/*})}*/}
    </div>
  );
}
