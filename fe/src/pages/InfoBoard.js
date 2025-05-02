import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {
  Container, Paper, Typography,
  Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;
const api = axios.create({ baseURL: API_BASE_URL });
api.interceptors.request.use(cfg=>{
  const t = localStorage.getItem('refresh_token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default function InfoBoard(){
  const [rows,setRows]=useState([]);

  useEffect(()=>{
    api.get('/api/v1/ranks/views?limit=10')
       .then(r=>{
         const arr = r.data.payload || r.data;
         setRows(arr);
       });
  },[]);

  return(
    <Container maxWidth="sm" sx={{ mt:4 }}>
      <Paper sx={{ p:3 }}>
        <Typography variant="h5" gutterBottom>👑 조회수 TOP 10</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">순위</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell align="right">전체 조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r,idx)=>(
              <TableRow key={r.writer}>
                <TableCell align="center">{idx+1}</TableCell>
                <TableCell>{r.writer}</TableCell>
                <TableCell align="right">{r.totalViews.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
