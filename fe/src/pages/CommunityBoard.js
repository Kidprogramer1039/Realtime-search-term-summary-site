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

  return (
    <div>
      {/* 게시판 제목 */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        게임 커뮤니티 게시판
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

export default CommunityBoard;
