import { FormControl, FormLabel, Paper, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';
import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let fData = new FormData();

    const registerAccount = async () => {
        await fetch("http://localhost/innovate_recipe/Backend/Register.php/", {
            method: 'POST',
            body: fData
        })
            .then((res) => res.json())
            .then((data) => alert(data))
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fData.append('Username', username);
        fData.append('Password', password);
        registerAccount();
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
                                        <Typography variant='h4'sx={{ color: 'text.primary'}} gutterBottom> Register </Typography>
                                    </FormLabel>
                                    <TextField color="primary" margin="dense" size='small' variant='outlined' placeholder='Enter username' required
                                        onChange={e => setUsername(e.target.value)}
                                    ></TextField>

                                    <TextField color="primary" margin="dense" size='small' variant='outlined' type='password' placeholder='Enter password' required
                                        onChange={e => setPassword(e.target.value)}
                                    ></TextField>

                                    <Grid container sx={{ width: '100%' }}>
                                        <Grid xs={6} sx={{ display: "flex", justifyContent: "start" }}>
                                            <Button variant='outlined' size='small' sx={{ my: 2 }} disableElevation> Return </Button>
                                        </Grid>
                                        <Grid xs={6} sx={{ display: "flex", justifyContent: "end" }}>
                                            <Button variant='contained' size='small' sx={{ my: 2 }} disableElevation type='submit'> Register </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}


