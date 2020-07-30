/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, Fragment, useEffect, useRef, useState } from "react"
import { audioContext, addNode, delNode, applyParams } from "../../../scripts/audio"
import { selectPlayFrequency } from "../../../features/activeSound/activeSoundSlice"
import useAudioParamKeys from "../../../hooks/useAudioParamKeys"
import { Title, FormWrapper, AddButton } from "../nodeform"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"

export default memo(({ id }: NodeComponentProps) => {
  const gain = useRef(audioContext.createGain())
  const audioParams = useAudioParamKeys(gain.current)
  const playFrequency = useSelector(selectPlayFrequency)
  const [params, setParams] = useState<AudioParamSetting[]>([
    { name: "gain", call: "setValueAtTime", values: [1, 0] },
    { name: "gain", call: "exponentialRampToValueAtTime", values: [0.01, 0.5] },
  ])

  useEffect(() => {
    addNode(id, gain.current)
    return () => delNode(id)
  }, [id])

  useEffect(() => {
    if (playFrequency !== null) {
      applyParams(gain.current, params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playFrequency])

  const addParam = () => {
    setParams([...params, { name: audioParams[0], call: "setValueAtTime", values: [1, 0] }])
  }

  return (
    <Fragment>
      <HandleInputs numberOfInputs={gain.current.numberOfInputs} />
      <Title>Gain #{id}</Title>
      <AudioParamDefaults audioNode={gain.current} keys={audioParams} />
      {audioParams.length > 0 && <AddButton onClick={addParam}>+ Add Param Update</AddButton>}
      {params.length > 0 && (
        <FormWrapper>
          <AudioParams audioNode={gain.current} params={params} setParams={setParams} />
        </FormWrapper>
      )}
      <HandleOutputs numberOfOutputs={gain.current.numberOfOutputs} />
    </Fragment>
  )
})
