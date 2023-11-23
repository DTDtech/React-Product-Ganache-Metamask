import { FormControl, FormLabel, Paper, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    let fData = new FormData();

    const navigate = useNavigate();

    const navigateToProducts = (username) => {
        navigate('/React-Product', {state: {currentUser: username}});
    };


    const checkLogin = async () => {
        await fetch("http://localhost/innovate_recipe/Backend/VerifyLogin.php/", {
            method: 'POST',
            body: fData
        })
            .then((res) => res.json())
            .then(data => {
                if ( data[0] === "Login successful" ) {
                    alert(data[0]);
                    navigateToProducts(data[1]);
                } else {
                    alert(data[0]);
                }
            })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fData.append('Username', username);
        fData.append('Password', password);
        checkLogin();
        fData.delete('Username');
        fData.delete('Password');
    };

    return (
        <Grid container>
            <Grid sx={{ display: 'flex', justifyContent: 'center', my: 'auto' }} xs={12}>
                <Paper elevation={3} sx={{ width: '50%', height: 500, display: "flex", justifyContent: "center", alignItems: "center", my: 13 }}>
                    <Grid container>
                        <Grid xs={12}>
                            <form onSubmit={handleSubmit}>
                                <FormControl sx={{ alignItems: 'center' }}>
                                    <FormLabel>
                                        <Typography variant='h4' sx={{ color: 'text.primary' }} gutterBottom> Login </Typography>
                                    </FormLabel>
                                    <TextField color="primary" margin="dense" size='small' variant='outlined' placeholder='Username' required
                                        onChange={e => setUsername(e.target.value)}
                                    ></TextField>

                                    <TextField color="primary" margin="dense" size='small' variant='outlined' type='password' placeholder='Password' required
                                        onChange={e => setPassword(e.target.value)}
                                    ></TextField>

                                    <Grid container sx={{ width: '100%' }}>
                                        <Grid xs={6} sx={{ display: "flex", justifyContent: "start" }}>
                                            <Button variant='outlined' size='small' sx={{ my: 2 }} disableElevation> Return </Button>
                                        </Grid>
                                        <Grid xs={6} sx={{ display: "flex", justifyContent: "end" }}>
                                            <Button variant='contained' size='small' sx={{ my: 2 }} disableElevation type='submit'> Login </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </form>
                            <Box>
                                <small>Don't have an account? <Link to="/register">Register here</Link></small>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}


