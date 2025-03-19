import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#0052cc', color: '#fff' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Section - Title */}
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          실시간 검색어 사이트
        </Typography>

        {/* Right Section - Navigation */}
        <Box style={{ display: 'flex', gap: '15px' }}>
          <Button color="inherit" variant="outlined" style={{ fontWeight: 'bold' }}>김철수 님</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
