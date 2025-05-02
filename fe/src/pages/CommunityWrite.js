// src/pages/community/CommunityWrite.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Stack, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

/* 무조건 8080 포트 붙여서 호출 */
const API = `${window.location.protocol}//${window.location.hostname}:8080`;

export default function CommunityWrite() {
  const nav = useNavigate();
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');

  const submit = e => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목/내용 입력');
      return;
    }

    /* ───── JWT 헤더 첨부 (FreeWrite 방식과 동일) ───── */
    const token  = localStorage.getItem('access_token');   // key 이름 FreeWrite 와 맞추세요
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    axios.post(
      `${API}/api/v1/community-posts`,
      { title, content },
      config
    )
    .then(() => nav('/community'))
    .catch(() => alert('401 - 로그인 토큰 확인'));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>커뮤니티 글쓰기</Typography>

      <Stack spacing={2} component="form" onSubmit={submit}>
        <TextField
          label="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          label="내용"
          multiline
          minRows={10}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">등록</Button>
          <Button variant="outlined" onClick={() => nav('/community')}>취소</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
