/** @jsx jsx */
import { jsx } from "@emotion/core"
import { memo, useState, Fragment } from "react"
import { Handle, Position, NodeComponentProps } from "react-flow-renderer"
import useAnalyser, { fftSizes, FFTSize } from "../../../hooks/useAnalyser"
import { Title, FormWrapper } from "../nodeform"
import { Label } from "../nodeform"

export default memo(({ id }: NodeComponentProps) => {
  const [fftSize, setFftSize] = useState<FFTSize>(fftSizes[6])
  const [color, setColor] = useState<string>("#d66853")
  const [lineWidth, setLineWidth] = useState(2)
  const { ready } = useAnalyser(id, fftSize, color, lineWidth)

  return (
    <Fragment>
      <Handle type="target" position={Position.Top} style={{ background: "#fff6" }} />
      <Title>Analyser #{id}</Title>
      <FormWrapper>
        <Label>
          FFT Size
          <select
            css={{ float: "right" }}
            disabled={!ready}
            defaultValue={fftSize}
            onChange={event => setFftSize(+event.currentTarget.value as FFTSize)}
          >
            {fftSizes.map(fft => (
              <option key={fft} value={fft}>
                {fft}
              </option>
            ))}
          </select>
        </Label>
        <Label>
          Colour
          <input
            css={{ float: "right" }}
            type="color"
            onChange={event => setColor(event.currentTarget.value)}
            defaultValue={color}
          />
        </Label>
        <Label>
          Line Width
          <input
            type="number"
            min={1}
            onChange={event => setLineWidth(event.currentTarget.valueAsNumber)}
            defaultValue={lineWidth}
          />
        </Label>
      </FormWrapper>
      <Handle type="source" position={Position.Bottom} style={{ background: "#B0BF1A" }} />
    </Fragment>
  )
})
