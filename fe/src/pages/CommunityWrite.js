import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Paper, Typography,
  TextField, Button, Stack
} from '@mui/material';

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;   // FreeWrite와 동일

/* axios 인스턴스 + 토큰 인터셉터 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('refresh_token');  // FreeWrite와 동일 key
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default function CommunityWrite() {
  const nav = useNavigate();
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');

  const submit = () => {
    console.log('🚀 커뮤니티 글쓰기 시도 →', { title, content });
    api.post('/api/v1/community-posts', { title, content })
       .then(res => {
         console.log('✅ 커뮤니티 글쓰기 성공:', res.data);
         nav('/community');
       })
       .catch(err => {
         console.error('❌ 글쓰기 에러:', err.response || err);
         const msg = err.response?.data?.message
                   || err.response?.statusText
                   || err.message;
         alert(`글 작성 오류: ${msg}`);
       });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          새 커뮤니티 글 작성
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="제목"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            label="내용"
            fullWidth
            multiline rows={10}
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => nav(-1)}>취소</Button>
            <Button variant="contained" onClick={submit}>작성하기</Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
