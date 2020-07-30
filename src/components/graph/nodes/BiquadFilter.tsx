/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, useState, useRef, useEffect, Fragment } from "react"
import { selectPlayFrequency } from "../../../features/activeSound/activeSoundSlice"
import { audioContext, applyParams, addNode, delNode } from "../../../scripts/audio"
import { Title, FormWrapper, Hr, AddButton } from "../nodeform"
import useAudioParamKeys from "../../../hooks/useAudioParamKeys"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"
import { Label } from "../nodeform"

const types: BiquadFilterType[] = ["lowshelf", "highshelf", "peaking"]

export default memo(({ id }: NodeComponentProps) => {
  const biquad = useRef(audioContext.createBiquadFilter())
  const audioParams = useAudioParamKeys(biquad.current)
  const playFrequency = useSelector(selectPlayFrequency)
  const [type, setType] = useState(types[0])
  const [params, setParams] = useState<AudioParamSetting[]>([])

  useEffect(() => {
    addNode(id, biquad.current)
    return () => delNode(id)
  }, [id])

  useEffect(() => {
    if (playFrequency !== null) {
      applyParams(biquad.current, params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playFrequency])

  useEffect(() => {
    biquad.current.type = type
  }, [type])

  const addParam = () => {
    setParams([...params, { name: audioParams[0], call: "setValueAtTime", values: [1, 0] }])
  }

  return (
    <Fragment>
      <HandleInputs numberOfInputs={biquad.current.numberOfInputs} />
      <Title>Biquad Filter #{id}</Title>
      <AudioParamDefaults audioNode={biquad.current} keys={audioParams} />
      {audioParams.length > 0 && <AddButton onClick={addParam}>+ Add Param Update</AddButton>}
      <FormWrapper>
        <Label>Type</Label>
        {types.map(typeVal => (
          <Label key={typeVal}>
            <input
              type="radio"
              defaultValue={typeVal}
              checked={type === typeVal}
              onChange={event => setType(event.currentTarget.value as BiquadFilterType)}
            />
            {typeVal}
          </Label>
        ))}
        {params.length > 0 && <Hr />}
        <AudioParams audioNode={biquad.current} params={params} setParams={setParams} />
      </FormWrapper>
      <HandleOutputs numberOfOutputs={biquad.current.numberOfOutputs} />
    </Fragment>
  )
})
