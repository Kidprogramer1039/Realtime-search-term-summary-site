import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }     from 'react-router-dom';
import axios                           from 'axios';
import {
  Container,
  Paper,
  Typography,
  Stack,
  IconButton,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpIcon   from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';

const { protocol, hostname, port } = window.location;
const API_BASE_URL =
  (port && port !== '8080')
    ? `${protocol}//${hostname}:8080`
    : window.location.origin;

export default function FreeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post,  setPost]  = useState(null);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/v1/posts/${id}`)
      .then(res => {
        const p = res.data.payload;
        setPost(p);
        setViews(p.views);
        setLikes(p.likes);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleLike = () => {
    axios.post(`${API_BASE_URL}/api/v1/posts/${id}/like`)
      .then(res => setLikes(res.data.payload))
      .catch(err => console.error(err));
  };

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>게시글 로딩 중…</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon /> 뒤로
      </IconButton>

      <Paper sx={{ p: 4, mt: 2 }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Typography variant="subtitle2">작성자: {post.writer}</Typography>
          <Typography variant="subtitle2">
            작성일: {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </Stack>

        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 4 }}>
          {post.content}
        </Typography>

        <Stack direction="row" spacing={4} alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <VisibilityIcon /> <Typography>{views}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={handleLike}>
              <ThumbUpIcon />
            </IconButton>
            <Typography>{likes}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => navigate('/free')}>
            목록으로
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
