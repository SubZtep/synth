/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useMemo, useEffect, Fragment, ChangeEvent } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { H1, FormWrapper, Hr, NodeBody, H2, DataRow, DataKey } from "../elems/styled"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"
import { selectEditMode } from "../../../features/ux/uxSlice"
import AudioParamDefaults from "../elems/AudioParamDefaults"
import { AudioParamSetting } from "../elems/AudioParamForm"
import {
  setOscillator,
  delOscillator,
  selectOscillator,
  Oscillator,
} from "../../../features/activeSound/activeSoundSlice"
import AudioParamsView from "../elems/AudioParamsView"
import HandleOutputs from "../elems/HandleOutputs"
import HandleInputs from "../elems/HandleInputs"
import AudioParams from "../elems/AudioParams"

const types: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"]

export default ({ id }: NodeComponentProps) => {
  const basic: Oscillator = useMemo(
    () => ({
      id,
      type: types[0],
      params: [],
    }),
    [id]
  )
  const editMode = useSelector(selectEditMode)
  const defs = useAudioNodeDefs("OscillatorNode")
  const dispatch = useDispatch()
  const oscillator: Oscillator = useSelector(selectOscillator)(id) || basic

  useEffect(() => {
    dispatch(setOscillator(oscillator))
    return () => void dispatch(delOscillator(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <AudioParamsView params={oscillator.params} />
          </div>
        )}
      </NodeBody>

      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
}
