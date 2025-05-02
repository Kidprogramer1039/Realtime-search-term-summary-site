import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card, CardHeader, CardContent, CardActions,
  Typography, IconButton, Divider, Stack, Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;
const api = axios.create({ baseURL: API_BASE_URL });

export default function FreeDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);

  /* ───────── 데이터 로드 ───────── */
  useEffect(() => {
    api.get(`/api/v1/posts/${id}`)
       .then(r => {
         const p = r.data.payload || r.data;
         setPost({ ...p, createdAt: new Date(p.createdAt).toLocaleString() });
       })
       .catch(() => nav(-1));
  }, [id, nav]);

  /* 좋아요 */
  const handleLike = () => {
    api.post(`/api/v1/posts/${id}/like`).then(() => {
      setPost(p => ({ ...p, likes: (p.likes ?? 0) + 1 }));
    });
  };

  if (!post) return null;

  /* ───────── UI ───────── */
  return (
    <Card sx={{ maxWidth: '100%', p: 0, mt: 3 }}>
      {/* 제목 · 메타 */}
      <CardHeader
        title={<Typography variant="h4" fontWeight={700}>{post.title}</Typography>}
        subheader={
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider flexItem orientation="vertical" />}
            sx={{ mt: 0.5 }}
          >
            <span>{post.writer}</span>
            <span>{post.createdAt}</span>
            <Stack direction="row" spacing={0.5}>
              <VisibilityIcon fontSize="small" />
              {post.views}
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <ThumbUpAltIcon fontSize="small" />
              {post.likes}
            </Stack>
          </Stack>
        }
        sx={{ pb: 1 }}
      />
      <Divider />

      {/* 본문 */}
      <CardContent sx={{ py: 3 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>
      </CardContent>

      {/* 액션 버튼 */}
      <CardActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          variant="outlined"
          onClick={() => nav('/free')}
        >
          목록으로
        </Button>
        <Button
          startIcon={<ThumbUpAltIcon />}
          variant="contained"
          onClick={handleLike}
        >
          좋아요&nbsp;{post.likes}
        </Button>
      </CardActions>
    </Card>
  );
}
