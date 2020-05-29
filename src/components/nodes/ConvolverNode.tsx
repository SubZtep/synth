/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useEffect, useRef } from "react"
import useAudio from "../../hooks/useAudio"
import NodeOverview from "../elems/NodeOverview"

export default function ConvolverNode({ id }: { id: string }) {
  const { audioContext, setNode } = useAudio()
  const node = useRef(audioContext.createBiquadFilter())

  useEffect(() => {
    setNode(id, node.current)
  }, [])

  return (
    <section className="component" id="gain">
      <h3>Convolver</h3>
      <div>
        <NodeOverview id={id} link="https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode">
          The <code>ConvolverNode</code> interface performs a Linear Convolution on a given
          AudioBuffer, often used to achieve a reverb effect.
        </NodeOverview>
      </div>
    </section>
  )
}
