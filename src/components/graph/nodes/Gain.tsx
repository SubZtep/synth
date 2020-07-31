/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, Fragment } from "react"
import { setGain, selectGain, Gain } from "../../../features/activeSound/activeSoundSlice"
import { Title, FormWrapper } from "./styled"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"

export default memo(({ id }: NodeComponentProps) => {
  const defs = useAudioNodeDefs("GainNode")
  const dispatch = useDispatch()
  const gain: Gain = useSelector(selectGain)(id) || {
    id,
    params: [],
  }

  const setParams = (params: AudioParamSetting[]) => {
    dispatch(setGain({ ...gain, params }))
  }

  const addParam = (name?: string, defaultValue = 1) => {
    const params = [...gain.params]
    params.push({
      name: name || Object.keys(defs.audioParams)[0],
      call: "setValueAtTime",
      values: [defaultValue, 0],
    })
    setParams(params)
  }

  return (
    <Fragment>
      <HandleInputs numberOfInputs={defs.numberOfInputs} />
      <Title>Gain #{id}</Title>
      <AudioParamDefaults audioParams={defs.audioParams} addParam={addParam} />
      {gain.params.length > 0 && (
        <FormWrapper>
          <AudioParams audioParams={defs.audioParams} params={gain.params} setParams={setParams} />
        </FormWrapper>
      )}
      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
})
