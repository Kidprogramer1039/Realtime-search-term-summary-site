// src/components/Profile.js  (혹은 src/pages/Profile.js)
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Card, CardHeader, CardContent,
  Grid, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Button
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;

const token = localStorage.getItem("refresh_token") || localStorage.getItem("access_token");
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Authorization: `Bearer ${token}` }
});

export default function Profile() {
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [adCount, setAdCount] = useState(0); // 광고권 개수

  useEffect(() => {
    api.get("/api/v1/profile")
      .then(res => setData(res.data.payload || res.data))
      .catch(() => nav("/login"));

    // 광고권 개수 불러오기
    api.get("/api/v1/shop/purchases/count")
      .then(res => setAdCount(res.data.count))
      .catch(() => setAdCount(0));
  }, [nav]);

  if (!data) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardHeader
          title={`${data.username} 님의 프로필`}
          action={
            <Button component={Link} to="/shop" variant="contained" size="small">
              상점 이동
            </Button>
          }
        />
        <CardContent>

          {/* ───────── 통계 ───────── */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={2}>
              <Typography>총 글 수</Typography>
              <Typography variant="h6">{data.postCount}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>총 조회수</Typography>
              <Typography variant="h6">{data.totalViews.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>총 좋아요</Typography>
              <Typography variant="h6">{data.totalLikes.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>어그로 포인트</Typography>
              <Typography variant="h6">{data.aggroPoints}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>광고권 보유</Typography>
              <Typography variant="h6">{adCount}</Typography>
            </Grid>
          </Grid>

          {/* ───────── 글 목록 ───────── */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>게시판</TableCell>
                <TableCell>제목</TableCell>
                <TableCell align="right">조회</TableCell>
                <TableCell align="right">좋아요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.posts.map(p => (
                <TableRow key={`${p.board}-${p.id}`}
                          hover
                          sx={{ cursor: "pointer" }}
                          onClick={() => nav(`${p.board === "FREE" ? "/free" : "/community"}/${p.id}`)}>
                  <TableCell>{p.board}</TableCell>
                  <TableCell sx={{
                    maxWidth: 300,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {p.title}
                  </TableCell>
                  <TableCell align="right">{p.views}</TableCell>
                  <TableCell align="right">{p.likes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>
    </Container>
  );
}
