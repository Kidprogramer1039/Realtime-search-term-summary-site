// fe/src/components/AdWrite.js  (전체)
// ⚠ 수정 포인트: post URL => '/ads'   (중복 방지)
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function AdWrite() {
  const navigate = useNavigate();
  const [count, setCount]   = useState(0);
  const [title, setTitle]   = useState('');
  const [content, setContent] = useState('');

  // 남은 광고권
  useEffect(() => {
    api.get('/shop/purchase/count')
       .then(res => setCount(res.data.count))
       .catch(err => {
         console.error('광고권 조회 실패', err.response || err);
         if (err.response?.status === 401) navigate('/login');
       });
  }, [navigate]);

  const handleSubmit = () => {
    if (!title.trim())   return alert('제목 입력!');
    if (!content.trim()) return alert('내용 입력!');

    api.post('/ads', { title, content })        // ✅ '/ads' 만!
       .then(() => {
         alert('광고 등록 성공');
         navigate('/ads');
       })
       .catch(err => {
         console.error('광고 등록 실패', err.response || err);
         if (err.response?.status === 400) alert(err.response.data.message || '광고권 부족');
         else if (err.response?.status === 401) navigate('/login');
         else   alert('서버 오류');
       });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">광고 쓰기</Typography>
        <Typography>남은 광고권: {count}개</Typography>

        <TextField
          label="광고 제목"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <TextField
          label="광고 내용"
          fullWidth
          multiline
          rows={6}
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          disabled={count < 1}
          onClick={handleSubmit}
        >
          {count < 1 ? '광고권 없음' : '등록하기'}
        </Button>
      </Stack>
    </Container>
  );
}
