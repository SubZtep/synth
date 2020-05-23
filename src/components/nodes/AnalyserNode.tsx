/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useRef, useEffect, useState } from "react"
import useAudio from "../../hooks/useAudio"
import NodeOverview from "../elems/NodeOverview"

type Props = {
  mykey: string
  analyserNode: AnalyserNode
}

export default function AnalyserNode({ mykey, analyserNode }: Props) {
  const [fftSizes] = useState<number[]>(() => {
    const ffts = []
    for (let i = 5; i < 16; i++) {
      ffts.push(Math.pow(2, i))
    }
    return ffts
  })
  const [fftSize, setFftSize] = useState(2048)
  const { delNodeType } = useAudio()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasCtx = canvasRef.current?.getContext("2d")
    if (canvasCtx) {
      draw(canvasCtx)
    }
  }, [])

  const bufferLength = useRef<number>(analyserNode.frequencyBinCount)
  const dataArray = useRef<Uint8Array>(new Uint8Array(bufferLength.current))

  useEffect(() => {
    analyserNode.fftSize = fftSize
    bufferLength.current = analyserNode.frequencyBinCount
    dataArray.current = new Uint8Array(bufferLength.current)
  }, [fftSize])

  const draw = (canvasCtx: CanvasRenderingContext2D) => {
    requestAnimationFrame(() => {
      draw(canvasCtx)
    })
    const width = canvasRef.current?.width || 320
    const height = canvasRef.current?.height || 240

    analyserNode.getByteTimeDomainData(dataArray.current)
    canvasCtx.fillStyle = "rgb(200, 200, 200)"
    canvasCtx.fillRect(0, 0, width, height)
    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = "rgb(0, 0, 0)"
    canvasCtx.beginPath()

    var sliceWidth = (width * 1.0) / bufferLength.current
    var x = 0

    for (var i = 0; i < bufferLength.current; i++) {
      var v = dataArray.current[i] / 128.0
      var y = (v * height) / 2

      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }

      x += sliceWidth
    }

    canvasCtx.lineTo(width, height / 2)
    canvasCtx.stroke()
  }

  const close = () => {
    delNodeType(mykey)
  }

  return (
    <section className="component" id="gain">
      <h3>Analyser</h3>

      <div>
        <NodeOverview
          onClick={close}
          link="https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode"
        >
          The <code>AnalyserNode</code> interface represents a node able to provide real-time
          frequency and time-domain analysis information, for the purposes of data analysis and
          visualization.
        </NodeOverview>

        <div className="example">
          <fieldset>
            <label css={{ marginRight: 4 }}>Fft size:</label>
            <select value={fftSize} onChange={event => setFftSize(+event.currentTarget.value)}>
              {fftSizes.map(fft => (
                <option key={fft} value={fft}>
                  {fft}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">A Window With Stuff In It</div>
            {/* <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div> */}
          </div>
          <div className="window-body">
            <canvas ref={canvasRef} css={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
