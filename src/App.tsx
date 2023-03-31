import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement, incrementByAmount } from './features/counterSlice';
import { Button, Typography, Box } from '@mui/material';
import CreateCM from './components/CurrentMatch/CreateCM/CreateCM';
import WatchCM from './components/CurrentMatch/WatchCM/WatchCM';
import MatchResults from './components/MatchResults/MatchResults';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Routes>
        <Route path="/" element={<WatchCM />} />
        <Route path="/create" element={<CreateCM />} />
        <Route path="/results" element={<MatchResults />} />
      </Routes>
    </Box>
  );
}

export default App;
