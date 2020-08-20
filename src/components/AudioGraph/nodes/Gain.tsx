/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useMemo, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { setGain, delGain, selectGain } from "../../../features/activeSound/activeSoundSlice"
import { H1, FormWrapper, NodeBody, Hr } from "../elems/styled"
import useAudioNodeDefs from "../../../hooks/useAudioNodeDefs"
import { selectEditMode } from "../../../features/ux/uxSlice"
import AudioParamDefaults from "../elems/AudioParamDefaults"
import { Gain, AudioParamSetting } from "../../../audio"
import AudioParamsView from "../elems/AudioParamsView"
import HandleOutputs from "../elems/HandleOutputs"
import HandleInputs from "../elems/HandleInputs"
import AudioParams from "../elems/AudioParams"

export default ({ id, data }: NodeComponentProps) => {
  const basic: Gain = useMemo(
    () => ({
      id,
      connectIds: data?.connectIds ?? [],
      params: data?.params ?? [],
    }),
    [id, data]
  )
  const editMode = useSelector(selectEditMode)
  const defs = useAudioNodeDefs("GainNode")
  const dispatch = useDispatch()
  const gain: Gain = useSelector(selectGain)(id) || basic

  useEffect(() => {
    dispatch(setGain(gain))
    return () => void dispatch(delGain(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

        <AudioParamsView params={gain.params} showCoord={true} />

        {editMode && (
          <Fragment>
            {gain.params.length > 0 && (
              <FormWrapper>
                <Hr />
                <AudioParams
                  audioParams={defs.audioParams}
                  params={gain.params}
                  setParams={setParams}
                />
              </FormWrapper>
            )}
          </Fragment>
        )}
      </NodeBody>

      <HandleOutputs numberOfOutputs={defs.numberOfOutputs} />
    </Fragment>
  )
}
