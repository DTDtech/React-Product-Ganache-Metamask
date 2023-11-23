import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterButton({onChange}) {

  return (
    <Box sx={{ width: '45%', mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="filter">Course Type</InputLabel>
        <Select
          labelId="filter"
          id="filterbutton"
          value=''
          label="Course Type"
          onChange={onChange}
        >
          <MenuItem value={'Appetizer Main Dessert'}>All</MenuItem>
          <MenuItem value={'Appetizer'}>Appetizer</MenuItem>
          <MenuItem value={'Main'}>Main</MenuItem>
          <MenuItem value={'Dessert'}>Dessert</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}