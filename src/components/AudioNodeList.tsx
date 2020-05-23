import React from "react"
import useAudio from "../hooks/useAudio"
import GainNode from "./nodes/GainNode"
import OscillatorNode from "./nodes/OscillatorNode"
import ConvolverNode from "./nodes/ConvolverNode"
import BiquadFilterNode from "./nodes/BiquadFilterNode"
import AnalyserNode from "./nodes/AnalyserNode"

export default function AudioNodeList() {
  const { nodeTypes } = useAudio()

  return (
    <>
      <button onClick={() => console.log("NODE TYPES", nodeTypes())}>
        Console Log <code>NodeTypes</code>
      </button>
      {nodeTypes().map(nodeType => {
        switch (nodeType.nodeType) {
          case "OscillatorNode":
            return (
              <OscillatorNode
                key={nodeType.key}
                mykey={nodeType.key}
                oscillatorNode={nodeType.node as OscillatorNode}
              />
            )
          case "GainNode":
            return (
              <GainNode
                key={nodeType.key}
                mykey={nodeType.key}
                gainNode={nodeType.node as GainNode}
              />
            )
          case "BiquadFilterNode":
            return (
              <BiquadFilterNode
                key={nodeType.key}
                mykey={nodeType.key}
                biquadFilterNode={nodeType.node as BiquadFilterNode}
              />
            )
          case "ConvolverNode":
            return (
              <ConvolverNode
                key={nodeType.key}
                mykey={nodeType.key}
                convolverNode={nodeType.node as ConvolverNode}
              />
            )
          case "AnalyserNode":
            return (
              <AnalyserNode
                key={nodeType.key}
                mykey={nodeType.key}
                analyserNode={nodeType.node as AnalyserNode}
              />
            )
          default:
            throw new Error("PANIQ!")
        }
      })}
    </>
  )
}
