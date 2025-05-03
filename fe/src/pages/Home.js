import React from 'react';
import { Container, Stack } from '@mui/material';
import TopPostsCard  from '../components/TopPostsCard';
import BoardPreview  from '../components/BoardPreview';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt:4 }}>
      {/* ── TOP 랭킹 두 카드 ── */}
      <Stack direction={{ xs:'column', md:'row' }} spacing={3} mb={3}>
        <TopPostsCard type="views" />
        <TopPostsCard type="likes" />
      </Stack>

      {/* ── 최신글 카드 두 개 (기존) ── */}
      <Stack direction={{ xs:'column', md:'row' }} spacing={3}>
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
