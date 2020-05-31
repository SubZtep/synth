/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useRef, useEffect, useState } from "react"
import useAudio, { NodeProps } from "../../hooks/useAudio"
import { Main, Section, Example } from "../elems/styled"
import NodeOverview from "../elems/NodeOverview"

const maxWin = css({
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
})

const fftSizes: number[] = []
for (let i = 5; i < 16; i++) {
  fftSizes.push(Math.pow(2, i))
}

const dataTypeList = [
  "Time Domain (Byte)",
  "Time Domain (Float)",
  "Frequency (Byte)",
  "Frequency (Float)",
]

export default function AnalyserNode({ id }: NodeProps) {
  const { audioContext, setNode } = useAudio()
  const node = useRef(audioContext.createAnalyser())
  const bufferLength = useRef<number>(node.current.frequencyBinCount)
  const dataArrayByte = useRef<Uint8Array>(new Uint8Array(bufferLength.current))
  const dataArrayFloat = useRef<Float32Array>(new Float32Array(bufferLength.current))
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWidth = useRef(320)
  const canvasHeight = useRef(240)
  const [maximised, setMaximised] = useState(false)
  const [fftSize, setFftSize] = useState(2048)
  /**
   * `dataTypeList` indexes
   * 0: getByteTimeDomainData
   * 1: getFloatTimeDomainData
   * 2: getByteFrequencyData
   * 3: getFloatFrequencyData
   */
  const [dataType, setDataType] = useState(0)

  const refreshCanvasSize = () => {
    if (canvasRef.current) {
      canvasWidth.current = canvasRef.current.clientWidth
      canvasHeight.current = canvasRef.current.clientHeight
      canvasRef.current.width = canvasWidth.current
      canvasRef.current.height = canvasHeight.current
    }
  }

  const maximise = (toMax: boolean) => {
    document.body.classList[toMax ? "add" : "remove"]("noscroll")
    setMaximised(toMax)
    window.requestAnimationFrame(refreshCanvasSize)
  }

  const drawByteTimeDomainData = (canvasCtx: CanvasRenderingContext2D) => {
    node.current.getByteTimeDomainData(dataArrayByte.current)
    const width = canvasWidth.current
    const height = canvasHeight.current
    let sliceWidth = (width * 1.0) / bufferLength.current
    let x = 0
    let v
    let y
    canvasCtx.beginPath()
    canvasCtx.moveTo(0, height / 2)
    for (let i = 0; i < bufferLength.current; i++) {
      v = dataArrayByte.current[i] / 128.0
      y = (v * height) / 2
      canvasCtx.lineTo(x, y)
      x += sliceWidth
    }
    canvasCtx.lineTo(width, height / 2)
    canvasCtx.stroke()
  }

  const drawFloatTimeDomainData = (canvasCtx: CanvasRenderingContext2D) => {
    node.current.getFloatTimeDomainData(dataArrayFloat.current)
    const width = canvasWidth.current
    const height = canvasHeight.current
    let sliceWidth = (width * 1.0) / bufferLength.current
    let x = 0
    let v
    let y
    canvasCtx.beginPath()
    canvasCtx.moveTo(0, height / 2)
    for (let i = 0; i < bufferLength.current; i++) {
      v = dataArrayFloat.current[i] * 200.0
      y = height / 2 + v
      canvasCtx.lineTo(x, y)
      x += sliceWidth
    }
    canvasCtx.lineTo(width, height / 2)
    canvasCtx.stroke()
  }

  const drawByteFrequencyData = (canvasCtx: CanvasRenderingContext2D) => {
    node.current.getByteFrequencyData(dataArrayByte.current)
    const width = canvasWidth.current
    const height = canvasHeight.current
    let barWidth = (width / bufferLength.current) * 2.5
    let barHeight
    let x = 0
    for (let i = 0; i < bufferLength.current; i++) {
      barHeight = dataArrayByte.current[i]
      canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2)
      x += barWidth + 1
    }
  }

  const drawFloatFrequencyData = (canvasCtx: CanvasRenderingContext2D) => {
    node.current.getFloatFrequencyData(dataArrayFloat.current)
    const width = canvasWidth.current
    const height = canvasHeight.current
    let barWidth = (width / bufferLength.current) * 2.5
    let barHeight
    let posX = 0
    for (let i = 0; i < bufferLength.current; i++) {
      barHeight = (dataArrayFloat.current[i] + 140) * 2
      canvasCtx.fillRect(posX, height - barHeight / 2, barWidth, barHeight / 2)
      posX += barWidth + 1
    }
  }

  const draw = (canvasCtx: CanvasRenderingContext2D) => {
    canvasCtx.clearRect(0, 0, canvasWidth.current, canvasHeight.current)
    canvasCtx.fillStyle = "#333"
    canvasCtx.lineWidth = 2

    switch (dataType) {
      case 0:
        drawByteTimeDomainData(canvasCtx)
        break
      case 1:
        drawFloatTimeDomainData(canvasCtx)
        break
      case 2:
        drawByteFrequencyData(canvasCtx)
        break
      case 3:
        drawFloatFrequencyData(canvasCtx)
        break
    }

    if (canvasRef.current) {
      requestAnimationFrame(() => {
        draw(canvasCtx)
      })
    }
  }

  useEffect(() => {
    setNode(id, node.current)
  }, [])

  useEffect(() => {
    const canvasCtx = canvasRef.current?.getContext("2d")
    if (canvasCtx) {
      refreshCanvasSize()
      draw(canvasCtx)
    }
  }, [canvasRef, draw])

  useEffect(() => {
    node.current.fftSize = fftSize
    bufferLength.current = node.current.frequencyBinCount
    dataArrayByte.current = new Uint8Array(bufferLength.current)
    dataArrayFloat.current = new Float32Array(bufferLength.current)
  }, [fftSize, node.current.fftSize, node.current.frequencyBinCount])

  return (
    <Section id={id}>
      <h3>Analyser</h3>

      <Main>
        <NodeOverview id={id} link="https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode">
          The <code>AnalyserNode</code> interface represents a node able to provide real-time
          frequency and time-domain analysis information, for the purposes of data analysis and
          visualization.
        </NodeOverview>

        <Example>
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
          <fieldset>
            <legend>Data Type:</legend>
            {dataTypeList.map((type, index) => (
              <div key={index} className="field-row">
                <input
                  id={`data${index}`}
                  type="radio"
                  checked={dataType === index}
                  onChange={event => setDataType(index)}
                />
                <label htmlFor={`data${index}`}>{type}</label>
              </div>
            ))}
          </fieldset>
        </Example>

        <div className="window" css={maximised ? maxWin : ""}>
          <div className="title-bar">
            <div className="title-bar-text">A Window With Stuff In It</div>
            <div className="title-bar-controls">
              <button
                aria-label="Minimize"
                onClick={() => maximise(false)}
                disabled={!maximised}
              ></button>
              <button
                aria-label="Maximize"
                onClick={() => maximise(true)}
                disabled={maximised}
              ></button>
              {/* <button aria-label="Close"></button> */}
            </div>
          </div>
          <div
            className="window-body"
            css={{ height: "calc(100% - 36px)", margin: maximised ? 0 : undefined }}
          >
            <canvas ref={canvasRef} css={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </Main>
    </Section>
  )
}
