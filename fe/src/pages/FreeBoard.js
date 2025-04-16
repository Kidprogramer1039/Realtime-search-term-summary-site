import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@mui/material';

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

  return (
    <div>
      {/* 게시판 제목 */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        게임 자유 게시판
      </Typography>

      {/* 테이블 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f3f3f3' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>번호</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>제목</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>글쓴이</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>날짜</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>조회</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>추천</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.views}</TableCell>
                <TableCell>{row.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FreeBoard;
