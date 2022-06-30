import Box from '@mui/material/Box'
import { useState, useEffect, useContext, useRef } from 'react';
import _ from 'lodash'

const rocket = {img: new Image(), w: 72, h: 72}
rocket.img.src = './img/rocket.png'


export default function GameField(props) {
    const cv = useRef(null)
    const [lifetime, setLifetime] = useState(props.lifetime)

    const drawBackground = (ctx) => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 500, 500);
    }

    const drawRocket = (ctx) => {
        ctx.drawImage(rocket.img, 0, ctx.canvas.height - rocket.h, rocket.w, rocket.h)
    }

    const drawWord = (ctx, word) => {
        const w = word.word
        const id = word.id
        const generateX = parseInt(String(id).substring(11), 10)
        const startPosition = (generateX / 100) * 200 + 250
        const partOfLife = (new Date().getTime() - id) / lifetime
        const tpc = _.round((100 - partOfLife * 100))
        const coord = {x: startPosition - (partOfLife * startPosition), y: partOfLife * 500}
        const color = parseInt(String(id).substring(6), 10).toString(16)

        ctx.beginPath();
        ctx.arc(coord.x, coord.y, 50 + w.length, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = '#' + color + tpc;
        ctx.fill();

        ctx.fillStyle = '#ffffff' + tpc;
        ctx.font = "25px serif";
        ctx.textAlign = 'center';
        ctx.fillText(w, coord.x, coord.y);
    }

    const draw = (ctx, words) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        drawBackground(ctx)
        for (let word of words) {
            drawWord(ctx, word)
        }
        drawRocket(ctx)
        requestAnimationFrame(() => { draw(ctx, words) })
    }

    useEffect(() => {
        const ctx = cv.current.getContext('2d')
        const words = props.words
        const an = requestAnimationFrame(() => { draw(ctx, words) })

        return function clean() {
            cancelAnimationFrame(an)
        }
    }, [props.words])

    return (
        <Box>
            <canvas width={'500'} height={'500'} ref={cv}></canvas>
        </Box>
    );
  }