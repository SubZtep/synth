/** @jsx jsx */
import { jsx, css } from "@emotion/core"
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
  steps: StepValue[]
  setSteps: (steps: StepValue[]) => void
  cursor: number
}

export default ({ beatsPerBar, steps, setSteps, cursor }: Props) => {
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
