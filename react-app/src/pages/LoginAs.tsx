import React from 'react'

import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { Avatar, CardActionArea, CardContent, FormControlLabel, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox'
import Button from'@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card';

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Link from '@mui/material/Link';
import {Link as RouterLink} from "react-router-dom";
import EngineeringIcon from '@mui/icons-material/Engineering';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

var cardStyle = {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '10vw',
    elevation:9,
    marginTop:20,
}

var cardActionStyle = {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '10vw',
    elevation:9,
    //marginTop:20,
}

const LoginAs = () => {
    return(

        <Container> 

                <Typography component="h1"  variant="h5" sx={{marginTop:4, textAlign:"center"}}>
                    Login As
                </Typography>
        
        <Box
        sx={{
          
          width: '100%',
          display: 'flex',
          justifyContent:'center',
          
          
          //marginBottom :-9,
          //marginRight : 40,
          //justifyContent: 'center',
          //gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
          gap: 2,
        }}
      >

            

                <Card style={cardStyle}/*sx={{ minHeight:'100vh'}} */> 
                    <CardActionArea href="/LoginPage" style ={cardActionStyle}>
                        <CardContent>
                            <Avatar sx={{mx: "auto", textAlign: "center", mb:1}}>
                                <EmojiPeopleIcon/>
                            </Avatar>
                            <Typography component="h1"  variant="h5" sx={{marginTop:4, textAlign:"center"}}>
                                Volunteer
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card style={cardStyle}> 
                    <CardActionArea href="/LoginPage" style ={cardActionStyle}>
                        <CardContent>
                            <Avatar sx={{mx: "auto", textAlign: "center", mb:1, }}>
                                <EngineeringIcon />
                            </Avatar>
                            <Typography component="h1"  variant="h5" sx={{marginTop:4, textAlign:"center"}}>
                                Administrator
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

           

            {/* <Paper elevation={10} sx={{ marginTop:8, padding:2}}>
            <Avatar sx={{mx: "auto", textAlign: "center", mb:1}}>
                    <EngineeringIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
                    Administrator
                </Typography>
            </Paper> */}

        </Box>

        </Container>

        

    );
};

export default LoginAs