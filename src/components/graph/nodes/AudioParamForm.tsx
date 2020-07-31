/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Fragment, ChangeEvent } from "react"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"
import { FormGrid } from "./styled"

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
    <FormGrid>
      <label>Name</label>
      <select value={name} onChange={event => onChange({ name: event.currentTarget.value })}>
        {Object.keys(audioParams).map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <label>Call</label>
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

      {["setValueAtTime"].includes(call) && (
        <Fragment>
          <label>value</label>
          <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />

          <label>startTime (t+)</label>
          <input type="number" value={getNumber(1)} data-nth={1} onChange={setNumber} />
        </Fragment>
      )}

      {["linearRampToValueAtTime", "exponentialRampToValueAtTime"].includes(call) && (
        <Fragment>
          <label>value</label>
          <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />

          <label>endTime (t+)</label>
          <input type="number" value={getNumber(1)} data-nth={1} onChange={setNumber} />
        </Fragment>
      )}

      {["setTargetAtTime"].includes(call) && (
        <Fragment>
          <label>value</label>
          <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />

          <label>startTime (t+)</label>
          <input type="number" value={getNumber(1)} data-nth={1} onChange={setNumber} />

          <label>timeConstant</label>
          <input type="number" value={getNumber(2)} data-nth={2} onChange={setNumber} />
        </Fragment>
      )}

      {["setValueCurveAtTime"].includes(call) && (
        <Fragment>
          <label>values (, sep)</label>
          <input type="text" value={getNumbers(0)} data-nth={0} onChange={setNumbers} />

          <label>startTime (t+)</label>
          <input type="number" value={getNumber(1)} data-nth={1} onChange={setNumber} />

          <label>duration</label>
          <input type="number" value={getNumber(2)} data-nth={2} onChange={setNumber} />
        </Fragment>
      )}

      {["cancelScheduledValues"].includes(call) && (
        <Fragment>
          <label>startTime (t+)</label>
          <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />
        </Fragment>
      )}

      {["cancelAndHoldAtTime"].includes(call) && (
        <Fragment>
          <label>cancelTime (t+)</label>
          <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />
        </Fragment>
      )}
    </FormGrid>
  )
}
