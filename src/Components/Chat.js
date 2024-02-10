import styled from '@emotion/styled'
import { Avatar, Box, FormControl, FormControlLabel, IconButton, Input, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import KeyboardVoiceSharpIcon from '@mui/icons-material/KeyboardVoiceSharp';
import { useParams } from 'react-router-dom';
import db from '../Firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase/compat/app';
import Scrollbars from 'react-custom-scrollbars';



const ChatHeaderStyled=styled(Box)`
display:flex;
background-color: #CCFFCC;
gap:20px;
height:40px;
padding:15px;
justify-content:space-between;
align-items:center;
border-bottom:1px solid grey;
`

const ChatAreaStyled=styled(Box)`
display:flex;
flex-direction:column;
flex:1;
padding-left:20px;
padding-top:10px;
background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fzNLdlvi6E3MASevcuXWpOG4r1SWqQpiWQ&usqp=CAU.png");
`

const ChatMessageReceiveStyled=styled(Typography)`
display:flex;
position:relative;
background-color: #99CCFF;
padding:5px;
margin-bottom:15px;
margin-top:20px;
border-radius:10px;
width:fit-content;
`

const ChatMessageSendStyled=styled(Typography)`
display:flex;
position:relative;
background-color: #20DE92;
padding:5px;
margin-bottom:15px;
margin-top:20px;
margin-right:30px;
margin-left:auto;
border-radius:10px;
width:fit-content;
`

const ChatFooterStyled=styled(Box)`
display:flex;
flex-direction:row;
background-color:#CCFFCC;
border-top:1px solid grey;
height:45px;
`

function Chat() {

const [messages, setMessages]=useState([])
const [roomName, setRoomName]=useState("")
const [input,setInput]=useState("")
const[seed,setSeed]=useState('')
const{roomId}=useParams()
const [{user},dispatch]=useStateValue()


useEffect(()=>{
  if (roomId){
    db.collection("Rooms").doc(roomId).onSnapshot(snapshot=>(
      setRoomName(snapshot.data().Name),
      setSeed(Math.floor(Math.random()*5000))
      ))

    db.collection("Rooms")                                                       // firebase realtime database usining long polling and not sockets.
      .doc(roomId).collection("messages")
      .orderBy("timestamp","asc")
      .onSnapshot(snapshot=>setMessages(snapshot.docs.map((doc=>doc.data()))
    ))

  }
},[roomId])


const handleSubmit=(event)=>{
  event.preventDefault()

  db.collection("Rooms").doc(roomId)
  .collection("messages").add({
    message:input,
    name:user.displayName,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
  })
  setInput("")
}



  return (
    <Box flex={0.7}>
    <Box  display="flex" flexDirection="column" minHeight="100vh" >
    <ChatHeaderStyled>
        <Box sx={{display:"flex" , alignItems:"center"}}> 
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <Box sx={{marginLeft:"25px" ,display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
            <Typography >{roomName}</Typography>
            <Typography variant='subtitle2' color="grey" fontSize="12px" >
               Last Seen: {new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}
            </Typography>
        </Box>
        </Box>
        <Box sx={{minWidth:"10px", display:"flex", justifyContent:"space-between"}}>
            <IconButton><VideocamOutlinedIcon/></IconButton> 
            <IconButton><PhoneOutlinedIcon/></IconButton> 
            <IconButton> 
                <SearchOutlinedIcon sx={{ borderLeft:"1px solid grey", paddingLeft:"10px" }}/>
            </IconButton> 
        </Box>
    </ChatHeaderStyled>

    <ChatAreaStyled>
        <Scrollbars style={{height:"78vh"}}>
          { messages.map((message)=>(
            message.name===user.displayName?(<ChatMessageSendStyled>        
                <span style={{ position:"absolute",top:"-15px", fontSize:"10px" ,fontWeight:"500", color:"black" }}>
                  {message.name}</span>
                {message.message}
                <span style={{ display:"flex", position:"relative" , flexDirection:"column",bottom:"-15px", right:"1px", marginLeft:"15px", fontSize:"8px" ,fontWeight:"500", color:"black"}} > 
                <Typography variant='OVERLINE TEXT'>{new Date(message.timestamp?.toDate()).toLocaleTimeString()}</Typography>
                {/* <Typography variant='OVERLINE TEXT'>{new Date(message.timestamp?.toDate()).toLocaleDateString()} </Typography> */}
                </span>
              </ChatMessageSendStyled>)
              :
              (<ChatMessageReceiveStyled>
                <span style={{ position:"absolute",top:"-15px", fontSize:"10px" ,fontWeight:"500", color:"black" }}>{message.name}</span>
                {message.message}
                <span style={{ display:"flex", position:"relative" , flexDirection:"column" ,bottom:"-15px" , right:"1px", marginLeft:"15px", fontSize:"8px" ,fontWeight:"500", color:"black"}} > 
              <Typography variant='OVERLINE TEXT'>{new Date(message.timestamp?.toDate()).toLocaleTimeString()}</Typography>
              {/* <Typography variant='OVERLINE TEXT'>{new Date(message.timestamp?.toDate()).toLocaleDateString()} </Typography> */}
      
                </span>
              </ChatMessageReceiveStyled>)
              ))
            }
        </Scrollbars>
    </ChatAreaStyled>

    <ChatFooterStyled>
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <IconButton><SentimentSatisfiedOutlinedIcon/></IconButton>
          <IconButton><AttachFileOutlinedIcon/></IconButton>
        </Box>

        <form onSubmit={handleSubmit}
        style={{marginLeft:"20px",
                width:"82%",
                backgroundColor:"#CCFFCC",
                padding:"3px",
                 }}>

          <Input onChange={(event)=>setInput(event.target.value)}
                  value={input}
                  type="text"
                  placeholder='Type A Message' 
                  sx={{width:"100%"}}
                  />    
        </form>

        <Box  sx={{display:"flex", justifyContent:"center", marginLeft:"10px"}}>
          <IconButton><KeyboardVoiceSharpIcon/></IconButton>
        </Box>
    </ChatFooterStyled>
    </Box>
    </Box>
  )
}

export default Chat
