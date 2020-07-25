/** @jsx jsx */
/* eslint-disable react-hooks/exhaustive-deps */
import { jsx } from "@emotion/core"
import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { nodes } from "../../scripts/audio"
import { selectAnalysers } from "../../features/activeSound/activeSoundSlice"
import { dpiFix } from "../../scripts/utils"

export default () => {
  const analysers = useSelector(selectAnalysers)
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>()
  const width = useRef<number>(0)
  const height = useRef<number>(0)

  useEffect(() => {
    ctx.current = canvas.current!.getContext("2d") as CanvasRenderingContext2D
    //TODO: `dpiFix()` uneffective with css width and height, remove them
    const dimensions = dpiFix(canvas.current!)
    width.current = dimensions.width
    height.current = dimensions.height
  }, [])

  const draw = () => {
    ctx.current!.clearRect(0, 0, width.current, height.current)
    analysers.forEach(analyser => {
      const node = nodes.get(analyser.id) as AnalyserNode
      if (node) {
        ctx.current!.lineWidth = analyser.lineWidth
        drawWave(node, analyser.color)
      }
    })

    requestAnimationFrame(draw)
  }

  useEffect(() => {
    if (analysers.length > 0) {
      draw()
    }
  }, [analysers])

  const drawWave = (analyser: AnalyserNode, color = "#ff0000") => {
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

  return <canvas ref={canvas} css={{ width: "100%", height: "100%", backgroundColor: "#364156" }} />
}
