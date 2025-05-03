import React from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const BoardList = () => {
  const navigate = useNavigate();
  const boards = [
    { id: 1, title: '랭킹', path: '/info' },
    { id: 2, title: '자유 게시판', path: '/free' },
    { id: 3, title: '커뮤니티 게시판', path: '/community' },
    { id: 4, title: '광고 게시판', path: '/ads' }, // 새로 추가
  ];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>게시판</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          {boards.map(board => (
            <ListItem
              key={board.id}
              button
              onClick={() => navigate(board.path)}
              divider
              sx={{ py: 1 }}
            >
              <ListItemText primary={board.title} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default BoardList;
