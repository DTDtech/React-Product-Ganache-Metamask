import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function SearchBar({onChange}) {
    return (
        <TextField
        fullWidth 
        InputProps={{ sx: 
            { borderRadius: "30px" } 
        }} 
        label="Search for recipe" 
        variant="outlined" 
        onChange={onChange}
        />
    );
}
