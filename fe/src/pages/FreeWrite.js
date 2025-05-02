// src/pages/FreeWrite.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack
} from '@mui/material';

const { protocol, hostname, port } = window.location;
// const API_BASE_URL =
//   (port && port !== '8080')
//     ? `${protocol}//${hostname}:8080`
//     : window.location.origin;
const API_BASE_URL = `${protocol}//${hostname}:8080`; 

// axios 인스턴스 생성 (baseURL + default headers)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
// 요청 인터셉터로 토큰 자동 추가
api.interceptors.request.use(config => {
  const token = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function FreeWrite() {
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('🚀 글쓰기 시도 →', { title, content });
    api.post('/api/v1/posts', { title, content })
      .then(res => {
        console.log('✅ 글쓰기 성공:', res.data);
        navigate('/free');
      })
      .catch(err => {
        // 에러 응답을 최대한 자세히 보여줍니다
        console.error('❌ 글쓰기 중 에러:', err.response || err);
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
          새 게시글 작성
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="제목"
            variant="outlined"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            label="내용"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              취소
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              작성하기
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
