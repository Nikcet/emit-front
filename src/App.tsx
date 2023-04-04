import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement, incrementByAmount } from './features/counterSlice';
import { Button, Typography, Box } from '@mui/material';
import CreateCM from './components/CreateCM/CreateCM';
import Scoreboard from './components/Scoreboard/Scoreboard';
import MatchResults from './components/MatchResults/MatchResults';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginTop: '2rem' }}>
      <Routes>
        <Route path="/" element={<Scoreboard />} />
        <Route path="/create" element={<CreateCM />} />
        <Route path="/results" element={<MatchResults />} />
      </Routes>
    </Box>
  );
}

export default App;
