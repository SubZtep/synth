import React from "react"
import NodeOverview from "../elems/NodeOverview"
import useAudio from "../../hooks/useAudio"
import useGain from "../../hooks/useGain"

type Props = {
  mykey: string
  gainNode: GainNode
}

export default function GainNode({ mykey, gainNode }: Props) {
  const { delNodeType } = useAudio()
  const gainForm = useGain(gainNode, -1, 1, 0.1)

  const close = () => {
    delNodeType(mykey)
  }
  return (
    <section className="component" id="gain">
      <h3>Gain</h3>
      <div>
        <NodeOverview
          onClick={close}
          link="https://developer.mozilla.org/en-US/docs/Web/API/GainNode"
        >
          The GainNode interface represents a change in volume.
        </NodeOverview>

        <div className="example">{gainForm}</div>
      </div>
    </section>
  )
}
