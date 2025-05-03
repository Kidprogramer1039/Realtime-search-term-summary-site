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
  const [freePosts, setFreePosts] = useState([]);
  const [commPosts, setCommPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');
    if (!token) return nav('/login');
    const headers = { Authorization: `Bearer ${token}` };

    // 한 번에 다 가져와서 setState
    Promise.all([
      api.get('/api/v1/profile',   { headers }),
      api.get('/api/v1/posts',     { headers }),
      api.get('/api/v1/community-posts', { headers })
    ])
      .then(([resProfile, resFree, resComm]) => {
        const data = resProfile.data.payload || resProfile.data;
        setStats(data);

        const freeList = Array.isArray(resFree.data.payload ?? resFree.data)
          ? (resFree.data.payload || resFree.data)
          : [];
        setFreePosts(freeList);

        const commList = Array.isArray(resComm.data.payload ?? resComm.data)
          ? (resComm.data.payload || resComm.data)
          : [];
        setCommPosts(commList);

        // 이제 “내 글만” 걸러내서 myPosts에
        const username = data.username;
        const filtered = [
          ...freeList.filter(p => p.writer === username).map(p => ({ ...p, board: 'FREE' })),
          ...commList.filter(p => p.writer === username).map(p => ({ ...p, board: 'COMMUNITY' }))
        ];
        setMyPosts(filtered);
      })
      .catch(() => nav('/login'));
  }, [nav]);

  if (!stats) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardHeader
          title={`${stats.username} 님의 프로필`}
          action={
            <Button variant="contained" onClick={() => nav('/shop')}>
              상점 이동
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={2}>
              <Typography>총 글 수</Typography>
              <Typography variant="h6">{myPosts.length}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>총 조회수</Typography>
              <Typography variant="h6">
                {myPosts
                  .reduce((sum, p) => sum + (p.views || 0), 0)
                  .toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>총 좋아요</Typography>
              <Typography variant="h6">
                {myPosts
                  .reduce((sum, p) => sum + (p.likes || 0), 0)
                  .toLocaleString()}
              </Typography>
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
              {myPosts.length > 0 ? (
                myPosts.map(p => (
                  <TableRow
                    key={`${p.board}-${p.id}`}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() =>
                      nav(`/${p.board === 'FREE' ? 'free' : 'community'}/${p.id}`)
                    }
                  >
                    <TableCell>{p.board}</TableCell>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    작성한 글이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}
