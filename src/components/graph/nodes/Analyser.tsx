/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDispatch, useSelector } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, useRef, useEffect, Fragment } from "react"
import {
  setAnalyser,
  delAnalyser,
  selectAnalyser,
  Analyser,
} from "../../../features/activeSound/activeSoundSlice"
import { audioContext, setNode, delNode } from "../../../scripts/audio"
import { Title, FormWrapper } from "../nodeform"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import { Label } from "../nodeform"

const fftSizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768] as const
export type FFTSize = typeof fftSizes[number]

export default memo(({ id }: NodeComponentProps) => {
  const node = useRef(audioContext.createAnalyser())
  const dispatch = useDispatch()
  const analyser: Analyser = useSelector(selectAnalyser)(id) || {
    id,
    fftSize: fftSizes[6],
    color: "#d66853",
    lineWidth: 2,
  }

  useEffect(() => {
    setNode(id, node.current)
    dispatch(setAnalyser(analyser))
    return () => {
      dispatch(delAnalyser(id))
      delNode(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <HandleInputs numberOfInputs={node.current.numberOfInputs} />
      <Title>Analyser #{id}</Title>
      <FormWrapper>
        <Label>
          FFT Size
          <select
            css={{ float: "right" }}
            value={analyser.fftSize}
            onChange={event =>
              dispatch(setAnalyser({ ...analyser, fftSize: +event.currentTarget.value as FFTSize }))
            }
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
            value={analyser.color}
            onChange={event =>
              dispatch(setAnalyser({ ...analyser, color: event.currentTarget.value }))
            }
          />
        </Label>
        <Label>
          Line Width
          <input
            type="number"
            min={1}
            value={analyser.lineWidth}
            onChange={event =>
              dispatch(setAnalyser({ ...analyser, lineWidth: event.currentTarget.valueAsNumber }))
            }
          />
        </Label>
      </FormWrapper>
      <HandleOutputs numberOfOutputs={node.current.numberOfOutputs} />
    </Fragment>
  )
})
