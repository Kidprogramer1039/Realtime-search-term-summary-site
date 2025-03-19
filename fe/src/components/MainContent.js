import React from 'react';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

function MainContent() {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* 실시간 검색어 */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6">실시간 검색어</Typography>
        <List>
          {['인공지능 (3)', '자동차 보험 (2)', '전기차 충전 (1)', '최신 연구 (0)', '이벤트 정보 (1)'].map((item) => (
            <ListItem key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* 인기 뉴스 */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6">인기 뉴스</Typography>
        <Typography variant="body2">
          인공지능 다음 주 공개되는 것으로 알려져... ↑<br />
          자동차 업계 뒤바뀌나? ↓<br />
          하루종일 트렌딩...
        </Typography>
      </Grid>

      {/* 추천 기사 */}
      <Grid item xs={12}>
        <Typography variant="h6">조광현 님이 좋아할 만한 기사</Typography>
        {[...Array(5)].map((_, index) => (
          <Grid container key={index} spacing={2} sx={{ marginBottom: 1 }}>
            <Grid item xs={2}>
              이미지
            </Grid>
            <Grid item xs={10}>
              지난 주 수요일 평소보다 공장 가동 시간 늘어나... "피곤"
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default MainContent;
