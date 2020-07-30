/** @jsx jsx */
import { jsx } from "@emotion/core"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, Fragment, useEffect, useRef, useState } from "react"
import { audioContext, addNode, delNode } from "../../../scripts/audio"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import { Title, FormWrapper, AddButton } from "../nodeform"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"
import useAudioParamKeys from "../../../hooks/useAudioParamKeys"

export default memo(({ id }: NodeComponentProps) => {
  const gain = useRef(audioContext.createGain())
  const audioParams = useAudioParamKeys(gain.current)
  const [params, setParams] = useState<AudioParamSetting[]>([
    { name: "gain", call: "setValueAtTime", values: [1, 0] },
    { name: "gain", call: "exponentialRampToValueAtTime", values: [0.01, 0.5] },
  ])

  useEffect(() => {
    addNode(id, gain.current)
    return () => delNode(id)
  }, [id])

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
