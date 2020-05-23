/** @jsx jsx */
import { jsx } from "@emotion/core"
import useAudio from "../../hooks/useAudio"
import NodeOverview from "../elems/NodeOverview"

type Props = {
  mykey: string
  convolverNode: ConvolverNode
}

export default function ConvolverNode({ mykey, convolverNode }: Props) {
  const { delNodeType } = useAudio()
  const close = () => {
    delNodeType(mykey)
  }

  return (
    <section className="component" id="gain">
      <h3>Convolver</h3>
      <div>
        <NodeOverview
          onClick={close}
          link="https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode"
        >
          The <code>ConvolverNode</code> interface performs a Linear Convolution on a given
          AudioBuffer, often used to achieve a reverb effect.
        </NodeOverview>
      </div>
    </section>
  )
}
