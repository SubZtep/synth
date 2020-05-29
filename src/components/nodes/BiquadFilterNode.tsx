/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useRef, useEffect } from "react"
import useAudio from "../../hooks/useAudio"
import NodeOverview from "../elems/NodeOverview"
import useType from "../../hooks/useType"
import useFrequency from "../../hooks/useFrequency"
import useGain from "../../hooks/useGain"

export default function BiquadFilterNode({ id }: { id: string }) {
  const { audioContext, setNode } = useAudio()
  const node = useRef(audioContext.createBiquadFilter())
  const typeForm = useType(node.current, ["lowshelf", "highshelf", "peaking"])
  const frequencyForm = useFrequency(node.current)
  const gainForm = useGain(node.current)

  useEffect(() => {
    setNode(id, node.current)
  }, [])

  return (
    <section className="component" id="gain">
      <h3>Biquad</h3>

      <div>
        <NodeOverview
          id={id}
          link="https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode"
        >
          The <code>BiquadFilterNode</code> interface a simple low-order filter. It can represent
          different kinds of filters, tone control devices, and graphic equalizers.
        </NodeOverview>

        <div className="example">
          {typeForm}
          {frequencyForm}
          {gainForm}
        </div>
      </div>
    </section>
  )
}
