/** @jsx jsx */
import { jsx } from "@emotion/core"
import { memo, useState, Fragment } from "react"
import { Handle, Position, NodeComponentProps } from "react-flow-renderer"
import useBiquadFilterNode from "../../hooks/useBiquadFilterNode"
import { Title, FormWrapper, Hr } from "../elems/nodeform"
import { Label } from "../elems/nodeform"

const types: BiquadFilterType[] = ["lowshelf", "highshelf", "peaking"]

export default memo(({ id }: NodeComponentProps) => {
  const [type, setType] = useState(types[0])
  const [frequency, setFrequency] = useState(440)
  const [gain, setGain] = useState(0)
  const { ready } = useBiquadFilterNode(id, type, frequency, gain)

  return (
    <Fragment>
      <Handle type="target" position={Position.Top} style={{ background: "#fff6" }} />
      <Title>Biquad Filter #{id}</Title>
      <FormWrapper>
        <Label>Type</Label>
        {types.map(typeVal => (
          <Label key={typeVal}>
            <input
              type="radio"
              value={typeVal}
              checked={type === typeVal}
              onChange={event => setType(event.currentTarget.value as BiquadFilterType)}
            />
            {typeVal}
          </Label>
        ))}
        <hr />
        <Label>
          Frequency (-24k — 24k)
          <input
            disabled={!ready}
            type="number"
            min="-24000"
            max="24000"
            value={frequency}
            onChange={event => setFrequency(event.currentTarget.valueAsNumber)}
          />
        </Label>
        <Hr />
        <Label>
          Gain (-40 — 40)
          <input
            disabled={!ready}
            type="number"
            min={-40}
            max={40}
            value={gain}
            onChange={event => setGain(event.currentTarget.valueAsNumber)}
          />
        </Label>
      </FormWrapper>
      <Handle type="source" position={Position.Bottom} style={{ background: "#B0BF1A" }} />
    </Fragment>
  )
})
