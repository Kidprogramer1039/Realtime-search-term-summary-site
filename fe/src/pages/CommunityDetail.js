import React,{useEffect,useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Paper,Typography,Divider,Stack,Button } from '@mui/material';
import axios from 'axios';

export default function CommunityDetail(){
  const {id}=useParams(); const nav=useNavigate();
  const [post,setPost]=useState(null);

  useEffect(()=>{
    axios.get(`/api/v1/community-posts/${id}`)
         .then(r=>{
           const p=r.data.payload||r.data;
           setPost({...p,createdAt:new Date(p.createdAt).toLocaleString()});
         })
         .catch(()=>{alert('글이 없습니다');nav('/community');});
  },[id,nav]);

  const like=()=>{
    axios.post(`/api/v1/community-posts/${id}/like`)
         .then(r=>setPost(p=>({...p,likes:r.data.payload||r.data})));
  };

  if(!post) return null;

  return(
    <Paper sx={{p:3,maxWidth:800,mx:'auto'}}>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Stack direction="row" spacing={2}
             divider={<Divider flexItem orientation="vertical"/>}
             sx={{mb:2,color:'text.secondary'}}>
        <span>{post.writer}</span>
        <span>{post.createdAt}</span>
        <span>조회 {post.views}</span>
        <span>좋아요 {post.likes}</span>
      </Stack>

      <Typography sx={{whiteSpace:'pre-wrap'}}>{post.content}</Typography>

      <Stack direction="row" spacing={2} sx={{mt:3}}>
        <Button variant="contained" onClick={like}>좋아요</Button>
        <Button variant="outlined"  onClick={()=>nav('/community')}>목록</Button>
      </Stack>
    </Paper>
  );
}
