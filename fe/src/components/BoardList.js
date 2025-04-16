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
    { id: 1, title: '정보 게시판', path: '/info' },
    { id: 2, title: '자유 게시판', path: '/free' },
    { id: 3, title: '커뮤니티 게시판', path: '/community' }
  ];

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="board-list-content"
        id="board-list-header"
      >
        <Typography variant="subtitle1" fontWeight="bold">
          게시판
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          {boards.map((board) => (
            <ListItem
              key={board.id}
              button
              onClick={() => navigate(board.path)}
              disableGutters
              divider
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
