/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { memo, Fragment, ChangeEvent } from "react"
import { NodeComponentProps } from "react-flow-renderer"
import {
  setOscillator,
  selectOscillator,
  Oscillator,
} from "../../../features/activeSound/activeSoundSlice"
import { Title, FormWrapper, Hr } from "./styled"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import HandleOutputs from "./HandleOutputs"
import AudioParams from "./AudioParams"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"
import HandleInputs from "./HandleInputs"

const types: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"]

export default memo(({ id }: NodeComponentProps) => {
  const defs = useAudioNodeDefs("OscillatorNode")
  const dispatch = useDispatch()
  const oscillator: Oscillator = useSelector(selectOscillator)(id) || {
    id,
    type: types[0],
    params: [],
  }

  const changeType = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setOscillator({ ...oscillator, type: event.currentTarget.value as OscillatorType }))
  }

  const setParams = (params: AudioParamSetting[]) => {
    dispatch(setOscillator({ ...oscillator, params }))
  }

  const addParam = (name?: string, defaultValue = 1) => {
    const params = [...oscillator.params]
    params.push({
      name: name || Object.keys(defs.audioParams)[0],
      call: "setValueAtTime",
      values: [defaultValue, 0],
    })
    setParams(params)
  }

  return (
    <Fragment>
      {defs.numberOfInputs > 0 && <HandleInputs numberOfInputs={defs.numberOfInputs} />}
      <Title>Oscillator #{id}</Title>
      <AudioParamDefaults audioParams={defs.audioParams} addParam={addParam} />
      <FormWrapper css={{ marginTop: 4 }}>
        <label>Type</label>
        <div css={{ columnCount: 2, fontWeight: 300 }}>
          {types.map(typeVal => (
            <label key={typeVal} css={{ display: "block" }}>
              <input
                type="radio"
                defaultValue={typeVal}
                checked={oscillator.type === typeVal}
                onChange={changeType}
              />
              {typeVal}
            </label>
          ))}
        </div>
        {oscillator.params.length > 0 && <Hr />}
        <AudioParams
          audioParams={defs.audioParams}
          params={oscillator.params}
          setParams={setParams}
        />
      </FormWrapper>
      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
})
