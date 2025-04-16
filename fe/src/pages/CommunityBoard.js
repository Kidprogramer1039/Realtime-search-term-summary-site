import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Typography
} from '@mui/material';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const CommunityBoard = () => {
  // 게임 관련 예시 더미 데이터 (커뮤니티 토론/이벤트)
  const rows = [
    {
      id: 85,
      title: "[토론] FPS 게임에서 전략이 장비보다 중요한 이유는?",
      author: "게이머F",
      date: "2025-04-03",
      views: 789,
      likes: 40
    },
    {
      id: 84,
      title: "[모임] 이번 주말 게임 LAN 파티 참가자 모집",
      author: "게이머G",
      date: "2025-04-02",
      views: 653,
      likes: 30
    },
    {
      id: 83,
      title: "[이벤트] e스포츠 대회 현장 스케치 및 후기",
      author: "게이머H",
      date: "2025-04-01",
      views: 540,
      likes: 35
    },
    {
      id: 82,
      title: "[공지] 커뮤니티 규칙 개정 안내 및 이벤트 소식",
      author: "운영자",
      date: "2025-03-31",
      views: 500,
      likes: 25
    },
    {
      id: 81,
      title: "[추천] 올해 최고의 게임 OST TOP 5",
      author: "게이머I",
      date: "2025-03-30",
      views: 476,
      likes: 29
    }
  ];

  const headCells = [
    { id: 'id', label: '번호', numeric: true },
    { id: 'title', label: '제목', numeric: false },
    { id: 'author', label: '글쓴이', numeric: false },
    { id: 'date', label: '날짜', numeric: false },
    { id: 'views', label: '조회', numeric: true },
    { id: 'likes', label: '추천', numeric: true },
  ];

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = rows.slice().sort(getComparator(order, orderBy));

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        게임 커뮤니티 게시판
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f3f3f3' }}>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sx={{ fontWeight: 'bold' }}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right">{row.views}</TableCell>
                <TableCell align="right">{row.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CommunityBoard;
