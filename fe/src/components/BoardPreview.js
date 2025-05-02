import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {
  Paper, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const { protocol, hostname } = window.location;
const BASE = `${protocol}//${hostname}:8080`;
const api  = axios.create({ baseURL: BASE });

/* 셀 공통 스타일 */
const cellSx = {
  border: 0,
  py: 0.6,
  fontSize: 15,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default function BoardPreview({ title, apiPath, linkBase }) {
  const nav = useNavigate();
  const [rows,setRows]=useState([]);

  useEffect(()=>{
    api.get(apiPath).then(r=>{
      const arr = Array.isArray(r.data)?r.data:r.data.payload;
      setRows(arr.slice(0,10));                 // 10개 출력
    });
  },[apiPath]);

  return(
    <Paper elevation={3} sx={{ width:'100%' }}>
      {/* 헤더 바 */}
      <Box sx={{
        px:2, py:1.2,
        background:'#fafafa',
        borderBottom:'1px solid #e0e0e0'
      }}>
        <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
      </Box>

      {/* 테이블 */}
      <Table size="small" sx={{ tableLayout:'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...cellSx, pl:2, fontWeight:700 }}>제목</TableCell>
            <TableCell sx={{ ...cellSx, width:70, textAlign:'right', pr:2 }}>조회</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r=>(
            <TableRow key={r.id}
                      hover
                      sx={{ cursor:'pointer' }}
                      onClick={()=>nav(`${linkBase}/${r.id}`)}>
              <TableCell sx={{ ...cellSx, pl:2 }}>{r.title}</TableCell>
              <TableCell sx={{ ...cellSx, width:70, textAlign:'right', pr:2 }}>
                {r.views ?? '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
