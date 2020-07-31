/** @jsx jsx */
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { setGain, selectGain, Gain } from "../../../features/activeSound/activeSoundSlice"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"
import { selectEditMode } from "../../../features/ux/uxSlice"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import { H1, FormWrapper, NodeBody, DataRow, DataKey, DataNote } from "./styled"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"

export default ({ id }: NodeComponentProps) => {
  const editMode = useSelector(selectEditMode)
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
      <H1>Gain #{id}</H1>

      <NodeBody>
        {(editMode || gain.params.length === 0) && (
          <AudioParamDefaults
            audioParams={defs.audioParams}
            addParam={addParam}
            hideButton={!editMode}
          />
        )}
        {editMode ? (
          <Fragment>
            {gain.params.length > 0 && (
              <FormWrapper>
                <AudioParams
                  audioParams={defs.audioParams}
                  params={gain.params}
                  setParams={setParams}
                />
              </FormWrapper>
            )}
          </Fragment>
        ) : (
          gain.params.map((param, index) => (
            <DataRow key={JSON.stringify(param) + index.toString()}>
              <div>
                <DataKey>{param.name}:</DataKey> {param.values.join(", ")}
              </div>
              <DataNote>{param.call}</DataNote>
            </DataRow>
          ))
        )}
      </NodeBody>

      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
}
