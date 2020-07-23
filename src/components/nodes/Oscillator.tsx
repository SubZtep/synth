/** @jsx jsx */
import { jsx } from "@emotion/core"
import { memo, useState, Fragment } from "react"
import { Handle, Position, NodeComponentProps } from "react-flow-renderer"
import useOscillatorNode from "../../hooks/useOscillatorNode"
import { Title, FormWrapper, Hr } from "../elems/nodeform"
import { Label } from "../elems/nodeform"

const types: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"]

export default memo(({ id }: NodeComponentProps) => {
  const [frequency, setFrequency] = useState(440)
  const [detune, setDetune] = useState(0)
  const [type, setType] = useState(types[0])
  const { ready } = useOscillatorNode(id, frequency, detune, type)

  return (
    <Fragment>
      <Title>Oscillator #{id}</Title>
      <FormWrapper>
        <Label>
          Frequency (-24k — 24k)
          <input
            disabled={!ready}
            className="frequency"
            type="number"
            min="-24000"
            max="24000"
            value={frequency}
            onChange={event => setFrequency(event.currentTarget.valueAsNumber)}
          />
        </Label>
        <Hr />
        <Label>
          Detune (-10k — 10k)
          <input
            className="detune"
            type="number"
            min={-10000}
            max={10000}
            value={detune}
            onChange={event => setDetune(event.currentTarget.valueAsNumber)}
          />
        </Label>
        <Hr />
        <Label>Type</Label>
        {types.map(typeVal => (
          <Label key={typeVal}>
            <input
              type="radio"
              value={typeVal}
              checked={type === typeVal}
              onChange={event => setType(event.currentTarget.value as OscillatorType)}
            />
            {typeVal}
          </Label>
        ))}
      </FormWrapper>
      <Handle type="source" position={Position.Bottom} style={{ background: "#B0BF1A" }} />
    </Fragment>
  )
})
