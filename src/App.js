import { useEffect, useRef, useState } from 'react';
import './App.css';
import useTicker from './hooks/useTicker';
import useWindowDimensions from './hooks/useWindowDimensions';


function getRandomColor() {
  const colors = ["red", "green", "yellow", "blue", "purple", "gold", "tomato"]
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
function App() {
  const canvasRef = useRef()

  // { x, y, r, color }
  const [confetties, setConfetties] = useState([])

  const [restartAnimation, setRestartAnimation] = useState(false)

  const doRestartAnimation = () => {
    setRestartAnimation(!restartAnimation)
  }

  // generate confetties effect
  useEffect(() => {
    const confetties = generateConfetties()
    console.log(confetties)
    setConfetties(confetties)
  }, [restartAnimation])

  function generateConfetties() {
    const numberOfConfetties = 650
    const confettySpeed = 5

    return Array.from(Array(numberOfConfetties).keys())
      .map((e) => ({
        x: 0, //Math.random() * canvasRef.current.width,
        y: canvasRef.current.height, //Math.random() * canvasRef.current.height,
        directionX: Math.pow(Math.random() * confettySpeed + 1, 3),
        directionY: Math.pow(Math.random() * confettySpeed + 1, 3),
        r: Math.random() * 5 + 5 ,
        color: getRandomColor()
      }))
  }

  const drawFettiy = (ctx, x, y, r = 10, color = "red") => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2* Math.PI);

    ctx.fillStyle = color;
    ctx.fill()
  }

  // draw confetties effect...
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confetties.forEach((confetti) => drawFettiy(ctx, confetti.x, confetti.y, confetti.r, confetti.color))

  }, [confetties]) // leeres dependency array ===> onMount

  // update confetties logic
  const ticker = useTicker()
  
  useEffect(() => {
    setConfetties((prevConfetties) => prevConfetties.map(c => ({
      ...c,
      x: c.x + c.directionX,
      y: c.y - c.directionY,
    })))
  }, [ticker])
  
  const { width, height } = useWindowDimensions()

  return (
    <div className="App" onClick={doRestartAnimation}>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );

}

export default App;
