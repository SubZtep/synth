/** @jsx jsx */
import { jsx } from "@emotion/core"
import useAudio from "../../hooks/useAudio"
import NodeOverview from "../elems/NodeOverview"
import useType from "../../hooks/useType"
import useFrequency from "../../hooks/useFrequency"
import useGain from "../../hooks/useGain"

type Props = {
  mykey: string
  biquadFilterNode: BiquadFilterNode
}

export default function BiquadFilterNode({ mykey, biquadFilterNode }: Props) {
  const { delNodeType } = useAudio()
  const typeForm = useType(biquadFilterNode, ["lowshelf", "highshelf", "peaking"])
  const frequencyForm = useFrequency(biquadFilterNode)
  const gainForm = useGain(biquadFilterNode)

  const close = () => {
    delNodeType(mykey)
  }

  return (
    <section className="component" id="gain">
      <h3>Biquad</h3>

      <div>
        <NodeOverview
          onClick={close}
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
