import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import {
  Paper, Typography, List, ListItem, ListItemAvatar,
  Avatar, ListItemText, Divider
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

/* ★ 백엔드 포트 고정 */
const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;
const api = axios.create({ baseURL: API_BASE_URL });

const medal = ['#ffd700', '#c0c0c0', '#cd7f32'];   // 금·은·동

export default function Ranking() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get('/api/v1/ranks/views', { params: { limit: 3 } })
       .then(r => setRows(r.data.payload || r.data))
       .catch(console.error);
  }, []);

  return (
    <Paper elevation={2}>
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ px: 2, py: 1.2, bgcolor: 'grey.900', color: '#fff' }}
      >
        오늘의 랭킹
      </Typography>

      <List dense disablePadding>
        {rows.map((r, i) => (
          <Fragment key={r.writer}>
            <ListItem sx={{ pl: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: medal[i], color: '#000' }}>
                  <EmojiEventsIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={r.writer}
                secondary={`${r.totalViews.toLocaleString()} 조회`}
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{ fontSize: 12, color: 'text.secondary' }}
              />
            </ListItem>
            {i < rows.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Paper>
  );
}
