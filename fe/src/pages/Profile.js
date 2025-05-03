// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;
const api = axios.create({ baseURL: API_BASE_URL });

export default function Profile() {
  const nav = useNavigate();
  const [stats, setStats] = useState(null);
  const [posts, setPosts] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');
    if (!token) {
      nav('/login');
      return;
    }

    // 1) 프로필 통계 (username, postCount, totalViews, totalLikes, aggroPoints, adCount)
    api.get('/api/v1/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const data = res.data.payload || res.data;
      setStats(data);
    })
    .catch(() => nav('/login'));

    // 2) 자유게시판 글 목록
    api.get('/api/v1/posts')
      .then(res => {
        const list = res.data.payload || [];
        setPosts(Array.isArray(list) ? list : []);
      })
      .catch(() => setPosts([]));

    // 3) 커뮤니티게시판 글 목록
    api.get('/api/v1/community-posts')
      .then(res => {
        const list = res.data.payload || [];
        setCommunityPosts(Array.isArray(list) ? list : []);
      })
      .catch(() => setCommunityPosts([]));
  }, [nav]);

  if (!stats) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardHeader
          title={`${stats.username} 님의 프로필`}
          action={
            <Button
              variant="contained"
              onClick={() => nav('/shop')}
            >
              상점 이동
            </Button>
          }
        />
        <CardContent>
          {/* ───────── 통계 ───────── */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={2}>
              <Typography>총 글 수</Typography>
              <Typography variant="h6">{stats.postCount}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>총 조회수</Typography>
              <Typography variant="h6">{stats.totalViews.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>총 좋아요</Typography>
              <Typography variant="h6">{stats.totalLikes.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>어그로 포인트</Typography>
              <Typography variant="h6">{stats.aggroPoints}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>광고권 보유</Typography>
              <Typography variant="h6">{stats.adCount}</Typography>
            </Grid>
          </Grid>

          {/* ───────── 글 목록 ───────── */}
          <Typography variant="subtitle1" gutterBottom>
            게시판
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>게시판</TableCell>
                <TableCell>제목</TableCell>
                <TableCell align="right">조회</TableCell>
                <TableCell align="right">좋아요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map(p => (
                <TableRow
                  key={`FREE-${p.id}`}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/free/${p.id}`)}
                >
                  <TableCell>FREE</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {p.title}
                  </TableCell>
                  <TableCell align="right">{p.views}</TableCell>
                  <TableCell align="right">{p.likes}</TableCell>
                </TableRow>
              ))}
              {communityPosts.map(p => (
                <TableRow
                  key={`COMMUNITY-${p.id}`}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/community/${p.id}`)}
                >
                  <TableCell>COMMUNITY</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {p.title}
                  </TableCell>
                  <TableCell align="right">{p.views}</TableCell>
                  <TableCell align="right">{p.likes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}
