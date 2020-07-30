/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, useState, useRef, useEffect, Fragment } from "react"
import { Label } from "../nodeform"
import {
  addAnalyser,
  setAnalyser,
  delAnalyser,
} from "../../../features/activeSound/activeSoundSlice"
import { audioContext, addNode, delNode } from "../../../scripts/audio"
import { Title, FormWrapper } from "../nodeform"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"

const fftSizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768] as const
export type FFTSize = typeof fftSizes[number]

export default memo(({ id }: NodeComponentProps) => {
  const analyser = useRef(audioContext.createAnalyser())
  const [fftSize, setFftSize] = useState<FFTSize>(fftSizes[6])
  const [color, setColor] = useState<string>("#d66853")
  const [lineWidth, setLineWidth] = useState(2)
  const dispatch = useDispatch()

  useEffect(() => {
    addNode(id, analyser.current)
    dispatch(addAnalyser({ id, fftSize, color, lineWidth }))
    return () => {
      dispatch(delAnalyser(id))
      delNode(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    analyser.current.fftSize = fftSize
  }, [fftSize])

  useEffect(() => {
    dispatch(setAnalyser({ id, fftSize, color, lineWidth }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, color, lineWidth])

  return (
    <Fragment>
      <HandleInputs numberOfInputs={analyser.current.numberOfInputs} />
      <Title>Analyser #{id}</Title>
      <FormWrapper>
        <Label>
          FFT Size
          <select
            css={{ float: "right" }}
            defaultValue={fftSize}
            onChange={event => setFftSize(+event.currentTarget.value as FFTSize)}
          >
            {fftSizes.map(fft => (
              <option key={fft} value={fft}>
                {fft}
              </option>
            ))}
          </select>
        </Label>
        <Label>
          Colour
          <input
            css={{ float: "right" }}
            type="color"
            onChange={event => setColor(event.currentTarget.value)}
            defaultValue={color}
          />
        </Label>
        <Label>
          Line Width
          <input
            type="number"
            min={1}
            onChange={event => setLineWidth(event.currentTarget.valueAsNumber)}
            defaultValue={lineWidth}
          />
        </Label>
      </FormWrapper>
      <HandleOutputs numberOfOutputs={analyser.current.numberOfOutputs} />
    </Fragment>
  )
})
