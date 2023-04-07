import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Container, TextField } from '@mui/material';
import { startMatch, stopMatch, pauseMatch, setPeriod, setSeconds, setMinutes } from '../../features/matchSlice';


function MatchControls(props: any) {
    const dispatch = useDispatch();
    const { isRunning, isPaused, period, seconds, minutes } = useSelector((state: any) => state.matchState);
    // const state = useSelector((state: any) => state.matchState)
    // const [matchTime, setMatchTime] = useState(0); // текущее время матча
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>(null as unknown as NodeJS.Timer); // идентификатор интервала для управления таймером

    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(12);
    const [currentPeriod, setCurrentPeriod] = useState(1);


    useEffect(() => {
        setCurrentPeriod(period);
        setSeconds(seconds);
        setMinutes(minutes);
    }, [])

    const timerHandler = (event: any) => {
        const time = event.target.value;
        if (Number(time) >= 0 && Number(time) < 60) {
            if (event.target.id.includes('minutes')) {
                setCurrentMinutes(time);
            } else {
                setCurrentSeconds(time)
            }
        }
    }

    const periodHandler = (event: any) => {
        const value = event.target.value;
        setCurrentPeriod(value);
        setPeriod(value);
    }


    const handleStartMatch = () => {
        if (!isRunning) {
            let time = Number(currentMinutes) * 60 + Number(currentSeconds);
            if (time > 0) {
                dispatch(startMatch());
                let intervalId: any = setInterval(() => {
                    time -= 1;
                    setCurrentMinutes(Math.floor((time % 3600) / 60));
                    setCurrentSeconds(time % 60);

                    if (time <= 0) {
                        dispatch(stopMatch());
                        return clearTimeout(intervalId);
                    }
                }, 1000);

                setIntervalId(intervalId);
            }
        }
    };

    const handleStopMatch = () => {
        if (isRunning || isPaused) {
            clearInterval(intervalId);
            setCurrentSeconds(0);
            setCurrentMinutes(0);
            dispatch(stopMatch());
        }
    };

    const handlePauseMatch = () => {
        if (isRunning && !isPaused) {
            clearInterval(intervalId);
            dispatch(pauseMatch());
        }
    };


    return (
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '200px' }}>
            <Box sx={{ display: 'flex', alignItems: 'first baseline', gap: '10px' }}>
                <Button
                    variant="contained"
                    onClick={() => handleStartMatch()}>
                    Начать матч
                </Button>
                <Button
                    variant="contained"
                    onClick={() => handleStopMatch()}>
                    Завершить текущий матч
                </Button>
                <Button
                    variant="contained"
                    onClick={() => handlePauseMatch()}>
                    Пауза
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'first baseline', gap: '10px' }}>
                <TextField
                    id="standard-controlled period"
                    label="Период"
                    variant="standard"
                    sx={{ textAlign: 'center', textAlignLast: 'center', width: '75px' }}
                    value={currentPeriod}
                    onChange={periodHandler}
                />
                <TextField
                    id="standard-controlled minutes"
                    label="Мин"
                    variant="standard"
                    sx={{ textAlign: 'center', textAlignLast: 'center', width: '75px' }}
                    value={currentMinutes}
                    onChange={timerHandler}
                />:
                <TextField
                    id="standard-controlled seconds"
                    label="Сек"
                    variant="standard"
                    sx={{ textAlign: 'center', textAlignLast: 'center', width: '75px' }}
                    value={currentSeconds}
                    onChange={timerHandler}
                />
            </Box>
        </Container>
    );
};

export default MatchControls;
