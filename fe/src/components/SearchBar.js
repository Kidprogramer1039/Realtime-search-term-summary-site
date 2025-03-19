import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
      <TextField
        label="검색어를 입력하세요"
        variant="outlined"
        style={{ width: '60%', borderRadius: '20px' }}
      />
      <Button variant="contained" style={{ marginLeft: '10px', backgroundColor: '#0052cc', color: '#fff' }}>
        검색
      </Button>
    </Box>
  );
};

export default SearchBar;
