/** @jsx jsx */
/* eslint-disable react-hooks/exhaustive-deps */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { audioNodes } from "../../scripts/audio"
import { selectAnalysers } from "../../features/activeSound/activeSoundSlice"
import { dpiFix } from "../../scripts/utils"

export default () => {
  const analysers = useSelector(selectAnalysers)
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>()
  const width = useRef<number>(0)
  const height = useRef<number>(0)
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    ctx.current = canvas.current!.getContext("2d") as CanvasRenderingContext2D
    //TODO: `dpiFix()` uneffective with css width and height, remove them
    const dimensions = dpiFix(canvas.current!)
    width.current = dimensions.width
    height.current = dimensions.height

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  const draw = () => {
    timer.current = null
    ctx.current!.clearRect(0, 0, width.current, height.current)
    analysers.forEach(analyser => {
      const node = audioNodes.get(analyser.id) as AnalyserNode
      if (node) {
        ctx.current!.lineWidth = analyser.lineWidth
        try {
          drawWave(node, analyser.color)
        } catch (e) {
          toast.error(e.message)
        }
      }
    })

    // requestAnimationFrame(draw)
    timer.current = setTimeout(draw, 100)
  }

  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current)
    }
    if (analysers.length > 0) {
      draw()
    } else {
      ctx.current!.clearRect(0, 0, width.current, height.current)
    }
  }, [analysers])

  const drawWave = (analyser: AnalyserNode, color: string) => {
    const halfHeight = height.current / 2
    ctx.current!.strokeStyle = color
    const bufferLength = analyser.frequencyBinCount
    const data = new Float32Array(bufferLength)
    analyser.getFloatTimeDomainData(data)
    let sliceWidth = width.current / bufferLength
    let x = 0
    let y
    ctx.current!.beginPath()
    ctx.current!.moveTo(0, halfHeight)
    for (let i = 0; i < bufferLength; i++) {
      y = halfHeight + data[i] * halfHeight
      ctx.current!.lineTo(x, y)
      x += sliceWidth
    }
    ctx.current!.lineTo(width.current, halfHeight)
    ctx.current!.stroke()
  }

  return (
    <div css={{ height: 120, backgroundColor: "#364156", boxShadow: "inset 0 0 25px #101319" }}>
      <canvas ref={canvas} css={{ width: "100%", height: "100%" }} />
    </div>
  )
}
