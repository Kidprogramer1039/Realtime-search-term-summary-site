// src/pages/Home.js
import React from 'react';
import { Container, Stack, Box } from '@mui/material';
import TopPostsCard from '../components/TopPostsCard';
import BoardPreview from '../components/BoardPreview';
import AdBoardPreview from '../components/AdBoardPreview'; // ◯ 올바른 경로

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* ── 광고글 와이드 카드 ── */}
      <Box mb={3}>
      <AdBoardPreview
          title="광고 게시판"
          apiPath="/api/v1/ads"
          showWriter                  // <-- 작성자 표시 옵션 추가
        />
      </Box>

      {/* ── TOP 랭킹 두 카드 ── */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={3}>
        <TopPostsCard type="views" />
        <TopPostsCard type="likes" />
      </Stack>

      {/* ── 최신글 카드 두 개 (기존) ── */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <BoardPreview
          title="자유 게시판 최신글"
          apiPath="/api/v1/posts"
          linkBase="/free"
        />
        <BoardPreview
          title="커뮤니티 게시판 최신글"
          apiPath="/api/v1/community-posts"
          linkBase="/community"
        />
      </Stack>
    </Container>
  );
}
