import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Container } from '@mui/material';
import { setPeriod as setPeriodStore, setFirstName as setFirstNameStore, setSecondName as setSecondNameStore } from '../../features/matchSlice';
import { blue } from '@mui/material/colors';
import api from '../../utils/api';

function Scoreboard() {
    const backColor = blue[300];

    const dispatch = useDispatch();

    const commandsScoreStore = useSelector((state: any) => {
        return {
            firstScore: state.matchState.firstCommandScore,
            secondScore: state.matchState.secondCommandScore,
        }
    });
    const periodStore = useSelector((state: any) => state.matchState.period);
    const commandsNamesStore = useSelector((state: any) => {
        return {
            firstName: state.matchState.firstCommandName,
            secondName: state.matchState.secondCommandName,
        }
    });
    const store = useSelector((state: any) => state.matchState)

    const [commandsNames, setCommandsNames] = useState(commandsNamesStore);
    const [commandsScores, setCommandsScores] = useState(commandsScoreStore);
    const [period, setPeriod] = useState(periodStore);
    const [isCurrentMatch, setIsCurrentMatch] = useState(true);


    const loadData = () => {
        api.getMatch()
            .then((match) => {
                if (match) {
                    setCommandsNames({ firstName: match.firstCommand, secondName: match.secondCommand });
                    setCommandsScores({ firstScore: match.firstCommandScore, secondScore: match.secondCommandScore });
                    setPeriod(match.period);
                    setIsCurrentMatch(match.isRunning);
                }
            })
            .catch((err) => console.log(err));
    }

    const saveDatasToStore = () => {
        dispatch(setPeriodStore(period));
        dispatch(setFirstNameStore(commandsNames.firstName));
        dispatch(setSecondNameStore(commandsNames.secondName));
    }

    useEffect(() => {
        loadData();
        setInterval(() => {
            loadData();
        }, 10000);
    }, [])

    useEffect(() => {
        saveDatasToStore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store])

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '50%' }}>
            {!isCurrentMatch ?
                <Box sx={{ backgroundColor: backColor, borderRadius: '15px', padding: '40px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Отсутствуют текущие матчи
                    </Typography>
                </Box>
                :
                <>
                    <Box sx={{ backgroundColor: backColor, borderRadius: '15px', padding: '40px' }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Период {period}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                        <Box sx={{ flexGrow: 1, backgroundColor: backColor, borderRadius: '15px', padding: '40px' }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                {commandsNames.firstName}
                            </Typography>
                            <Typography variant="h3" align="center" gutterBottom>
                                {commandsScores.firstScore}
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, backgroundColor: backColor, borderRadius: '15px', padding: '40px' }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                {commandsNames.secondName}
                            </Typography>
                            <Typography variant="h3" align="center" gutterBottom>
                                {commandsScores.secondScore}
                            </Typography>
                        </Box>
                    </Box>
                </>}
        </Container>
    )
}

export default Scoreboard;
