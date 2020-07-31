/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { memo, useState, useEffect, Fragment, useRef, ChangeEvent } from "react"
import { NodeComponentProps, ElementId, useStoreState, Edge } from "react-flow-renderer"
import { audioContext, setNode, connectNodes, applyParams } from "../../../scripts/audio"
import {
  selectPlayFrequency,
  setOscillator,
  delOscillator,
  selectOscillator,
  Oscillator,
} from "../../../features/activeSound/activeSoundSlice"
import useAudioParamKeys from "../../../hooks/useAudioParamKeys"
import { Title, FormWrapper, Hr, AddButton } from "../nodeform"
import AudioParamDefaults from "./AudioParamDefaults"
import { AudioParamSetting } from "./AudioParamForm"
import HandleOutputs from "./HandleOutputs"
import AudioParams from "./AudioParams"
import { Label } from "../nodeform"

const types: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"]

export default memo(({ id }: NodeComponentProps) => {
  const fakeOscForData = useRef(audioContext.createOscillator())
  const node = useRef<OscillatorNode | null>(null)
  const dispatch = useDispatch()
  const oscillator: Oscillator = useSelector(selectOscillator)(id) || {
    id,
    type: types[0],
    params: [],
  }
  const audioParams = useAudioParamKeys(audioContext.createOscillator())
  const [target, setTarget] = useState<ElementId | null>(null)
  const playFrequency = useSelector(selectPlayFrequency)
  const edges = useStoreState(store => store.edges)

  const oscillatorFactory = () => {
    const osc = audioContext.createOscillator()
    osc.type = oscillator.type
    osc.onended = () => {
      throw new Error(`Oscillator #{$id} ended.`)
    }
    setNode(id, osc)
    if (target !== null) {
      connectNodes(id, target)
    }
    return osc
  }

  useEffect(() => {
    return () => void dispatch(delOscillator(id))
  }, [])

  useEffect(() => {
    const edge: Edge | undefined = edges.find(edge => edge.source === id)
    setTarget(edge?.target ?? null)
  }, [edges.length])

  useEffect(() => {
    if (node.current !== null) {
      node.current?.disconnect()
      node.current = null
    }
    node.current = oscillatorFactory()
    if (playFrequency !== null) {
      node.current.frequency.setValueAtTime(playFrequency, audioContext.currentTime)
      applyParams(node.current, oscillator.params)
      node.current.start()
    }
  }, [playFrequency])

  const changeType = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setOscillator({ ...oscillator, type: event.currentTarget.value as OscillatorType }))
  }

  const setParams = (params: AudioParamSetting[]) => {
    dispatch(setOscillator({ ...oscillator, params }))
  }

  const addParam = () => {
    const params = [...oscillator.params]
    params.push({ name: audioParams[0], call: "setValueAtTime", values: [1, 0] })
    setParams(params)
  }

  return (
    <Fragment>
      <Title>Oscillator #{id}</Title>
      <AudioParamDefaults audioNode={fakeOscForData.current} keys={audioParams} />
      {audioParams.length > 0 && <AddButton onClick={addParam}>+ Add Param Update</AddButton>}
      <FormWrapper>
        <Label>Type</Label>
        {types.map(typeVal => (
          <Label key={typeVal}>
            <input
              type="radio"
              defaultValue={typeVal}
              checked={oscillator.type === typeVal}
              onChange={changeType}
            />
            {typeVal}
          </Label>
        ))}
        {oscillator.params.length > 0 && <Hr />}
        <AudioParams
          audioNode={fakeOscForData.current}
          params={oscillator.params}
          setParams={setParams}
        />
      </FormWrapper>
      <HandleOutputs numberOfOutputs={fakeOscForData.current.numberOfOutputs} />
    </Fragment>
  )
})
