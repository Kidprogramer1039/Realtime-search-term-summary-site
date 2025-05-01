// src/pages/FreeBoard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Typography,
  Stack,
  Pagination
} from '@mui/material';

const { protocol, hostname, port } = window.location;
const API_BASE_URL =
  (port && port !== '8080')
    ? `${protocol}//${hostname}:8080`
    : window.location.origin;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

const headCells = [
  { id: 'title',     label: 'Title' },
  { id: 'writer',    label: 'Writer' },
  { id: 'createdAt', label: 'Date' },
  { id: 'views',     label: 'Views', align: 'right' },
  { id: 'likes',     label: 'Likes', align: 'right' }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, idx) => [el, idx]);
  stabilized.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    return cmp !== 0 ? cmp : a[1] - b[1];
  });
  return stabilized.map(el => el[0]);
}

export default function FreeBoard() {
  console.log('🔥 FreeBoard 렌더', { time: new Date().toLocaleTimeString() });

  const [order,   setOrder]   = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [rows,    setRows]    = useState([]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pageCount   = Math.ceil(rows.length / rowsPerPage);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    console.log('▶︎ API 호출 시작');
    api.get('/api/v1/posts', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    .then(res => {
      console.log('✅ /api/v1/posts 응답 payload:', res.data.payload);
      const data = res.data.payload || [];
      const mapped = data.map(p => ({
        title:     p.title,
        writer:    p.writer,
        createdAt: new Date(p.createdAt).toLocaleString(),
        views:     '-',
        likes:     '-'
      }));
      console.log('→ mapped rows 길이:', mapped.length);
      setRows(mapped);
    })
    .catch(err => {
      console.error('❌ [FreeBoard] API 에러:', err);
    });
  }, []);

  const handleRequestSort = (e, prop) => {
    const isAsc = orderBy === prop && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(prop);
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const sorted = stableSort(rows, getComparator(order, orderBy));
  const pagedRows = sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  console.log({
    rowsLength:      rows.length,
    page,
    rowsPerPage,
    pageCount,
    pagedRowsLength: pagedRows.length
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        자유 게시판
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map(cell => (
                <TableCell
                  key={cell.id}
                  align={cell.align || 'left'}
                  sortDirection={orderBy === cell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === cell.id}
                    direction={orderBy === cell.id ? order : 'asc'}
                    onClick={e => handleRequestSort(e, cell.id)}
                  >
                    {cell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedRows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.writer}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell align="right">{row.views}</TableCell>
                <TableCell align="right">{row.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  );
}
