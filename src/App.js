import { Stack } from "@mui/material";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./Components/LogIn";
import { useState } from "react";
import { useStateValue } from "./StateProvider";


function App() {


const [{user},dispatch]=useStateValue()

  return (
    !user ? (
      <LogIn/>
    ):
    (
      <Router>
        <Stack direction="row">
          <Sidebar/>
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat/>}/>
          </Routes>
        </Stack>
      </Router>
    )
  )
}

export default App;
