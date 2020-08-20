/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Fragment, ChangeEvent } from "react"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"
import { Call, CallParams, audioParamCalls } from "../../../audio.d"

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
    const val = event.currentTarget.valueAsNumber
    if (!Number.isNaN(val)) {
      const currValues = [...values]
      currValues[nth] = val
      onChange({ values: currValues })
    }
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
      <td>
        <select value={name} onChange={event => onChange({ name: event.currentTarget.value })}>
          {Object.keys(audioParams).map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          value={call}
          onChange={event => onChange({ call: event.currentTarget.value as Call })}
        >
          {audioParamCalls.map(call => (
            <option key={call} value={call}>
              {call}
            </option>
          ))}
        </select>
      </td>

      {["setValueAtTime", "linearRampToValueAtTime", "exponentialRampToValueAtTime"].includes(
        call
      ) && (
        <Fragment>
          <td>
            <input
              type="number"
              value={getNumber(0)}
              step={0.1}
              data-nth={0}
              onChange={setNumber}
            />
          </td>
          <td>
            <input
              type="number"
              value={getNumber(1)}
              step={0.1}
              min={0}
              data-nth={1}
              onChange={setNumber}
            />
          </td>
        </Fragment>
      )}

      {["setTargetAtTime"].includes(call) && (
        <Fragment>
          <td>
            <input type="number" value={getNumber(0)} data-nth={0} onChange={setNumber} />
          </td>
          <td>
            <label></label>
            <input
              type="number"
              value={getNumber(1)}
              data-nth={1}
              onChange={setNumber}
              title="startTime (t+)"
            />
            <input
              type="number"
              value={getNumber(2)}
              data-nth={2}
              onChange={setNumber}
              title="timeConstant"
            />
          </td>
        </Fragment>
      )}

      {["setValueCurveAtTime"].includes(call) && (
        <Fragment>
          <td>
            <input
              type="text"
              value={getNumbers(0)}
              data-nth={0}
              onChange={setNumbers}
              title="values (comma separated)"
            />
          </td>
          <td>
            <input
              type="number"
              value={getNumber(1)}
              data-nth={1}
              onChange={setNumber}
              title="startTime (t+)"
            />
            <input
              type="number"
              value={getNumber(2)}
              data-nth={2}
              onChange={setNumber}
              title="duration"
            />
          </td>
        </Fragment>
      )}
    </Fragment>
  )
}
