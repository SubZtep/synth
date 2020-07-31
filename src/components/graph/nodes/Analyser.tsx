/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDispatch, useSelector } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, Fragment, ChangeEvent } from "react"
import {
  setAnalyser,
  selectAnalyser,
  Analyser,
} from "../../../features/activeSound/activeSoundSlice"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import { FormWrapperGrid, Title } from "./styled"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"

const fftSizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768] as const
export type FFTSize = typeof fftSizes[number]

export default memo(({ id }: NodeComponentProps) => {
  const defs = useAudioNodeDefs("AnalyserNode")
  const dispatch = useDispatch()
  const analyser: Analyser = useSelector(selectAnalyser)(id) || {
    id,
    fftSize: fftSizes[6],
    color: "#d66853",
    lineWidth: 2,
  }

  const setFFTSize = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAnalyser({ ...analyser, fftSize: +event.currentTarget.value as FFTSize }))
  }

  const setColor = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnalyser({ ...analyser, color: event.currentTarget.value }))
  }

  const setLineWidth = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnalyser({ ...analyser, lineWidth: event.currentTarget.valueAsNumber }))
  }

  return (
    <Fragment>
      <HandleInputs numberOfInputs={defs.numberOfInputs} />
      <Title>Analyser #{id}</Title>

      <FormWrapperGrid>
        <label htmlFor={`a1${id}`}>FFT Size</label>
        <select id={`a1${id}`} value={analyser.fftSize} onChange={setFFTSize}>
          {fftSizes.map(fft => (
            <option key={fft} value={fft}>
              {fft}
            </option>
          ))}
        </select>
        <label htmlFor={`a2{id}`}>Colour</label>
        <input id={`a2${id}`} type="color" value={analyser.color} onChange={setColor} />
        <label htmlFor={`a3${id}`}>Line Width</label>
        <input
          id={`a3${id}`}
          type="number"
          min={1}
          value={analyser.lineWidth}
          onChange={setLineWidth}
        />
      </FormWrapperGrid>

      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
})
