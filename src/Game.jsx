
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import randomWords from 'random-words'
import { useState, useEffect, useContext } from 'react';
import GameField from './components/GameField';
import API from './scripts/API';
import { useSelector, useDispatch } from 'react-redux'

export default function Game() {
  const [words, setWords] = useState([])
  const [ticks, setTicks] = useState([])
  const [cleaners, setCleaners] = useState([])
  const [score, setScore] = useState(0)
  const difficult = useSelector((state) => state.difficult.value)

  const generateWords = () => {
    const randWord = randomWords({exactly: 1, maxLength: 4 + difficult}).join()
    const word = {id: new Date().getTime(), word: randWord}
    getTranslateData(randWord).then((res) => {
      word.tr = res
      setWords(w => (word.tr ? w.concat(word) : w))
      addTimers(word)
    })
  }

  const addTimers = (word) => {
    const tick = setTimeout(generateWords, 1000 * (6 - difficult))
    const cleaner = setTimeout(deleteWords, 1000 * (12 - difficult), word)
    setTicks((ticks) => [...ticks, tick])
    setCleaners(cleaners => [...cleaners, cleaner])
  }

  const deleteWords = (word) => {
    setWords(words => words.filter((w) => w.id !== word.id))
  }

  const startGame = () => {
    generateWords()
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
        .catch((e) => console.log(e))
  }

  const stopGame = () => {
    for (let t of ticks) {
      clearTimeout(t)
    }
    for (let c of cleaners) {
      clearTimeout(c)
    }
    setTicks([])
    setCleaners([])
    setWords([]);
  }

  const userInput = (e) => {
    const val = e.target.value
    const match = words.find(w => w.tr ? w.tr.includes(val) : false)
    setScore(score => (match ? score + val.length : score))
    setWords(words => (match ? words.filter(w => w.word !== match.word) : words))
    if (match) {
      e.target.value = ''
    }
  }

  const wordsList = words.map((w) => <span key={w.word + (new Date()).getTime()}>{w.word} | </span>)

  return (
    <Box>
      <Box>
        <p>Your goal is print russian translation of english words at field so fast as possible and get points equal word length.
          You may change game difficulty in settings. When difficult is highest, words move faster, include more letter and appear more often. Are you ready?</p>
      </Box>
      <Box>
        <Box sx={{textAlign: 'center'}}>
          <h2>Score: {score}</h2>
          <h3>{ !wordsList && wordsList }</h3>
        </Box>
        <Box sx={{mt: 1, display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Button sx={{display: ticks.length ? 'none' : 'block'}} variant="outlined" onClick={startGame} color="primary">Start!</Button>
          <Button sx={{display: !ticks.length ? 'none' : 'block'}} variant="outlined" onClick={stopGame} color="secondary">Stop</Button>
        </Box>
        <Box sx={{mt: 1, display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <GameField words={words} lifetime={1000 * (12 - difficult)}/>
        </Box>
        <Box sx={{mt: 2, display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Box>
            <TextField onChange={userInput} autoFocus focused id="outlined-basic" sx={{display: (ticks.length ? 'block' : 'none'), input: { color: 'text.background' }}} label="Translate!" variant="outlined"/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
