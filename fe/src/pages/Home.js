import React from 'react';
import { Container, Stack } from '@mui/material';
import BoardPreview from '../components/BoardPreview';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* xs: column, md↑: row → 자동 반응형 */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        alignItems="stretch"
      >
        <BoardPreview
          title="자유 게시판 최신글"
          apiPath="/api/v1/posts"
          linkBase="/free"
          sx={{ flex: 1 }}
        />
        <BoardPreview
          title="커뮤니티 게시판 최신글"
          apiPath="/api/v1/community-posts"
          linkBase="/community"
          sx={{ flex: 1 }}
        />
      </Stack>
    </Container>
  );
}
