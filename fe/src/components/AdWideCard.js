// src/components/RankingWideCard.js
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

/**
 * 랭킹 게시판 – 최신/인기 글 와이드 카드
 * GET /ranking/posts?size=6  ← 백엔드 엔드포인트에 맞춰 조정
 * 제목(좌) · 작성자(우)만 표시
 */
export default function RankingWideCard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get('/ranking/posts', { params: { size: 6 } })
      .then((res) => setPosts(res.data))
      .catch((err) =>
        console.error('랭킹 게시판 불러오기 실패', err.response || err)
      );
  }, []);

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title="랭킹 게시판 최신글" />
      <CardContent sx={{ p: 0 }}>
        <List dense>
          {posts.map((p) => (
            <ListItem
              key={p.id}
              disablePadding
              secondaryAction={<Typography>{p.writer}</Typography>}
            >
              <ListItemButton onClick={() => navigate(`/posts/${p.id}`)}>
                <ListItemText primary={p.title} />
              </ListItemButton>
            </ListItem>
          ))}
          {posts.length === 0 && (
            <ListItem>
              <ListItemText primary="등록된 글이 없습니다." />
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
}
