/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Fragment } from "react"
import AudioParamForm, { AudioParamSetting, AudioParamUpdate } from "./AudioParamForm"
import { Hr, DelButton } from "../elems/styled"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"

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
      {params.map((param, index) => (
        <div key={param.name + param.call + index}>
          {index > 0 && <Hr />}
          <AudioParamForm
            audioParams={audioParams}
            {...param}
            onChange={newParam => paramChange(index, newParam)}
          />
          <DelButton onClick={() => delParam(index)}>- Remove Param Update</DelButton>
        </div>
      ))}
    </Fragment>
  )
}
