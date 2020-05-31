import React, { useRef, useEffect } from "react"
import useAudio, { NodeProps } from "../../hooks/useAudio"
import { Section, Main, Example } from "../elems/styled"
import NodeOverview from "../elems/NodeOverview"
import useGain from "../../hooks/useGain"

export default function GainNode({ id }: NodeProps) {
  const { audioContext, setNode } = useAudio()
  const node = useRef(audioContext.createGain())
  const gainForm = useGain(node.current, -1, 1, 0.1)

  useEffect(() => {
    setNode(id, node.current)
  }, [])

  return (
    <Section id={id}>
      <h3>Gain</h3>
      <Main>
        <NodeOverview id={id} link="https://developer.mozilla.org/en-US/docs/Web/API/GainNode">
          The GainNode interface represents a change in volume.
        </NodeOverview>
        <Example>{gainForm}</Example>
      </Main>
    </Section>
  )
}
