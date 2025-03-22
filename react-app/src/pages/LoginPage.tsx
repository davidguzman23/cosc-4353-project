
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

import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {username, password} = data
    try {
      const {data} = await axios.post('/login',{
        username,
        password
      }
      )
      if(data.error)
      {
        toast.error(data.error)
      }
      else
      {
        Navigate('/EventsManagment');
      }
    }
    catch (error)
    {

    }
  }





  const handleSubmit = () => console.log("login");


    return (


      <Container maxWidth="xs" sx={{paddingTop: 8}}>
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
                Log In
              </Typography>
            
             <Box component="form" onSubmit={loginUser} noValidate sx={{mt:1}}>
              <TextField placeholder="Enter username" fullWidth required autoFocus       value={data.username} onChange={(e) => setData({...data,username: e.target.value})} sx={{mb:2}}/>
              <TextField placeholder="Enter password" fullWidth required type="password" value={data.password} onChange={(e) => setData({...data,password: e.target.value})}/>
              <FormControlLabel 
                control = {<Checkbox value="remember" color="primary"/>}
                label = "Remember me"
              />
              <Button type="submit" variant="contained" fullWidth sx={{mt:1}}>Sign In </Button>

            </Box>
            <Grid container justifyContent='space-between' sx={{mt: 1}}>
              <Grid>
                <Link href="./forgot">
                  Forgot password?
                </Link>
              </Grid>
               <Grid>
                <Link href ="./sign-up-page">
                  Sign Up
                </Link>
              </Grid> 

                
            </Grid> 
          </Paper>
        </Container>


    );
};

export default LoginPage;
