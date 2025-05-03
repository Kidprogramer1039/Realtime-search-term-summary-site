import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Card, CardHeader, CardContent,
  Grid, Typography, Table, TableHead,
  TableRow, TableCell, TableBody
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;
const api = axios.create({ baseURL: API_BASE_URL });

export default function Profile() {
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/api/v1/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('refresh_token')}` }
    })
    .then(res => setData(res.data.payload || res.data))
    .catch(() => nav('/login'));
  }, [nav]);

  if (!data) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardHeader title={`${data.username} 님의 프로필`} />
        <CardContent>

          {/* ───────── 통계 ───────── */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={3}>
              <Typography>총 글 수</Typography>
              <Typography variant="h6">{data.postCount}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>총 조회수</Typography>
              <Typography variant="h6">{data.totalViews.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>총 좋아요</Typography>
              <Typography variant="h6">{data.totalLikes.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>총 어그로</Typography>
              <Typography variant="h6">{data.aggroPoints}</Typography>
            </Grid>
          </Grid>

          {/* ───────── 글 목록 ───────── */}
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
              {data.posts.map(p => (
                <TableRow key={`${p.board}-${p.id}`}
                          hover
                          sx={{ cursor: 'pointer' }}
                          onClick={() => nav(`${p.board === 'FREE' ? '/free' : '/community'}/${p.id}`)}>
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
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>
    </Container>
  );
}
