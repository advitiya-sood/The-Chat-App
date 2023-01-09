import styled from '@emotion/styled'
import { MessageSharp } from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/material'
import { border } from '@mui/system'
import { hover } from '@testing-library/user-event/dist/hover'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../Firebase'
import NewRoomModal from './NewRoomModal'




const SideBarChatStyled=styled(Box)`
    display:flex;
    padding:15px;
    border-bottom:2px solid #CCFFCC;
    gap:10px;
    &:hover {
        background-color: #CCFFCC
    }
`



function SidebarChat(props) {

const[seed,setSeed]=useState('')
const[lastMessages,setLastMessages]=useState("")


useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000))

    if (props.id){
      db.collection("Rooms").doc(props.id)
      .collection("messages").orderBy("timestamp", "desc")
      .onSnapshot(snapshot=>
        setLastMessages(snapshot.docs.map((doc=>doc.data())))
      )
    }
},[props.id])


const createNewChat=()=>{ 
  const chatName= prompt("Enter The Name")
  if(chatName){                                            // Add new room
    db.collection("Rooms").add({
      Name:chatName
    })
  }
}

  return (
    props.addNewChat ? 
      (<SideBarChatStyled   onClick={createNewChat}  >
      <Typography variant="h5" sx={{marginLeft:"80px" }} >Add New Chat</Typography>
      </SideBarChatStyled>)
    :
    (<Link style={{  textDecoration:"none" ,color:"black" }} to={`/rooms/${props.id}`}>
       <SideBarChatStyled>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div>
        <Typography fontSize="20px" marginBottom="5px" variant="h5">{props.name}</Typography>
        <Typography color="grey" fontSize="12px">{lastMessages[0]?.message}</Typography>
        </div>
        </SideBarChatStyled> 
      </Link>
    )
  )
}

export default SidebarChat
