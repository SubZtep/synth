/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useRef, useEffect } from "react"
import useAudio, { NodeProps } from "../../hooks/useAudio"
import { Section, Main, Example } from "../elems/styled"
import useFrequency from "../../hooks/useFrequency"
import NodeOverview from "../elems/NodeOverview"
import useGain from "../../hooks/useGain"
import useType from "../../hooks/useType"

export default function BiquadFilterNode({ id }: NodeProps) {
  const { audioContext, setNode } = useAudio()
  const node = useRef(audioContext.createBiquadFilter())
  const typeForm = useType(node.current, ["lowshelf", "highshelf", "peaking"])
  const frequencyForm = useFrequency(node.current)
  const gainForm = useGain(node.current)

  useEffect(() => {
    setNode(id, node.current)
  }, [])

  return (
    <Section id={id}>
      <h3>Biquad</h3>

      <Main>
        <NodeOverview
          id={id}
          link="https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode"
        >
          The <code>BiquadFilterNode</code> interface a simple low-order filter. It can represent
          different kinds of filters, tone control devices, and graphic equalizers.
        </NodeOverview>

        <Example>
          {typeForm}
          {frequencyForm}
          {gainForm}
        </Example>
      </Main>
    </Section>
  )
}
