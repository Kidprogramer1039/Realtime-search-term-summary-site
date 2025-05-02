import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paper, Typography, List, ListItem, Stack,
  Avatar, ListItemText
} from '@mui/material';

const { protocol, hostname } = window.location;
const BASE = `${protocol}//${hostname}:8080`;
const api  = axios.create({ baseURL: BASE });

export default function RankingTop3() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get('/api/v1/ranks/views?limit=3')
       .then(r => setRows(r.data.payload || r.data))
       .catch(console.error);
  }, []);

  const medal = ['#ffd700', '#c0c0c0', '#cd7f32']; // 금·은·동

  return (
    <Paper elevation={2}>
      {/* 헤더 */}
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ px: 2, py: 1.2, bgcolor: 'grey.900', color: '#fff' }}
      >
        오늘의 랭킹
      </Typography>

      {/* 목록 */}
      <List disablePadding>
        {rows.map((r, i) => (
          <ListItem key={r.writer} divider sx={{ pl: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: medal[i],
                  width: 26,
                  height: 26,
                  fontSize: 14,
                  color: '#000'
                }}
              >
                {i + 1}
              </Avatar>
              <ListItemText
                primary={r.writer}
                secondary={`${r.totalViews.toLocaleString()} 조회`}
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{
                  fontSize: 12,
                  color: 'text.secondary'
                }}
              />
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
