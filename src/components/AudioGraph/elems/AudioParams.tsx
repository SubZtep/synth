/** @jsx jsx */
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AudioParamForm, { AudioParamUpdate } from "./AudioParamForm"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"
import { AudioParamSetting } from "../../../audio"
import { IconButton } from "../../../styled"

type Props = {
  audioParams: AudioParams
  params: AudioParamSetting[]
  setParams: (params: AudioParamSetting[]) => void
}

export default ({ audioParams, params, setParams }: Props) => {
  const paramChange = (index: number, newParam: AudioParamUpdate) => {
    const currParams = [...params]
    if (newParam.call !== undefined) {
      const dcalls = ["setValueAtTime", "linearRampToValueAtTime", "exponentialRampToValueAtTime"]
      if (dcalls.includes(newParam.call)) {
        if (!dcalls.includes(currParams[index].call)) {
          newParam.values = [0, 0]
        }
      }
      if (["setTargetAtTime"].includes(newParam.call)) {
        newParam.values = [0, 0, 0]
      }
      if (["setValueCurveAtTime"].includes(newParam.call)) {
        newParam.values = [[0], 0, 0]
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
