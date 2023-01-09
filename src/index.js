import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducer, { initialState } from './Reducer';
import { StateProvider } from './StateProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Paper>
      <Box bgcolor="#CCFFCC">
        <StateProvider  initialState={initialState}  reducer={reducer}>
          <App />
        </StateProvider>
      </Box>
    </Paper>
  </React.StrictMode>
);

