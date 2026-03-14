"use client"

import { useEffect, useRef } from "react"

export default function CricketCanvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!   // <-- force non-null

    canvas.width = 700
    canvas.height = 300

    let ballX = 80
    let ballY = 200
    let phase: "bowl" | "hit" | "six" = "bowl"

    let animationId: number

    function drawPlayer(x:number,y:number){

      ctx.beginPath()

      // head
      ctx.arc(x,y-40,10,0,Math.PI*2)

      // body
      ctx.moveTo(x,y-30)
      ctx.lineTo(x,y)

      // legs
      ctx.lineTo(x-10,y+30)
      ctx.moveTo(x,y)
      ctx.lineTo(x+10,y+30)

      // arms
      ctx.moveTo(x,y-20)
      ctx.lineTo(x-15,y-5)
      ctx.moveTo(x,y-20)
      ctx.lineTo(x+15,y-5)

      ctx.strokeStyle="white"
      ctx.lineWidth=2
      ctx.stroke()
    }

    function draw(){

      ctx.clearRect(0,0,canvas!.width,canvas!.height)

      // pitch
      ctx.fillStyle="#1e7f3b"
      ctx.fillRect(0,220,canvas!.width,80)

      // bowler
      drawPlayer(80,200)

      // batsman
      drawPlayer(550,200)

      // bat
      ctx.beginPath()
      ctx.moveTo(550,170)
      ctx.lineTo(570,140)
      ctx.stroke()

      if(phase==="bowl"){
        ballX +=4
        if(ballX>520) phase="hit"
      }

      else if(phase==="hit"){
        ballX +=5
        ballY -=4
        if(ballY<60) phase="six"
      }

      else if(phase==="six"){
        ballX +=5
        ballY +=2
      }

      ctx.beginPath()
      ctx.arc(ballX,ballY,5,0,Math.PI*2)
      ctx.fillStyle="red"
      ctx.fill()

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animationId)

  },[])

  return (
    <div className="flex justify-center mt-20">
      <canvas
        ref={canvasRef}
        className="border border-white/20 rounded-xl"
      />
    </div>
  )
}
