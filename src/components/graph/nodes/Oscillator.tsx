/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector } from "react-redux"
import { memo, useState, useEffect, Fragment, useRef } from "react"
import { Handle, Position, NodeComponentProps, ElementId } from "react-flow-renderer"
import { audioContext, addNode, connectNodes, applyParams } from "../../../scripts/audio"
import { selectPlayFrequency } from "../../../features/activeSound/activeSoundSlice"
import useAudioParamKeys from "../../../hooks/useAudioParamKeys"
import { Title, FormWrapper, Hr, AddButton } from "../nodeform"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import AudioParams from "./AudioParams"
import { Label } from "../nodeform"

const types: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"]

export default memo(({ id }: NodeComponentProps) => {
  const node = useRef<OscillatorNode | null>(null)
  const audioParams = useAudioParamKeys(audioContext.createOscillator())
  const [params, setParams] = useState<AudioParamSetting[]>([])
  const [target, setTarget] = useState<ElementId | null>(null)
  const [type, setType] = useState(types[0])
  const playFrequency = useSelector(selectPlayFrequency)

  const oscillatorFactory = (frequency: number) => {
    const osc = audioContext.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime)
    osc.onended = () => {
      throw new Error(`Oscillator #{$id} ended.`)
    }
    addNode(id, osc)
    if (target !== null) {
      connectNodes(id, target)
    }
    return osc
  }

  useEffect(() => {
    if (node.current !== null) {
      node.current.disconnect()
      node.current = null
    }
    if (playFrequency !== null) {
      node.current = oscillatorFactory(playFrequency)
      applyParams(node.current, params)
      node.current.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playFrequency])

  const addParam = () => {
    setParams([...params, { name: audioParams[0], call: "setValueAtTime", values: [1, 0] }])
  }

  return (
    <Fragment>
      <Title>Oscillator #{id}</Title>
      <AudioParamDefaults audioNode={audioContext.createOscillator()} keys={audioParams} />
      {audioParams.length > 0 && <AddButton onClick={addParam}>+ Add Param Update</AddButton>}
      <FormWrapper>
        <Label>Type</Label>
        {types.map(typeVal => (
          <Label key={typeVal}>
            <input
              type="radio"
              defaultValue={typeVal}
              checked={type === typeVal}
              onChange={event => setType(event.currentTarget.value as OscillatorType)}
            />
            {typeVal}
          </Label>
        ))}
        {params.length > 0 && <Hr />}
        <AudioParams
          audioNode={audioContext.createOscillator()}
          params={params}
          setParams={setParams}
        />
      </FormWrapper>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#B0BF1A" }}
        onConnect={connection => setTarget(connection.target)}
      />
    </Fragment>
  )
})
