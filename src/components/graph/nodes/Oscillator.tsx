/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Fragment, ChangeEvent } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"
import { selectEditMode } from "../../../features/ux/uxSlice"
import {
  setOscillator,
  selectOscillator,
  Oscillator,
} from "../../../features/activeSound/activeSoundSlice"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import { H1, FormWrapper, Hr, NodeBody, H2, DataRow, DataKey, DataNote } from "./styled"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"

const types: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"]

export default ({ id }: NodeComponentProps) => {
  const editMode = useSelector(selectEditMode)
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
      <H1>Oscillator #{id}</H1>

      <NodeBody>
        {editMode ? (
          <Fragment>
            <AudioParamDefaults audioParams={defs.audioParams} addParam={addParam} />
            <H2>Type</H2>
            <FormWrapper css={{ marginTop: 4 }}>
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
          </Fragment>
        ) : (
          <div>
            <DataRow css={{ textTransform: "capitalize" }}>
              <DataKey>Type:</DataKey> {oscillator.type}
            </DataRow>
            {oscillator.params.map((param, index) => (
              <DataRow key={JSON.stringify(param) + index.toString()}>
                <div>
                  <DataKey>{param.name}:</DataKey> {param.values.join(", ")}
                </div>
                <DataNote>{param.call}</DataNote>
              </DataRow>
            ))}
          </div>
        )}
      </NodeBody>

      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
}
