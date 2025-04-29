import React from 'react';
import { Grid, Typography, Card, Divider, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 이미지 파일 import
import aiImage from '../tempimg/ai-generated-8016685_1280.jpg';
import carImage from '../tempimg/car-8514314_1280.png';
import unsplashImage from '../tempimg/chuttersnap-xfaYAsMV1p8-unsplash.jpg';
import image2 from '../tempimg/ai-generated-8724363_1280.jpg';
import image5 from '../tempimg/ai-generated-8775213_1280.png';

// Custom theme with blue primary color
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f50b5',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const MainContent = () => {
  const realTimeSearch = [
    '1. 인공지능',
    '2. 자동차 보험',
    '3. 전기차 충전',
    '4. 최신 연구',
    '5. 이벤트 정보',
  ];

  const popularNews = [
    '인공지능 다음 주 공개하는 것으로 알려져... ↑',
    '자동차 업계 뒤바뀌나? ↓',
    '하루종일 트렌딩...',
  ];

  const recommendedArticles = [
    { title: '지난 주 수요일 평소보다 공장 가동 시간 늘어나... "피곤"', views: 1200, image: aiImage },
    { title: '자동차 업계 관련자들은 공장 운영...', views: 900, image: carImage },
    { title: '전기차 충전소 증가로 인해...', views: 700, image: unsplashImage },
    { title: '로또 당첨금 증가..', views: 700, image: image2 },
    { title: '"그런 말 한적 없다" 충격적 실체..', views: 700, image: image5 },
    { title: '아침 드라마 대박나..', views: 700, image: unsplashImage },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <Grid container spacing={3}>
          {/* Real-Time Search Rankings */}
          <Grid item xs={12} md={6}>
            <Card style={{ padding: '20px', border: '1px solid #ddd' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                실시간 검색어 순위
              </Typography>
              <Divider style={{ margin: '10px 0' }} />
              <Box>
                {realTimeSearch.map((item, index) => (
                  <Typography key={index} variant="body1" style={{ marginBottom: '5px' }}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Popular News */}
          <Grid item xs={12} md={6}>
            <Card style={{ padding: '20px', border: '1px solid #ddd' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                인기 뉴스
              </Typography>
              <Divider style={{ margin: '10px 0' }} />
              <Box>
                {popularNews.map((item, index) => (
                  <Typography key={index} variant="body1" style={{ marginBottom: '5px' }}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Recommended Articles */}
          <Grid item xs={12}>
            <Card style={{ padding: '20px', border: '1px solid #ddd' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                김철수 님이 좋아할 만한 기사
              </Typography>
              <Divider style={{ margin: '10px 0' }} />
              {recommendedArticles.map((article, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: index !== recommendedArticles.length - 1 ? '10px' : '',
                    borderBottom:
                      index !== recommendedArticles.length - 1 ? '1px solid #ddd' : '',
                    paddingBottom:
                      index !== recommendedArticles.length - 1 ? '10px' : '',
                  }}
                >
                  {/* 이미지 추가 */}
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#e0e0e0',
                      marginRight: '10px',
                      overflow: 'hidden',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      src={article.image}
                      alt="기사 이미지"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {/* Article details */}
                  <div>
                    <Typography variant="body1">{article.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      조회수: {article.views}
                    </Typography>
                  </div>
                </div>
              ))}
            </Card>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default MainContent;
