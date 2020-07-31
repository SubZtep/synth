/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, Fragment, ChangeEvent } from "react"
import {
  setBiquadFilter,
  selectBiquadFilter,
  BiquadFilter,
} from "../../../features/activeSound/activeSoundSlice"
import AudioParamDefaults from "./AudioParamDefaults"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"
import { AudioParamSetting } from "./AudioParamForm"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"
import { FormWrapper, Title, Hr } from "./styled"

const types: BiquadFilterType[] = [
  "allpass",
  "bandpass",
  "highpass",
  "highshelf",
  "lowpass",
  "lowshelf",
  "notch",
  "peaking",
]

export default memo(({ id }: NodeComponentProps) => {
  const defs = useAudioNodeDefs("BiquadFilterNode")
  const dispatch = useDispatch()
  const biquadFilter: BiquadFilter = useSelector(selectBiquadFilter)(id) || {
    id,
    type: types[0],
    params: [],
  }

  const changeType = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setBiquadFilter({ ...biquadFilter, type: event.currentTarget.value as BiquadFilterType })
    )
  }

  const setParams = (params: AudioParamSetting[]) => {
    dispatch(setBiquadFilter({ ...biquadFilter, params }))
  }

  const addParam = (name?: string, defaultValue = 1) => {
    const params = [...biquadFilter.params]
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
      <Title>Biquad Filter #{id}</Title>
      <AudioParamDefaults audioParams={defs.audioParams} addParam={addParam} />
      <FormWrapper css={{ marginTop: 4 }}>
        <label>Type</label>
        <div css={{ columnCount: 2, fontWeight: 300 }}>
          {types.map(typeVal => (
            <label key={typeVal} css={{ display: "block" }}>
              <input
                type="radio"
                defaultValue={typeVal}
                checked={biquadFilter.type === typeVal}
                onChange={changeType}
              />
              {typeVal}
            </label>
          ))}
        </div>
        {biquadFilter.params.length > 0 && <Hr />}
        <AudioParams
          audioParams={defs.audioParams}
          params={biquadFilter.params}
          setParams={setParams}
        />
      </FormWrapper>
      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
})
