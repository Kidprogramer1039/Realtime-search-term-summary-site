import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {
  Card, CardHeader, CardContent, Table,
  TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from 'react-router-dom';

const { protocol, hostname } = window.location;
const BASE = `${protocol}//${hostname}:8080`;
const api  = axios.create({ baseURL: BASE });

export default function TopPostsCard({ type /* views | likes */ }) {
  const nav   = useNavigate();
  const [rows,setRows] = useState([]);

  const icon  = type==='views' ? <VisibilityIcon sx={{ mr:0.5 }} /> : <ThumbUpAltIcon sx={{ mr:0.5 }} />;
  const title = type==='views' ? '조회수 TOP 3' : '좋아요 TOP 3';

  useEffect(()=>{
    api.get(`/api/v1/top-posts/${type}?limit=3`)
       .then(r=>setRows(r.data.payload || r.data));
  },[type]);

  return (
    <Card elevation={3} sx={{ flex:1 }}>
      <CardHeader title={title} />
      <CardContent sx={{ pt:0 }}>
        <Table size="small" sx={{ tableLayout:'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell sx={{ width:70, textAlign:'right' }}>
                {icon}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r=>(
              <TableRow key={`${r.board}-${r.id}`}
                        hover sx={{ cursor:'pointer' }}
                        onClick={()=>nav(`${r.board==='FREE'?'/free':'/community'}/${r.id}`)}>
                <TableCell sx={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {r.title}
                </TableCell>
                <TableCell sx={{ textAlign:'right' }}>{r.hits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
