/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { setPlayFrequency } from "../../features/activeSound/activeSoundSlice"
import { StepValue } from "./Sequencer"
import Step from "./Step"

const sequenceStyle = css`
  width: 100%;
  display: flex;
  justify-items: stretch;
  align-items: stretch;
  background-color: #000;
`

type Props = {
  beatsPerBar: number
  stepsPerBar: number
  cursor: number
}

export default ({ beatsPerBar, stepsPerBar, cursor }: Props) => {
  const [steps, setSteps] = useState<StepValue[]>(new Array(stepsPerBar).fill(null))
  const dispatch = useDispatch()

  useEffect(() => {
    const s = [...steps]
    const oldLength = s.length
    s.length = stepsPerBar
    if (stepsPerBar > oldLength) {
      s.fill(null, oldLength)
    }
    setSteps(s)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepsPerBar])

  useEffect(() => {
    const freq = steps[cursor]
    if (freq !== null) {
      //FIXME: Use proper timing
      dispatch(setPlayFrequency(null))
      setTimeout(() => void dispatch(setPlayFrequency(freq)))
    }
  }, [cursor])

  return (
    <div css={sequenceStyle}>
      {steps.map((step, index) => (
        <Step
          key={`${index.toString()}-${step ? step.toString() : ""}`}
          step={step}
          secondary={Math.floor(index / beatsPerBar) % 2 !== 0}
          setStep={s => {
            const ss = [...steps]
            ss[index] = s
            setSteps(ss)
          }}
          active={cursor === index}
        />
      ))}
    </div>
  )
}
