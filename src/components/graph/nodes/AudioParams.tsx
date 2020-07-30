/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector } from "react-redux"
import { Fragment, useEffect } from "react"
import AudioParamForm, { AudioParamSetting, AudioParamUpdate } from "./AudioParamForm"
import { selectPlayFrequency } from "../../../features/activeSound/activeSoundSlice"
import { audioContext } from "../../../scripts/audio"
import { Hr, DelButton } from "../nodeform"

type Props = {
  audioNode: AudioNode
  params: AudioParamSetting[]
  setParams: (params: AudioParamSetting[]) => void
}

export default ({ audioNode, params, setParams }: Props) => {
  const playFrequency = useSelector(selectPlayFrequency)

  useEffect(() => {
    if (playFrequency !== null) {
      params.forEach(param => {
        const values = [...param.values]
        if (
          [
            "setValueAtTime",
            "linearRampToValueAtTime",
            "exponentialRampToValueAtTime",
            "setTargetAtTime",
            "setValueCurveAtTime",
          ].includes(param.call)
        ) {
          // @ts-ignore
          values[1] += audioContext.currentTime
        }
        if (["cancelScheduledValues", "cancelAndHoldAtTime"].includes(param.call)) {
          // @ts-ignore
          values[0] += audioContext.currentTime
        }

        // @ts-ignore
        audioNode[param.name][param.call](...values)
      })
    }
  }, [playFrequency, audioNode, params])

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
            audioNode={audioNode}
            {...param}
            onChange={newParam => paramChange(index, newParam)}
          />
          <DelButton onClick={() => delParam(index)}>- Remove Param Update</DelButton>
        </div>
      ))}
    </Fragment>
  )
}
