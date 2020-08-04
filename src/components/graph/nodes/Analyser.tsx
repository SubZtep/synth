/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDispatch, useSelector } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { useMemo, useEffect, Fragment, ChangeEvent } from "react"
import { H1, DataRow, DataKey, NodeBody } from "../elems/styled"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"
import { selectEditMode } from "../../../features/ux/uxSlice"
import {
  setAnalyser,
  delAnalyser,
  selectAnalyser,
  Analyser,
} from "../../../features/activeSound/activeSoundSlice"
import HandleOutputs from "../elems/HandleOutputs"
import HandleInputs from "../elems/HandleInputs"
import { WidgetRows } from "../../../styled"

const fftSizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768] as const
export type FFTSize = typeof fftSizes[number]

export default ({ id }: NodeComponentProps) => {
  const basic: Analyser = useMemo(
    () => ({
      id,
      connectIds: [],
      fftSize: fftSizes[6],
      color: "#d66853",
      lineWidth: 2,
    }),
    [id]
  )
  const editMode = useSelector(selectEditMode)
  const defs = useAudioNodeDefs("AnalyserNode")
  const dispatch = useDispatch()
  const analyser: Analyser = useSelector(selectAnalyser)(id) || basic

  useEffect(() => {
    dispatch(setAnalyser(analyser))
    return () => void dispatch(delAnalyser(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <H1>Analyser #{id}</H1>

      <NodeBody>
        {editMode ? (
          <WidgetRows>
            <div>
              <label htmlFor={`a1${id}`} css={{ flexGrow: 1 }}>
                FFT Size
              </label>
              <select id={`a1${id}`} value={analyser.fftSize} onChange={setFFTSize}>
                {fftSizes.map(fft => (
                  <option key={fft} value={fft}>
                    {fft}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`a2{id}`} css={{ flexGrow: 1 }}>
                Colour
              </label>
              <input id={`a2${id}`} type="color" value={analyser.color} onChange={setColor} />
            </div>
            <div>
              <label htmlFor={`a3${id}`} css={{ flexGrow: 1 }}>
                Line Width
              </label>
              <input
                id={`a3${id}`}
                type="range"
                min={1}
                max={50}
                value={analyser.lineWidth}
                onChange={setLineWidth}
              />
            </div>
          </WidgetRows>
        ) : (
          <Fragment>
            <DataRow>
              <DataKey>FFT Size:</DataKey> {analyser.fftSize}
            </DataRow>
            <DataRow>
              <DataKey>Line:</DataKey>
              <div
                css={{ height: analyser.lineWidth, backgroundColor: analyser.color, width: "100%" }}
              ></div>
            </DataRow>
          </Fragment>
        )}
      </NodeBody>

      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
}
