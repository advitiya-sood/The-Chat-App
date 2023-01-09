import { Avatar, Box, IconButton, Input, TextField, Typography } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styled from '@emotion/styled';
import SidebarChat from './SidebarChat';
import { Scrollbars } from 'react-custom-scrollbars';
import { useEffect, useState } from 'react';
import db from '../Firebase';
import NewRoomModal from './NewRoomModal';
import { useStateValue } from '../StateProvider';





function Sidebar() {

 const HeaderBoxStyled=styled(Box)(({theme})=>({
    display:"flex",
    justifyContent:"space-between",
    padding: "15px",
    height:"40px",
    borderRight:"1px solid grey",
    backgroundColor:"#CCFFCC",
    borderBottom:"1px solid grey"
}))

const SearchBoxStyled=styled(Box)(({theme})=>({
    display:"flex", 
    alignItems:"center",
    backgroundColor:"#CCFFCC", 
    padding:"10px",
    gap:"20px",
    borderRadius:"30px",
    margin:"10px"
}))

const[rooms, setRooms]=useState([]);
const [{user},dispatch]=useStateValue();
console.log(user);

useEffect(()=>{                                                           
 const unsubscribe= db.collection("Rooms").onSnapshot((snapshot)=>
  setRooms(
    snapshot.docs.map((doc)=>({
      id:doc.id,
      data:doc.data()
    }))
    ))
    return ()=>{
      unsubscribe();
    };
  },[]);

  return (
    <Box  flex={0.3} >
    <Box  display="flex" flexDirection="column" minHeight="100vh" backgroundColor="#D7DFD5">
      <HeaderBoxStyled>
      <Box sx={{ display:"flex", justifyContent:"space-evenly",alignItems:"center", gap:"12px"}}>
        <Avatar  src={user.photoURL?(user.photoURL):null}/>
        <Typography> {user.displayName} </Typography>
      </Box>
      <Box  sx={{ display:"flex", justifyContent:"space-evenly" ,alignItems:"center"}}  >
        <IconButton><DonutLargeIcon/></IconButton>
        <IconButton><CommentIcon/></IconButton>
        <IconButton><MoreVertIcon/></IconButton>
      </Box>
      </HeaderBoxStyled>

      <SearchBoxStyled >
        <SearchOutlinedIcon sx={{color:"grey"}}/>
        <Input style={{width:"90%", marginRight:"20px"}} placeholder='Search'></Input>
      </SearchBoxStyled>


      <NewRoomModal/>
      <Box  display="flex" flexDirection="column" flex={1} >
        <Scrollbars style={{height:"70vh" }}>
        <SidebarChat  addNewChat/>
        {rooms.map(room=>(
          <SidebarChat  key={room.id} name={room.data.Name} id={room.id}/>
        ))
        }
        </Scrollbars>

      </Box>
    </Box>
    </Box>
  )
}

export default Sidebar
