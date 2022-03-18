import Box from '@mui/material/Box'
import { useState, useEffect, useContext, useRef } from 'react';

export default function GameField(props) {
  

    const click = (e) => {
        console.log(e)
    }

    useEffect(() => {
    }, [])

    return (
        <svg width="80vh" style={{backgroundColor: '#000'}} viewBox='0 0 300 150' onClick={click}>
            <image src='/img/rocket.gif' width='100%' height='100%'></image>
        </svg>
    );
  }