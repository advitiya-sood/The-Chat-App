import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { auth,googleProvider } from '../Firebase'
import { actionTypes } from '../Reducer'
import { useStateValue } from '../StateProvider'


export default function LogIn() {
const img_link="https://www.pngitem.com/pimgs/m/148-1489651_png-file-svg-chat-room-clip-art-transparent.png"

const [{},dispatch]=useStateValue();


const handleLogin=()=>{
    auth
    .signInWithPopup(googleProvider)
    .then((result)=>{
        dispatch({
            type:actionTypes.SET_USER,
            user:result.user,
        })
    })
    .catch(error=>alert(error.message));
};

return (
 <Box  bgcolor="#D7DFD5"  width="100%" height="100%" display="flex" justifyContent="center">
    <Box border="2px solid #CCFFCC" borderRadius="30px" marginY="15vh" width="400px" height="400px" alignItems="center" justifyContent="center"
     bgcolor="lightGrey" display="flex" gap="30px" flexDirection="column" >
    <Box >
        <img  width="200px" height="200px" src={img_link} />
    </Box>
    <Box >
        <Typography  variant='h5' >Login to Access ChatApp</Typography>
        <Button onClick={handleLogin} variant='contained' sx={{ backgroundColor: "#CCFFCC", color:"grey" , marginY:"20px", marginX:"40px"}} >Login with Google</Button>
    </Box>
    </Box>
 </Box>
    
  )
}
