import React from 'react';
import './create-cm.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Box, Container, TextField } from '@mui/material';
import {
    firstDecrement,
    firstIncrement,
    firstIncrementByAmount,
    secondDecrement,
    secondIncrement,
    secondIncrementByAmount,
} from '../../features/commandsScoreSlice';


function CreateCM() {
    const dispatch = useDispatch();   // хук, который отправляет действия в store
    const firstCommandScore = useSelector((state: any) => state.counter.firstCommandScore);   // хук, который достает state из store
    const secondCommandScore = useSelector((state: any) => state.counter.secondCommandScore);
    const isGame = useSelector((state: any) => state.isGameReducer.isGame);



    return (
        <>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '200px' }}>
                <Box sx={{display: 'flex', alignItems: 'first baseline', gap: '10px'}}>
                    <Button variant="contained" onClick={() => dispatch(firstDecrement())}>
                        Начать матч
                    </Button>
                    <Button variant="contained" onClick={() => dispatch(firstDecrement())}>
                        Завершить текущий матч
                    </Button>
                    <Button variant="contained" onClick={() => dispatch(firstDecrement())}>
                        Пауза
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'first baseline', gap: '10px' }}>
                    <TextField id="standard-controlled" label="Период" variant="standard" sx={{ textAlign: 'center', textAlignLast: 'center', width: '75px' }} value="1" />
                    <TextField id="standard-controlled" label="Время" variant="standard" sx={{ textAlign: 'center', textAlignLast: 'center', width: '75px' }} value="10" />:
                    <TextField id="standard-controlled" label=" " variant="standard" sx={{ textAlign: 'center', textAlignLast: 'center', width: '75px' }} value="25" />
                </Box>
            </Container>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                        <TextField id="standard-controlled" label="Команда 1" variant="standard" sx={{ textAlign: 'center', textAlignLast: 'center' }} />
                        <TextField id="standard-controlled" label="Счет" variant="standard" type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={firstCommandScore} sx={{ textAlign: 'center', textAlignLast: 'center' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button variant="contained" onClick={() => dispatch(firstDecrement())}>
                            -1
                        </Button>
                        <Button variant="contained" onClick={() => dispatch(firstIncrement())}>
                            +1
                        </Button>
                        <Button variant="contained" onClick={() => dispatch(firstIncrementByAmount(2))}>
                            +2
                        </Button>
                        <Button variant="contained" onClick={() => dispatch(firstIncrementByAmount(3))}>
                            +3
                        </Button>
                    </Box>

                </Container>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                        <TextField id="standard-controlled" label="Команда 2" variant="standard" sx={{ textAlign: 'center', textAlignLast: 'center' }} />
                        <TextField id="standard-controlled" label="Счет" variant="standard" type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={secondCommandScore} sx={{ textAlign: 'center', textAlignLast: 'center' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button variant="contained" onClick={() => dispatch(secondDecrement())}>
                            -1
                        </Button>
                        <Button variant="contained" onClick={() => dispatch(secondIncrement())}>
                            +1
                        </Button>
                        <Button variant="contained" onClick={() => dispatch(secondIncrementByAmount(2))}>
                            +2
                        </Button>
                        <Button variant="contained" onClick={() => dispatch(secondIncrementByAmount(3))}>
                            +3
                        </Button>
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export default CreateCM;