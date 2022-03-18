
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { get } from 'lodash';
import randomWords from 'random-words'
import { useState, useEffect, useContext } from 'react';
import GameField from './components/GameField';
import API from './scripts/API';

export default function Game() {
  const [words, setWords] = useState([])
  const [tick, setTick] = useState(null)
  const [cleaner, setCleaner] = useState(null)
  const [score, setScore] = useState(0)

  const startGame = () => {

    const tick = setInterval(() => {
      const randWord = randomWords(1).join()
      getTranslateData(randWord).then((res) => {
        const word = {word: randWord, time: (new Date()).getTime(), tr: res}
        setWords(w => w.concat(word))
      })
    }, 1000);

    const cleaner = setInterval(() => {
      const now = (new Date()).getTime()
      setWords(words => words.filter(word => (now - word.time) / 1000 <= 5));
    }, 500);

    setTick(tick)
    setCleaner(cleaner)

  }

  const getTranslateData = (word) => {
    
    return API.translate(word)
        .then((r) => {
          const result = []
          const translations = r.data.def[0]
          for (let tr of translations.tr) {
            result.push(tr.text)
          }
          return result
        })
        .catch((e) => console.log(e.response.data))
  }

  useEffect(() => {
    return () => {
      clearInterval(tick)
      clearInterval(cleaner)
    }
  }, [])

  const stopGame = () => {
    clearInterval(tick)
    clearInterval(cleaner)
    setTick(null)
    setWords([]);
  }

  const userInput = (e) => {
    const val = e.target.value
    console.log(words)
    const match = words.find(w => w.tr.includes(val))
    console.log(match, val)
    setScore(score => (match ? score + val.length : score))
    setWords(words => (match ? words.filter(w => w.word !== match.word) : words))
    if (match) {
      e.target.value = ''
    }
  }

  return (
    <Box>
      <Box>
        <p>Your goal is print russian translation of english words so fast as possible and get points equal word length. 
          You start from three words and then counts of words will increase. 
          You may change game difficulty in settings. Are you ready?</p>
      </Box>
      <Box>
        <Box sx={{textAlign: 'center'}}>
          <h2>Score: {score}</h2>
          <h3>{words.map((w) => <span key={w.word}>{w.word} | </span>)}</h3>
        </Box>
        <Box sx={{textAlign: 'center'}}>
          <Button variant="outlined" onClick={startGame} color="primary" disabled={!!tick}>Start!</Button>
          <Button variant="text" onClick={stopGame} color="secondary" disabled={!tick}>Stop</Button>
        </Box>
        <Box sx={{mt: 1, display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <GameField words={words}/>
        </Box>
        <Box sx={{mt: 2, display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Box>
            <TextField onChange={userInput} autoFocus focused id="outlined-basic" sx={{display: (tick ? 'block' : 'none'), input: { color: 'text.background' }}} label="Translate!" variant="outlined"/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
