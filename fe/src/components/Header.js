import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          실시간 검색어 사이트
        </Typography>
        <Typography variant="body1">조광현 님</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
