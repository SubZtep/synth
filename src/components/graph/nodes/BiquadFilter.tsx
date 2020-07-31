/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { NodeComponentProps } from "react-flow-renderer"
import { memo, useRef, useEffect, Fragment, ChangeEvent } from "react"
import {
  selectPlayFrequency,
  setBiquadFilter,
  delBiquadFilter,
  selectBiquadFilter,
  BiquadFilter,
} from "../../../features/activeSound/activeSoundSlice"
import { audioContext, applyParams, setNode, delNode } from "../../../scripts/audio"
import { Title, FormWrapper, Hr, AddButton } from "../nodeform"
import useAudioParamKeys from "../../../hooks/useAudioParamKeys"
import AudioParamDefaults from "./AudioParamDefaults"
import HandleOutputs from "./HandleOutputs"
import HandleInputs from "./HandleInputs"
import AudioParams from "./AudioParams"
import { Label } from "../nodeform"
import { AudioParamSetting } from "./AudioParamForm"

const types: BiquadFilterType[] = [
  "allpass",
  "bandpass",
  "highpass",
  "highshelf",
  "lowpass",
  "lowshelf",
  "notch",
  "peaking",
]

export default memo(({ id }: NodeComponentProps) => {
  const node = useRef(audioContext.createBiquadFilter())
  const dispatch = useDispatch()
  const biquadFilter: BiquadFilter = useSelector(selectBiquadFilter)(id) || {
    id,
    type: types[0],
    params: [],
  }
  const audioParams = useAudioParamKeys(node.current)
  const playFrequency = useSelector(selectPlayFrequency)

  useEffect(() => {
    setNode(id, node.current)
    dispatch(setBiquadFilter(biquadFilter))
    return () => {
      dispatch(delBiquadFilter(id))
      delNode(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (playFrequency !== null) {
      applyParams(node.current, biquadFilter.params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playFrequency])

  const changeType = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setBiquadFilter({ ...biquadFilter, type: event.currentTarget.value as BiquadFilterType })
    )
  }

  const setParams = (params: AudioParamSetting[]) => {
    dispatch(setBiquadFilter({ ...biquadFilter, params }))
  }

  const addParam = () => {
    const params = [...biquadFilter.params]
    params.push({ name: audioParams[0], call: "setValueAtTime", values: [1, 0] })
    setParams(params)
  }

  return (
    <Fragment>
      <HandleInputs numberOfInputs={node.current.numberOfInputs} />
      <Title>Biquad Filter #{id}</Title>
      <AudioParamDefaults audioNode={node.current} keys={audioParams} />
      {audioParams.length > 0 && <AddButton onClick={addParam}>+ Add Param Update</AddButton>}
      <FormWrapper>
        <Label>Type</Label>
        <div css={{ columnCount: 2 }}>
          {types.map(typeVal => (
            <Label key={typeVal}>
              <input
                type="radio"
                defaultValue={typeVal}
                checked={biquadFilter.type === typeVal}
                onChange={changeType}
              />
              {typeVal}
            </Label>
          ))}
        </div>
        {biquadFilter.params.length > 0 && <Hr />}
        <AudioParams audioNode={node.current} params={biquadFilter.params} setParams={setParams} />
      </FormWrapper>
      <HandleOutputs numberOfOutputs={node.current.numberOfOutputs} />
    </Fragment>
  )
})
