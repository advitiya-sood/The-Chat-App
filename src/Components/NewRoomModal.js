import { Box, Input, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function NewRoomModal() {


    const [open,setOpen]=useState(false)

  return (
    <>
    <Modal  sx={{display:"flex", alignItems:"center",justifyContent:"center"}}
  open={open}
  onClose={()=>setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box textAlign="center" width={400} height={100} p={3} borderRadius={5} bgcolor="#D7DFD5">
    <Typography variant='h5'>Name The Chat</Typography>
    <TextField
          id="outlined"
          variant="filled"
          color="success"
          placeholder="eg. Music"
          sx={{width:"100%" , height:"20px", marginTop:"15px", borderBlockColor:"red"}}
        />
  </Box>
</Modal>
    
    
    </>
  )
}
