import { useState, useEffect } from 'react';
import './create-cm.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Container, TextField } from '@mui/material';
import {
    firstDecrement,
    firstIncrement,
    firstIncrementByAmount,
    secondDecrement,
    secondIncrement,
    secondIncrementByAmount,
    setMatch as setMatchStore,
    setPeriod
} from '../../features/matchSlice';
import MatchControls from '../MatchControlls/MatchControlls';
import api from '../../utils/api';


function CreateCM() {
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

    const isCurrentMatchStore = useSelector((state: any) => state.matchState.isRunning);

    const store = useSelector((state: any) => state.matchState)

    const [commandsNames, setCommandsNames] = useState(commandsNamesStore);
    const [commandsScores, setCommandsScores] = useState(commandsScoreStore);
    // const [period, setPeriod] = useState(periodStore);
    const [isCurrentMatch, setIsCurrentMatch] = useState(isCurrentMatchStore);
    const [match, setMatch] = useState(store);

    const loadData = () => {
        api.getMatch()
            .then((match) => {
                if (match) {
                    console.log('match: ', match);
                    setMatch(match);
                    setIsCurrentMatch(match.isRunning);
                }
            })
            .catch((err) => console.log(err));
    }

    const saveData = () => {
        api.postMatch(match)
            .then((match) => {
                setMatch(match);
                dispatch(setMatchStore(match));
            })
            .catch((err) => console.log(err));
    }

    const updateData = () => {
        api.updateMatch(match)
            .then((newMatch) => {
                if (newMatch) {
                    console.log('newMatch: ', newMatch);
                    setMatch(newMatch);
                    dispatch(setMatchStore(newMatch));
                }
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if (isCurrentMatch) {
            // console.log(match);
            setCommandsNames({ firstName: match.firstCommand, secondName: match.secondCommand });
            setCommandsScores({ firstScore: match.firstCommandScore, secondScore: match.secondCommandScore });
        }
    }, [isCurrentMatch]);

    function namesHandler(event: any) {
        if (event.target.id.includes('controller__command-one')) {
            setCommandsNames((prevCommandsNames) => ({
                ...prevCommandsNames,
                firstName: event.target.value,
            }));
        } else {
            setCommandsNames((prevCommandsNames) => ({
                ...prevCommandsNames,
                secondName: event.target.value,
            }));
        }
        setMatch((prevState: any) => ({
            ...prevState,
            firstCommand: commandsNames.firstName,
            secondCommand: commandsNames.secondName,

        }));
    }

    function scoreHandler(event: any) {
        console.log('event: ', event.target.value);
        if (event.target.id.includes('controller__command-one-score')) {
            setCommandsScores((prevCommandsScores) => ({
                ...prevCommandsScores,
                firstScore: event.target.value,
            }));
        } else {
            setCommandsScores((prevCommandsScores) => ({
                ...prevCommandsScores,
                secondScore: event.target.value,
            }));
        }

        setMatch((prevState: any) => ({
            ...prevState,
            firstCommandScore: commandsScores.firstScore,
            secondCommandScore: commandsScores.secondScore,

        }));
    }

    const firstIncrementByValue = (value: number) => {
        setCommandsScores((prevCommandsScores) => ({
            ...prevCommandsScores,
            firstScore: prevCommandsScores.firstScore + Number(value),
        }));
        dispatch(firstIncrementByAmount(value));
    }

    const secondIncrementByValue = (value: number) => {
        setCommandsScores((prevCommandsScores) => ({
            ...prevCommandsScores,
            secondScore: prevCommandsScores.secondScore + Number(value),
        }));
        dispatch(secondIncrementByAmount(value));
    }

    // function submitMatch() {

    // }

    useEffect(() => {
        updateData();
    }, [commandsScores, commandsNames])

    return (
        <>
            <MatchControls saveDatas={saveData} />
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px', alignItems: 'center' }}>
                        <TextField
                            id="standard-controlled controller__command-one"
                            label="Команда 1"
                            variant="standard"
                            sx={{ textAlign: 'center', textAlignLast: 'center' }}
                            defaultValue="Команда 1"
                            value={commandsNames.firstName}
                            onChange={namesHandler}
                        />
                        <TextField
                            id="standard-controlled controller__command-one-score"
                            label="Счет"
                            variant="standard"
                            type="text"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            defaultValue="0"
                            value={commandsScores.firstScore}
                            onChange={scoreHandler}
                            sx={{ textAlign: 'center', textAlignLast: 'center' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button variant="contained" onClick={() => dispatch(firstDecrement())}>
                            -1
                        </Button>
                        <Button variant="contained" onClick={() => firstIncrementByValue(1)}>
                            +1
                        </Button>
                        <Button variant="contained" onClick={() => firstIncrementByValue(2)}>
                            +2
                        </Button>
                        <Button variant="contained" onClick={() => firstIncrementByValue(3)}>
                            +3
                        </Button>
                    </Box>

                </Container>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px', alignItems: 'center' }}>
                        <TextField
                            id="standard-controlled"
                            label="Команда 2"
                            variant="standard"
                            sx={{ textAlign: 'center', textAlignLast: 'center' }}
                            defaultValue="Команда 2"
                            value={commandsNames.secondName}
                            onChange={namesHandler}
                        />
                        <TextField
                            id="standard-controlled"
                            label="Счет"
                            variant="standard"
                            type="text"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            defaultValue="0"
                            value={commandsScores.secondScore}
                            onChange={scoreHandler}
                            sx={{ textAlign: 'center', textAlignLast: 'center' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button variant="contained" onClick={() => dispatch(secondDecrement())}>
                            -1
                        </Button>
                        <Button variant="contained" onClick={() => secondIncrementByValue(1)}>
                            +1
                        </Button>
                        <Button variant="contained" onClick={() => secondIncrementByValue(2)}>
                            +2
                        </Button>
                        <Button variant="contained" onClick={() => secondIncrementByValue(3)}>
                            +3
                        </Button>
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export default CreateCM;

