/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useState, useEffect } from "react"
import useAudio from "../../scripts/useAudio"
import NodeOverview from "../elems/NodeOverview"
import useFrequency from "../../scripts/useFrequency"
import useDetune from "../../scripts/useDetune"
import useType from "../../scripts/useType"

type Props = {
  mykey: string
  oscillatorNode: OscillatorNode
}

export default function OscillatorNode({ mykey, oscillatorNode }: Props) {
  const { destination, delNodeType } = useAudio()
  const frequencyForm = useFrequency(oscillatorNode)
  const detuneForm = useDetune(oscillatorNode)
  const typeForm = useType(oscillatorNode, ["sine", "square", "sawtooth", "triangle"])
  const [start, setStart] = useState(false)

  useEffect(() => {
    oscillatorNode.start()
    oscillatorNode.disconnect()
  }, [oscillatorNode])

  useEffect(() => {
    if (start) {
      oscillatorNode.connect(destination(mykey))
    } else {
      oscillatorNode.disconnect()
    }
  }, [destination, mykey, oscillatorNode, start])

  const close = () => {
    oscillatorNode.disconnect()
    delNodeType(mykey)
  }

  return (
    <section className="component" id="oscillator">
      <h3>Oscillator</h3>
      <div>
        <NodeOverview
          onClick={close}
          link="https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode"
        >
          The <code>OscillatorNode</code> interface represents a periodic waveform, such as a sine
          wave. Causes a specified frequency of a given wave to be created—in effect, a constant
          tone.
        </NodeOverview>

        <button className={start ? "active" : undefined} onClick={() => setStart(true)}>
          Start
        </button>
        <button css={{ marginLeft: 6 }} onClick={() => setStart(false)}>
          Stop
        </button>

        <div className="example">
          {frequencyForm}
          {detuneForm}
          {typeForm}
        </div>
      </div>
    </section>
  )
}
