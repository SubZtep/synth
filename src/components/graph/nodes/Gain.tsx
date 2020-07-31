/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, Fragment, useEffect, useRef } from "react"
import { audioContext, setNode, delNode, applyParams } from "../../../scripts/audio"
import {
  selectPlayFrequency,
  setGain,
  delGain,
  selectGain,
  Gain,
} from "../../../features/activeSound/activeSoundSlice"
import useAudioParamKeys from "../../../hooks/useAudioParamKeys"
import { Title, FormWrapper, AddButton } from "../nodeform"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"

export default memo(({ id }: NodeComponentProps) => {
  const node = useRef(audioContext.createGain())
  const dispatch = useDispatch()
  const gain: Gain = useSelector(selectGain)(id) || {
    id,
    params: [],
  }
  const audioParams = useAudioParamKeys(node.current)
  const playFrequency = useSelector(selectPlayFrequency)

  useEffect(() => {
    setNode(id, node.current)
    dispatch(setGain(gain))
    return () => {
      dispatch(delGain(id))
      delNode(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (playFrequency !== null) {
      applyParams(node.current, gain.params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playFrequency])

  const setParams = (params: AudioParamSetting[]) => {
    dispatch(setGain({ ...gain, params }))
  }

  const addParam = () => {
    const params = [...gain.params]
    params.push({ name: audioParams[0], call: "setValueAtTime", values: [1, 0] })
    setParams(params)
  }

  return (
    <Fragment>
      <HandleInputs numberOfInputs={node.current.numberOfInputs} />
      <Title>Gain #{id}</Title>
      <AudioParamDefaults audioNode={node.current} keys={audioParams} />
      {audioParams.length > 0 && <AddButton onClick={addParam}>+ Add Param Update</AddButton>}
      {gain.params.length > 0 && (
        <FormWrapper>
          <AudioParams audioNode={node.current} params={gain.params} setParams={setParams} />
        </FormWrapper>
      )}
      <HandleOutputs numberOfOutputs={node.current.numberOfOutputs} />
    </Fragment>
  )
})
