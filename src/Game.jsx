
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import randomWords from 'random-words'
import { useState, useEffect, useContext } from 'react';

export default function Game() {
  const [words, setWords] = useState([])
  const [tick, setTick] = useState(null)

  const startGame = () => {
    setWords(randomWords(3));
    const tick = setInterval(() => {
      setWords(randomWords(5));
    }, 4000);
    setTick(tick)
  }

  useEffect(() => {
    console.log(tick)
  })

  const stopGame = () => {
    clearInterval(tick)
    setTick(null)
    setWords([]);
  }

  return (
    <Box>
      <Box>
        <p>Your goal is print english words so fast as possible and get points.</p>
        <Button variant="outlined" onClick={startGame} color="primary" disabled={!!tick}>Start!</Button>
        <Button variant="text" onClick={stopGame} color="secondary" disabled={!tick}>Stop!</Button>
      </Box>
      <Box>
        {words.map(w => <div key={w}>{w}</div>)}
        <TextField id="standard-basic" label="Translate, quick!" variant="standard"/>
      </Box>
    </Box>
  );
}
