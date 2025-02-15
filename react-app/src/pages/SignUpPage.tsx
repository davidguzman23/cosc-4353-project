// import { Container, Paper } from "@mui/material";
import React from 'react'

import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { Avatar, FormControlLabel, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox'
import Button from'@mui/material/Button'
import Grid from '@mui/material/Grid2'

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Link from '@mui/material/Link';
import {Link as RouterLink} from "react-router-dom";

const SignUpPage = () => {
  const handleSubmit = () => console.log("login");
    return (


      <Container maxWidth="xs"  sx={{paddingTop: 8}}>
            <Paper elevation={10} sx={{padding: 2}}>
              <Avatar sx={{
                mx: "auto",
                bgcolor: "secondary.main",
                textAlign: "center",
                mb:1,
              }}>
                <LockOutlinedIcon/>

              </Avatar>
              <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>
                Sign Up
              </Typography>
            
             <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:1}}>
              <TextField placeholder="Enter email" fullWidth required autoFocus sx={{mb:2}}/>
              <TextField placeholder="Enter username" fullWidth required autoFocus sx={{mb:2}}/>
              <TextField placeholder="Enter password" fullWidth required type="password"/>
              <FormControlLabel 
                control = {<Checkbox value="remember" color="primary"/>}
                label = "Remember me"
              />
              <Button type="submit" variant="contained" fullWidth sx={{mt:1}}>Sign In </Button>

            </Box>

          </Paper>
        </Container>


    );
};
/*
const Center = () => {
   return (
    //<React.Fragment>
   <Box  sx={{ display: 'flex' ,justifyContent:'center',alignItems:'center', minHeight:'100vh'}} 

        //minHeight="100vh"
      >
        2. tBoxw2 (alignItems and justifyContent)
      </Box>
      //</React.Fragment>

    );

};
*/
export default SignUpPage;