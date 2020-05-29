/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useState, useEffect, useRef } from "react"
import useAudio from "../../hooks/useAudio"
import NodeOverview from "../elems/NodeOverview"
import useFrequency from "../../hooks/useFrequency"
import useDetune from "../../hooks/useDetune"
import useType from "../../hooks/useType"

export default function OscillatorNode({ id }: { id: string }) {
  const { audioContext, setNode, reconnectAllNodes, setParam } = useAudio()
  const node = useRef(audioContext.createOscillator())
  const frequencyForm = useFrequency(node.current)
  const detuneForm = useDetune(node.current)
  const typeForm = useType(node.current, ["sine", "square", "sawtooth", "triangle"])
  const [start, setStart] = useState(false)

  useEffect(() => {
    node.current.start()
    setNode(id, node.current)
    node.current.disconnect()
    return () => node.current.disconnect()
  }, [])

  useEffect(() => {
    setParam(id, "start", start)
    if (start) {
      reconnectAllNodes()
    } else {
      node.current.disconnect()
    }
  }, [start])

  return (
    <section className="component" id="oscillator">
      <h3>Oscillator</h3>
      <div>
        <NodeOverview
          id={id}
          link="https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode"
        >
          The <code>OscillatorNode</code> interface represents a periodic waveform, such as a sine
          wave. Causes a specified frequency of a given wave to be created—in effect, a constant
          tone.
        </NodeOverview>

        <div className="example">
          <button className={start ? "active" : undefined} onClick={() => setStart(true)}>
            Start
          </button>
          <button css={{ marginLeft: 6 }} onClick={() => setStart(false)}>
            Stop
          </button>
        </div>

        <div className="example">
          {frequencyForm}
          {detuneForm}
          {typeForm}
        </div>
      </div>
    </section>
  )
}
