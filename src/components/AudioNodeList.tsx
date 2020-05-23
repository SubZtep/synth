import React from "react"
import useAudio from "../scripts/useAudio"
import GainNode from "./nodes/GainNode"
import OscillatorNode from "./nodes/OscillatorNode"
import BiquadFilterNode from "./nodes/BiquadFilterNode"

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
          default:
            throw new Error("PANIQ!")
        }
      })}
    </>
  )
}
