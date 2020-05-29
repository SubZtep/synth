import React, { useRef, useEffect } from "react"
import NodeOverview from "../elems/NodeOverview"
import useAudio from "../../hooks/useAudio"
import useGain from "../../hooks/useGain"

export default function GainNode({ id }: { id: string }) {
  const { audioContext, setNode } = useAudio()
  const node = useRef(audioContext.createGain())
  const gainForm = useGain(node.current, -1, 1, 0.1)

  useEffect(() => {
    setNode(id, node.current)
  }, [])

  return (
    <section className="component" id="gain">
      <h3>Gain</h3>
      <div>
        <NodeOverview id={id} link="https://developer.mozilla.org/en-US/docs/Web/API/GainNode">
          The GainNode interface represents a change in volume.
        </NodeOverview>

        <div className="example">{gainForm}</div>
      </div>
    </section>
  )
}
