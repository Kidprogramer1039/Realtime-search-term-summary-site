// src/pages/community/CommunityBoard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, TableSortLabel, Typography,
  Stack, Pagination, Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

/* ───────── api 인스턴스 (FreeBoard 방식 그대로) ───────── */
const { protocol, hostname, port } = window.location;
// const API_BASE_URL =
//   port && port !== '8080'
//     ? `${protocol}//${hostname}:8080`
    // : window.location.origin;
    const API_BASE_URL = `${protocol}//${hostname}:8080`;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/* ───────── 테이블 헤더 정의 ───────── */
const head = [
  { id: 'title',     label: 'Title'  },
  { id: 'writer',    label: 'Writer' },
  { id: 'createdAt', label: 'Date'   },
  { id: 'views',     label: 'Views', align: 'right' },
  { id: 'likes',     label: 'Likes', align: 'right' },
];

/* ───────── 정렬 유틸 ───────── */
const desc = (a, b, o) => (b[o] < a[o] ? -1 : b[o] > a[o] ? 1 : 0);
const getCmp = (order, by) =>
  order === 'desc'
    ? (a, b) => desc(a, b, by)
    : (a, b) => -desc(a, b, by);

export default function CommunityBoard() {
  const nav = useNavigate();
  const [rows,    setRows]    = useState([]);
  const [order,   setOrder]   = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [page,    setPage]    = useState(1);
  const per = 10;

  useEffect(() => {
    api.get('/api/v1/community-posts')
       .then(res => {
         const arr = Array.isArray(res.data) ? res.data : res.data.payload;
         setRows(arr.map(p => ({
           id: p.id,
           title: p.title,
           writer: p.writer,
           createdAt: new Date(p.createdAt).toLocaleString(),
           views: p.views,
           likes: p.likes,
         })));
       });
  }, []);

  const sorted = rows.slice().sort(getCmp(order, orderBy));
  const shown  = sorted.slice((page - 1) * per, page * per);

  return (
    <div style={{ position: 'relative', paddingBottom: 80 }}>
      <Typography variant="h4" gutterBottom>커뮤니티 게시판</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {head.map(h => (
                <TableCell key={h.id} align={h.align || 'left'}
                           sortDirection={orderBy === h.id ? order : false}>
                  <TableSortLabel
                    active={orderBy === h.id}
                    direction={orderBy === h.id ? order : 'asc'}
                    onClick={() => { setOrder(order === 'asc' ? 'desc' : 'asc'); setOrderBy(h.id); }}
                  >
                    {h.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {shown.map(r => (
              <TableRow key={r.id} hover sx={{ cursor: 'pointer' }}
                        onClick={() => nav(`/community/${r.id}`)}>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.writer}</TableCell>
                <TableCell>{r.createdAt}</TableCell>
                <TableCell align="right">{r.views}</TableCell>
                <TableCell align="right">{r.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack sx={{ my: 2 }} alignItems="center">
        <Pagination
          count={Math.max(1, Math.ceil(rows.length / per))}
          page={page}
          onChange={(_, v) => setPage(v)}
        />
      </Stack>

      <Fab color="primary"
           sx={{ position: 'absolute', bottom: 16, right: 16 }}
           onClick={() => nav('/community/write')}>
        <AddIcon />
      </Fab>
    </div>
  );
}
