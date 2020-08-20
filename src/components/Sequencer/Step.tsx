/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useDispatch } from "react-redux"
import { setStep } from "../../features/sounds/soundsSlice"
import { StepValue } from "../../audio.d"

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
  barId: string
  stepNr: number
  step: StepValue
  secondary: boolean
  active: boolean
}

export default ({ barId, stepNr, step, secondary, active }: Props) => {
  const dispatch = useDispatch()

  return (
    <div
      css={[beatStyle, secondary && newBeatStyle]}
      onClick={() => void dispatch(setStep({ barId, stepNr, step: step === null ? 440 : null }))}
    >
      <div css={[dotStyle, step !== null && dotOnStyle, active && dotActiveStyle]} />
    </div>
  )
}
