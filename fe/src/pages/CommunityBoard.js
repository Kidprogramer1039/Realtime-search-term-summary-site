import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, TableSortLabel, Typography,
  Stack, Pagination, Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

/* ★ 무조건 8080 포트 붙여서 보낼 BASE URL */
const API = `${window.location.protocol}//${window.location.hostname}:8080`;

/* 헤더 */
const head = [
  { id:'title',     label:'Title'  },
  { id:'writer',    label:'Writer' },
  { id:'createdAt', label:'Date'   },
  { id:'views',     label:'Views', align:'right' },
  { id:'likes',     label:'Likes', align:'right' }
];

/* 정렬 */
const desc = (a,b,o)=> b[o]<a[o]? -1 : b[o]>a[o]? 1 : 0;
const cmp  = (order,by)=> order==='desc'
  ?(a,b)=>desc(a,b,by)
  :(a,b)=>-desc(a,b,by);

export default function CommunityBoard(){
  const nav = useNavigate();
  const [rows,setRows]=useState([]);
  const [order,setOrder]=useState('desc');
  const [orderBy,setOrderBy]=useState('createdAt');
  const [page,setPage]=useState(1);
  const per = 10;

  useEffect(()=>{
    axios.get(`${API}/api/v1/community-posts`)
         .then(r=>{
           const arr = Array.isArray(r.data)?r.data:r.data.payload;
           setRows(arr.map(p=>({
             id:p.id, title:p.title, writer:p.writer,
             createdAt:new Date(p.createdAt).toLocaleString(),
             views:p.views, likes:p.likes
           })));
         })
         .catch(()=>alert('커뮤니티 글 로딩 실패'));
  },[]);

  const sorted = rows.slice().sort(cmp(order,orderBy));
  const shown  = sorted.slice((page-1)*per,page*per);

  return(
    <div style={{position:'relative',paddingBottom:80}}>
      <Typography variant="h4" gutterBottom>커뮤니티 게시판</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {head.map(h=>(
                <TableCell key={h.id} align={h.align||'left'}
                           sortDirection={orderBy===h.id?order:false}>
                  <TableSortLabel
                    active={orderBy===h.id}
                    direction={orderBy===h.id?order:'asc'}
                    onClick={()=>{setOrder(order==='asc'?'desc':'asc');setOrderBy(h.id);}}
                  >{h.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {shown.map(r=>(
              <TableRow key={r.id} hover sx={{cursor:'pointer'}}
                        onClick={()=>nav(`/community/${r.id}`)}>
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

      <Stack sx={{my:2}} alignItems="center">
        <Pagination count={Math.max(1,Math.ceil(rows.length/per))}
                    page={page} onChange={(_,v)=>setPage(v)}/>
      </Stack>

      <Fab color="primary"
           sx={{position:'absolute',bottom:16,right:16}}
           onClick={()=>nav('/community/write')}>
        <AddIcon/>
      </Fab>
    </div>
  );
}
