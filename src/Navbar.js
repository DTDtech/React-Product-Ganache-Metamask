import React from 'react';
import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Box, Toolbar, Typography } from '@mui/material';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import LoginIcon from '@mui/icons-material/Login';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';

export default function Navbar() {
    return (
        <Box>
            <AppBar position='static' color='transparent' elevation={0}>
                <Toolbar disableGutters>
                    <Container maxWidth="xl" sx={{ display:'flex', justifyContent: 'center' }}>

                        <Link to="/React-Product">
                            <Typography variant='h6' sx={{ display: 'inline-flex',  alignItems: "center", mr: 4, color: 'black' }}>
                                <MenuBookSharpIcon fontSize='medium' sx={{ mr: 1 }} />  
                                Products
                            </Typography>
                        </Link>

                        <Link to="/login">
                            <Typography variant='h6' sx={{ display: 'inline-flex', alignItems: "center", mr: 4, color: 'black' }}>
                                <LoginIcon fontSize='medium' sx={{ mr: 1 }} />
                                Login/Register
                            </Typography>
                        </Link>

                        <Link to="/inventory">
                            <Typography variant='h6' sx={{ display: 'inline-flex', alignItems: "center", mr: 4, color: 'black' }}>
                                <Inventory2SharpIcon fontSize='medium' sx={{ mr: 1 }} />
                                Inventory
                            </Typography>
                        </Link>

                    </Container>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
}