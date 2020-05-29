import React from "react"
import useAudio from "../hooks/useAudio"

export default function AudioNodeList() {
  const { nodeTypes } = useAudio()

  return (
    <>
      <button onClick={() => console.log("NODE TYPES", nodeTypes())}>
        Console Log <code>NodeTypes</code>
      </button>
      {nodeTypes().map(node => node.el)}
    </>
  )
}
