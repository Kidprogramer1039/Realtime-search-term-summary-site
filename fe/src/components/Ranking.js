import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    // 실제 API 대신 mock 데이터 사용
    const mockData = [
      { name: '홍길동' },
      { name: '김철수' },
      { name: '박영희' }
    ];
    setRanking(mockData);
  }, []);

  return (
    <Paper elevation={3} sx={{ marginBottom: '20px' }}>
      <Typography
        variant="subtitle1"
        sx={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '10px',
          fontWeight: 'bold'
        }}
      >
        오늘의 랭킹
      </Typography>
      <List sx={{ padding: 0 }}>
        {ranking.map((user, idx) => (
          <ListItem key={idx} divider sx={{ padding: '10px 16px' }}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Ranking;
