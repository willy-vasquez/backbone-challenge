import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useContactContext } from '../context/ContactContext';

const Filter = () => {
  const [textFilter, setTextFilter] = useState('');
  const { handleFilter } = useContactContext();
  let shouldFilter = true;

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let text = e.target.value;
    setTextFilter(text);

    if (text.length > 2 && shouldFilter) {
      shouldFilter = true;
      handleFilter(text);
    }
    if (text.length <= 2 && shouldFilter) {
      shouldFilter = false;
      handleFilter('');
    }
  };

  return (
    <Box display="flex" my={2}>
      <TextField
        label="Search by email"
        variant="standard"
        value={textFilter}
        onChange={handleInput}
        sx={{ minWidth: '40vw' }}
      ></TextField>
    </Box>
  );
};

export default Filter;
