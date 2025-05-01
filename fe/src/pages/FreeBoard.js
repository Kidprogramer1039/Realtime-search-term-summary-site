// src/pages/FreeBoard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  Pagination,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const { protocol, hostname, port } = window.location;
const API_BASE_URL =
  (port && port !== '8080')
    ? `${protocol}//${hostname}:8080`
    : window.location.origin;

const api = axios.create({ baseURL: API_BASE_URL });

const headCells = [
  { id: 'title',     label: 'Title' },
  { id: 'writer',    label: 'Writer' },
  { id: 'createdAt', label: 'Date' },
  { id: 'views',     label: 'Views', align: 'right' },
  { id: 'likes',     label: 'Likes', align: 'right' }
];

export default function FreeBoard() {
  const navigate = useNavigate();
  const [order,   setOrder]   = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [rows,    setRows]    = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  useEffect(() => {
    api.get('/api/v1/posts')
      .then(res => {
        const data = res.data.payload || [];
        setRows(data.map(p => ({
          id:        p.id,
          title:     p.title,
          writer:    p.writer,
          createdAt: new Date(p.createdAt).toLocaleString(),
          views:     p.views ?? 0,
          likes:     p.likes ?? 0
        })));
      })
      .catch(err => console.error(err));
  }, []);

  const handleRequestSort = (_, prop) => {
    const isAsc = orderBy === prop && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(prop);
  };
  const handleChangePage = (_, v) => setPage(v);

  const sorted = rows.slice().sort((a, b) => {
    const cmp = a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
    return order === 'asc' ? cmp : -cmp;
  });
  const paged = sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div style={{ position: 'relative', paddingBottom: 80 }}>
      <Typography variant="h4" gutterBottom>자유 게시판</Typography>

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
            {paged.map(row => (
              <TableRow
                key={row.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/free/${row.id}`)}
              >
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
          showFirstButton showLastButton
        />
      </Stack>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => navigate('/free/write')}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
