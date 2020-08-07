/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { StepValue } from "./Sequencer"

const beatStyle = css`
  padding: 1px;
  flex-grow: 1;
`

const newBeatStyle = css`
  background-color: #ccc;
`

const dotStyle = css`
  background-color: #000;
  border: 2px solid #333;
  height: 35px;
  min-width: 5px;
`

const dotOnStyle = css`
  background-color: #fff;
`

const dotActiveStyle = css`
  border-color: #00ff00;
`

type Props = {
  step: StepValue
  secondary: boolean
  setStep: (step: StepValue) => void
  active: boolean
}

export default ({ step, secondary, setStep, active }: Props) => {
  return (
    <div
      css={[beatStyle, secondary && newBeatStyle]}
      onClick={() => {
        setStep(step === null ? 440 : null)
      }}
    >
      <div css={[dotStyle, step !== null && dotOnStyle, active && dotActiveStyle]} />
    </div>
  )
}
