import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Box } from '@mui/material';
import { increment, decrement, incrementByAmount } from '../../../features/counterSlice';

import './watch-cm.css';

function WatchCM() {
    const dispatch = useDispatch();   // хук, который отправляет действия в store
    const count = useSelector((state: any) => state.counter.value);   // хук, который достает state из store
    return (
        <>
            <Typography variant="h1" align="center" gutterBottom>
                {count}
            </Typography>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Button variant="contained" onClick={() => dispatch(decrement())}>
                    -1
                </Button>
                <Button variant="contained" onClick={() => dispatch(increment())}>
                    +1
                </Button>
                <Button variant="contained" onClick={() => dispatch(incrementByAmount(5))}>
                    +5
                </Button>
            </Box>
        </>
    )
}

export default WatchCM;