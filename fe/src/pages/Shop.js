// src/pages/Shop.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";

// window.location 을 이용해 백엔드 URL을 직접 지정
const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;

// 로그인할 때 저장한 토큰 키에 맞춰 꺼내세요 (refresh_token 혹은 access_token)
const token = localStorage.getItem("refresh_token") || localStorage.getItem("access_token");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Authorization: `Bearer ${token}` }
});

export default function Shop() {
  const [items, setItems] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // 백엔드 포트 8080 으로 요청
    api.get("/api/v1/shop/items")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));

    api.get("/api/v1/shop/points")
      .then(res => setPoints(res.data.points))
      .catch(err => console.error(err));
  }, []);

  const handlePurchase = (id) => {
    api.post("/api/v1/shop/purchase", { itemId: id })
      .then(res => {
        setPoints(res.data.remainingPoints);
        alert("구매 성공!");
      })
      .catch(err => {
        alert(err.response?.data?.message || "구매 실패");
      });
  };

  return (
    <div>
      <Typography variant="h4">Shop</Typography>
      <Typography variant="subtitle1">Your Points: {points}</Typography>
      {items.map(item => (
        <Card key={item.id} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography>{item.description}</Typography>
            <Typography>Cost: {item.cost}</Typography>
            <Button variant="contained" onClick={() => handlePurchase(item.id)}>
              Buy
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
