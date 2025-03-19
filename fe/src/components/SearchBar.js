import React from 'react';
import { TextField } from '@mui/material';

function SearchBar() {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label="검색어를 입력하세요."
      sx={{ marginY: 2 }}
    />
  );
}

export default SearchBar;
