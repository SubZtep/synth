/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Fragment } from "react"
import AudioParamForm, { AudioParamSetting, AudioParamUpdate } from "./AudioParamForm"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"
import { IconButton } from "../../../styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
  audioParams: AudioParams
  params: AudioParamSetting[]
  setParams: (params: AudioParamSetting[]) => void
}

export default ({ audioParams, params, setParams }: Props) => {
  const paramChange = (index: number, newParam: AudioParamUpdate) => {
    const currParams = [...params]
    if (newParam.call !== undefined) {
      if (
        ["setValueAtTime", "linearRampToValueAtTime", "exponentialRampToValueAtTime"].includes(
          newParam.call
        )
      ) {
        newParam.values = [0, 0]
      }
      if (["setTargetAtTime"].includes(newParam.call)) {
        newParam.values = [0, 0, 0]
      }
      if (["setValueCurveAtTime"].includes(newParam.call)) {
        newParam.values = [[0], 0, 0]
      }
      if (["cancelScheduledValues", "cancelAndHoldAtTime"].includes(newParam.call)) {
        newParam.values = [0]
      }
    }
    currParams[index] = { ...currParams[index], ...newParam }
    setParams(currParams)
  }

  const delParam = (index: number) => {
    const currParams = [...params]
    currParams.splice(index, 1)
    setParams(currParams)
  }

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>
              <FontAwesomeIcon icon={["fad", "piano-keyboard"]} title="Param Name" />
            </th>
            <th>
              <FontAwesomeIcon icon={["fad", "waveform-path"]} title="Call Type" />
            </th>
            <th>
              <FontAwesomeIcon icon={["fad", "sliders-h"]} title="Value" />
            </th>
            <th>
              <FontAwesomeIcon icon={["fad", "hourglass-start"]} title="Start (time+)" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {params.map((param, index) => (
            <tr key={param.name + param.call + index}>
              <AudioParamForm
                audioParams={audioParams}
                {...param}
                onChange={newParam => paramChange(index, newParam)}
              />
              <td>
                <IconButton onClick={() => delParam(index)}>
                  <FontAwesomeIcon icon={["fad", "trash"]} />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}
