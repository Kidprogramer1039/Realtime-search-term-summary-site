import React, { useEffect, useState } from 'react';
import { getAdsList } from '../api/adsApi';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdsBoard() {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const list = await getAdsList();
        // 조회수·좋아요 순정렬 후 최대 5개
        list.sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
        setAds(list.slice(0, 5));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: 16 }}>
        <Typography variant="h5">광고 게시판 Top 5</Typography>
        <Button variant="contained" onClick={() => navigate('/ads/write')}>
          새 광고글 쓰기
        </Button>
      </Grid>

      <Grid container spacing={2}>
        {ads.length === 0 && (
          <Typography>등록된 광고글이 없습니다.</Typography>
        )}
        {ads.map(ad => (
          <Grid key={ad.id} item xs={12}>
            <Card>
              <CardContent>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">{ad.title}</Typography>
                  <Typography variant="body2">
                    {ad.views} 조회 · {ad.likes} 좋아요
                  </Typography>
                </Grid>
                <Typography variant="body2" color="textSecondary">
                  작성자: {ad.writer} | {new Date(ad.createdAt).toLocaleString()}
                </Typography>
                <Typography style={{ marginTop: 8 }}>{ad.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
