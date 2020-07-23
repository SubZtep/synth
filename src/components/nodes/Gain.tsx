/** @jsx jsx */
import { jsx } from "@emotion/core"
import { memo, useState, Fragment } from "react"
import { Handle, Position, NodeComponentProps } from "react-flow-renderer"
import useGainNode from "../../hooks/useGainNode"
import { Title, FormWrapper } from "../elems/nodeform"
import { Label } from "../elems/nodeform"

const types: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"]

export default memo(({ id }: NodeComponentProps) => {
  const [gain, setGain] = useState(1)
  const { ready } = useGainNode(id, gain)

  return (
    <Fragment>
      <Handle type="target" position={Position.Top} style={{ background: "#fff6" }} />
      <Title>Gain #{id}</Title>
      <FormWrapper>
        <Label>
          Gain (0.0 — 1.0)
          <input
            disabled={!ready}
            className="frequency"
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={gain}
            onChange={event => setGain(event.currentTarget.valueAsNumber)}
          />
        </Label>
      </FormWrapper>
      <Handle type="source" position={Position.Bottom} style={{ background: "#B0BF1A" }} />
    </Fragment>
  )
})
