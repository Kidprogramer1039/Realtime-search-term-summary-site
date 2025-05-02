// src/pages/community/CommunityDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Divider, Stack, Button } from '@mui/material';
import axios from 'axios';

/* api 인스턴스 (동일) */
const { protocol, hostname, port } = window.location;
// const API_BASE_URL =
//   port && port !== '8080'
//     ? `${protocol}//${hostname}:8080`
//     : window.location.origin;
const API_BASE_URL = `${protocol}//${hostname}:8080`;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default function CommunityDetail() {
  const { id } = useParams();
  const nav    = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/api/v1/community-posts/${id}`)
       .then(res => {
         const p = res.data.payload || res.data;
         setPost({ ...p, createdAt: new Date(p.createdAt).toLocaleString() });
       })
       .catch(() => { alert('글이 없습니다'); nav('/community'); });
  }, [id, nav]);

  const like = () => {
    api.post(`/api/v1/community-posts/${id}/like`)
       .then(res => setPost(p => ({ ...p, likes: res.data.payload || res.data })));
  };

  if (!post) return null;

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>

      <Stack direction="row" spacing={2}
             divider={<Divider flexItem orientation="vertical" />}
             sx={{ mb: 2, color: 'text.secondary' }}>
        <span>{post.writer}</span>
        <span>{post.createdAt}</span>
        <span>조회 {post.views}</span>
        <span>좋아요 {post.likes}</span>
      </Stack>

      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{post.content}</Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" onClick={like}>좋아요</Button>
        <Button variant="outlined"  onClick={() => nav('/community')}>목록</Button>
      </Stack>
    </Paper>
  );
}
