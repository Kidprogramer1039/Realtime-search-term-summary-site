// src/pages/community/CommunityWrite.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Stack, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

/* api 인스턴스 (동일) */
const { protocol, hostname, port } = window.location;
// `const API_BASE_URL =
//   port && port !== '8080'
//     ? `${protocol}//${hostname}:8080`
//     : window.location.origin;`
const API_BASE_URL = `${protocol}//${hostname}:8080`;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default function CommunityWrite() {
  const nav = useNavigate();
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');

  const submit = e => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) { alert('제목/내용 입력'); return; }

    const token = localStorage.getItem('access_token');   // FreeWrite 와 동일 key
    api.post('/api/v1/community-posts',
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => nav('/community'))
    .catch(() => alert('401 - 로그인 토큰 확인'));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>커뮤니티 글쓰기</Typography>

      <Stack spacing={2} component="form" onSubmit={submit}>
        <TextField label="제목" value={title} onChange={e => setTitle(e.target.value)} />
        <TextField label="내용" multiline minRows={10}
                   value={content} onChange={e => setContent(e.target.value)} />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">등록</Button>
          <Button variant="outlined" onClick={() => nav('/community')}>취소</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
