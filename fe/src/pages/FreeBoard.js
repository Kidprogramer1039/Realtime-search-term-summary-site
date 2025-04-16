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

const FreeBoard = () => {
  // 게임 관련 예시 더미 데이터
  const rows = [
    {
      id: 45,
      title: "신작 RPG '에픽 퀘스트' 리뷰: 스토리와 전투 시스템이 인상적",
      author: "게이머A",
      date: "2025-04-02",
      views: 678,
      likes: 34
    },
    {
      id: 44,
      title: "인디 게임 부활! 최근 주목할만한 소규모 게임들",
      author: "게이머B",
      date: "2025-04-01",
      views: 512,
      likes: 28
    },
    {
      id: 43,
      title: "이번 주 업데이트: 신규 던전과 버그 수정 안내",
      author: "게이머C",
      date: "2025-03-31",
      views: 432,
      likes: 22
    },
    {
      id: 42,
      title: "PvP 모드 꿀팁: 승리하는 전략 공유합니다",
      author: "게이머D",
      date: "2025-03-30",
      views: 390,
      likes: 19
    },
    {
      id: 41,
      title: "게임 커뮤니티 이벤트 후기 및 자유 토론",
      author: "게이머E",
      date: "2025-03-29",
      views: 321,
      likes: 15
    }
  ];

  // 헤더 셀 정의 (id는 실제 데이터의 키값)
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
        게임 자유 게시판
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

export default FreeBoard;
