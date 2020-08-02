/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Fragment, ChangeEvent } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"
import { selectEditMode } from "../../../features/ux/uxSlice"
import {
  setBiquadFilter,
  selectBiquadFilter,
  BiquadFilter,
} from "../../../features/activeSound/activeSoundSlice"
import AudioParamDefaults from "../elems/AudioParamDefaults"
import { AudioParamSetting } from "../elems/AudioParamForm"
import { FormWrapper, H1, H2, NodeBody, DataRow, DataKey } from "../elems/styled"
import HandleOutputs from "../elems/HandleOutputs"
import HandleInputs from "../elems/HandleInputs"
import AudioParams from "../elems/AudioParams"
import AudioParamsView from "../elems/AudioParamsView"

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

export default ({ id }: NodeComponentProps) => {
  const editMode = useSelector(selectEditMode)
  const defs = useAudioNodeDefs("BiquadFilterNode")
  const dispatch = useDispatch()
  const biquadFilter: BiquadFilter = useSelector(selectBiquadFilter)(id) || {
    id,
    type: "lowpass",
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
      <H1>Biquad Filter #{id}</H1>

      <NodeBody>
        {editMode ? (
          <Fragment>
            <AudioParamDefaults audioParams={defs.audioParams} addParam={addParam} />
            <H2>Type</H2>
            <FormWrapper>
              <div css={{ columnCount: 2, fontWeight: 300, textTransform: "capitalize" }}>
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
              {biquadFilter.params.length > 0 && (
                <Fragment>
                  <H2>Params</H2>
                  <AudioParams
                    audioParams={defs.audioParams}
                    params={biquadFilter.params}
                    setParams={setParams}
                  />
                </Fragment>
              )}
            </FormWrapper>
          </Fragment>
        ) : (
          <div>
            <DataRow css={{ textTransform: "capitalize" }}>
              <DataKey>Type:</DataKey> {biquadFilter.type}
            </DataRow>
            <AudioParamsView params={biquadFilter.params} />
          </div>
        )}
      </NodeBody>
      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
}
