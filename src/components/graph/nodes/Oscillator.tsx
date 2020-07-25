/** @jsx jsx */
import { jsx } from "@emotion/core"
import { memo, useState, useEffect, Fragment } from "react"
import { useSelector } from "react-redux"
import { Handle, Position, NodeComponentProps, ElementId } from "react-flow-renderer"
import { selectPlayFrequency } from "../../../features/activeSound/activeSoundSlice"
import useOscillator from "../../../hooks/useOscillator"
import { Title, FormWrapper, Hr } from "../nodeform"
import { Label } from "../nodeform"

const types: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"]

export default memo(({ id }: NodeComponentProps) => {
  const [target, setTarget] = useState<ElementId | null>(null)
  const [active, setActive] = useState(false)
  const [frequency, setFrequency] = useState(440)
  const [detune, setDetune] = useState(0)
  const [type, setType] = useState(types[0])
  const { ready } = useOscillator(id, active, target, frequency, detune, type)
  const playFrequency = useSelector(selectPlayFrequency)

  useEffect(() => {
    if (playFrequency !== null) {
      setFrequency(playFrequency)
      setActive(true)
    } else {
      setActive(false)
    }
  }, [playFrequency])

  return (
    <Fragment>
      <Title>Oscillator #{id}</Title>
      <FormWrapper>
        <Label>
          <input
            type="checkbox"
            checked={active}
            onChange={event => setActive(event.target.checked)}
          />
          Active
        </Label>
        <Hr />
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
          Detune (-10k — 10k)
          <input
            className="detune"
            type="number"
            min={-10000}
            max={10000}
            defaultValue={detune}
            onChange={event => setDetune(event.currentTarget.valueAsNumber)}
          />
        </Label>
        <Hr />
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
