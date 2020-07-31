/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Fragment, ChangeEvent } from "react"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"

const paramRow = css(css`
  width: 100%;
  display: flex;
  /*justify-content: space-between;*/
  label {
    font-size: 0.8rem;
    input {
      width: 80px;
    }
  }
`)

const audioParamCalls = [
  "setValueAtTime",
  "linearRampToValueAtTime",
  "exponentialRampToValueAtTime",
  "setTargetAtTime",
  "setValueCurveAtTime",
  "cancelScheduledValues",
  "cancelAndHoldAtTime",
] as const

type Call = typeof audioParamCalls[number]
type CallParams = (number | number[])[]

export type AudioParamSetting = {
  name: string
  call: Call
  /** `call` values in order */
  values: CallParams
}

export type AudioParamUpdate = {
  name?: string
  call?: Call
  /** `call` values in order */
  values?: CallParams
}

type Props = {
  audioParams: AudioParams
  name: string
  call: Call
  values: CallParams
  onChange: (param: AudioParamUpdate) => void
}

export default ({ audioParams, name, call, values, onChange }: Props) => {
  const setNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const nth = +event.currentTarget.getAttribute("data-nth")!
    const val = +event.currentTarget.valueAsNumber
    const currValues = [...values]
    currValues[nth] = val
    onChange({ values: currValues })
  }

  const setNumbers = (event: ChangeEvent<HTMLInputElement>) => {
    const nth = +event.currentTarget.getAttribute("data-nth")!
    const val = event.currentTarget.value.split(",").map(value => +value)
    const currValues = [...values]
    currValues[nth] = val
    onChange({ values: currValues })
  }

  const getNumber = (nth: number) => values[nth] as number
  const getNumbers = (nth: number) => {
    if (Array.isArray(values[nth])) {
      return (values[nth] as number[]).join(",")
    }
    return values[nth].toString()
  }

  return (
    <Fragment>
      <div css={paramRow}>
        <label>
          Name
          <br />
          <select value={name} onChange={event => onChange({ name: event.currentTarget.value })}>
            {Object.keys(audioParams).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <label>
          Call
          <br />
          <select
            value={call}
            onChange={event => onChange({ call: event.currentTarget.value as Call })}
            css={{ width: 120 }}
          >
            {audioParamCalls.map(call => (
              <option key={call} value={call}>
                {call}
              </option>
            ))}
          </select>
        </label>
      </div>

      {["setValueAtTime"].includes(call) && (
        <div css={paramRow}>
          <label>
            value
            <br />
            <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />
          </label>
          <label>
            startTime (t+)
            <br />
            <input type="number" value={getNumber(1)} data-nth={1} onChange={setNumber} />
          </label>
        </div>
      )}

      {["linearRampToValueAtTime", "exponentialRampToValueAtTime"].includes(call) && (
        <div css={paramRow}>
          <label>
            value
            <br />
            <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />
          </label>
          <label>
            endTime (t+)
            <br />
            <input type="number" value={getNumber(1)} data-nth={1} onChange={setNumber} />
          </label>
        </div>
      )}

      {["setTargetAtTime"].includes(call) && (
        <div css={paramRow}>
          <label>
            value
            <br />
            <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />
          </label>
          <label>
            startTime (t+)
            <br />
            <input type="number" value={getNumber(1)} data-nth={1} onChange={setNumber} />
          </label>
          <label>
            timeConstant
            <br />
            <input type="number" value={getNumber(2)} data-nth={2} onChange={setNumber} />
          </label>
        </div>
      )}

      {["setValueCurveAtTime"].includes(call) && (
        <div css={paramRow}>
          <label>
            values (, sep)
            <br />
            <input type="string" value={getNumbers(0)} data-nth={0} onChange={setNumbers} />
          </label>
          <label>
            startTime (t+)
            <br />
            <input type="number" value={getNumber(1)} data-nth={1} onChange={setNumber} />
          </label>
          <label>
            duration
            <br />
            <input type="number" value={getNumber(2)} data-nth={2} onChange={setNumber} />
          </label>
        </div>
      )}

      {["cancelScheduledValues"].includes(call) && (
        <div css={paramRow}>
          <label>
            startTime (t+)
            <br />
            <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />
          </label>
        </div>
      )}

      {["cancelAndHoldAtTime"].includes(call) && (
        <div css={paramRow}>
          <label>
            cancelTime (t+)
            <br />
            <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />
          </label>
        </div>
      )}
    </Fragment>
  )
}
