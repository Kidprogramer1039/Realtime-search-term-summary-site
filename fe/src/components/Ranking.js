import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const mockData = [
      { name: '홍길동' },
      { name: '김철수' },
      { name: '박영희' },
    ];
    setRanking(mockData);
  }, []);

  return (
    <Paper sx={{ width: 240, mb: 2, p: 1 }}>
      <Typography variant="subtitle1" sx={{ backgroundColor: '#333', color: '#fff', p: 1 }}>
        오늘의 랭킹
      </Typography>
      <List sx={{ p: 0 }}>
        {ranking.map((user, idx) => (
          <ListItem key={idx} divider sx={{ py: 1 }}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Ranking;
