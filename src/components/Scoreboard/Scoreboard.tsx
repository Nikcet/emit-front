import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Container } from '@mui/material';
// import { increment, decrement, incrementByAmount } from '../../features/counterSlice';
import { blue, brown } from '@mui/material/colors';

function Scoreboard() {
    // const dispatch = useDispatch();   // хук, который отправляет действия в store
    const firstCommandScore = useSelector((state: any) => state.counter.firstCommandScore);   // хук, который достает state из store
    const secondCommandScore = useSelector((state: any) => state.counter.secondCommandScore);
    const period = useSelector((state: any) => state.counter.period);
    const commands = useSelector((state: any) => state);
    const backColor = blue[300];
    useSelector((state: any) => {
        console.log(state);
    })
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '50%' }}>
            <Box sx={{ backgroundColor: backColor, borderRadius: '15px', padding: '40px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Период {period}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                <Box sx={{ flexGrow: 1, backgroundColor: backColor, borderRadius: '15px', padding: '40px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Команда 1
                    </Typography>
                    <Typography variant="h3" align="center" gutterBottom>
                        {firstCommandScore}
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, backgroundColor: backColor, borderRadius: '15px', padding: '40px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Команда 2
                    </Typography>
                    <Typography variant="h3" align="center" gutterBottom>
                        {secondCommandScore}
                    </Typography>
                </Box>

            </Box>
        </Container>
    )
}

export default Scoreboard;
