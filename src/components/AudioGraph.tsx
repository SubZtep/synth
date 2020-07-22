import React, { useState, useRef } from "react"
import ReactFlow, {
  Edge,
  Node,
  addEdge,
  MiniMap,
  Elements,
  Controls,
  Connection,
  Background,
  XYPosition,
  removeElements,
  BackgroundVariant,
} from "react-flow-renderer"
import Oscillator from "./nodes/Oscillator"

const newNodePosition = (bottom = false): XYPosition => {
  let { innerWidth: x, innerHeight: y } = window
  x /= 2
  y /= 2
  if (bottom) y += y
  return {
    x: Math.round(x * Math.random()),
    y: Math.round(y * Math.random()),
  }
}

const initialElements: Elements = [
  {
    id: "dest",
    type: "output",
    selectable: false,
    connectable: true,
    data: { label: "Destination 🔈" },
    position: newNodePosition(true),
  },
]

const NodeGraph = () => {
  const [elements, setElements] = useState(initialElements)
  const selected = useRef<Elements | null>(null)

  const removeSelected = () => {
    if (selected.current !== null) {
      setElements(removeElements(selected.current, elements))
      selected.current = null
    }
  }

  const onConnect = (connection: Edge | Connection) => setElements(els => addEdge(connection, els))

  const addOscillator = () => {
    const id = (elements.length + 1).toString()
    const osc: Node = {
      id,
      type: "oscillator",
      className: "audioNode",
      position: newNodePosition(),
    }
    const elems = [...elements, osc]
    setElements(elems)
  }

  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      onLoad={reactFlowInstance => reactFlowInstance.fitView()}
      onSelectionChange={els => (selected.current = els)}
      nodeTypes={{
        oscillator: Oscillator,
      }}
      connectionLineStyle={{ stroke: "#006" }}
      snapToGrid={true}
      snapGrid={[16, 16]}
    >
      <MiniMap
        nodeColor={(n: Node): string => {
          if (n.style?.background) return n.style.background.toString()
          if (n.type === "input") return "#9999ff"
          if (n.type === "output") return "#79c9b7"
          if (n.type === "default") return "#ff6060"
          return "#eee"
        }}
      />
      <Controls />
      <Background variant={BackgroundVariant.Lines} color="black" gap={32} />

      <button
        onClick={addOscillator}
        style={{ position: "absolute", right: 10, top: 10, zIndex: 4 }}
      >
        Add Oscillator
      </button>
      <button
        onClick={removeSelected}
        style={{ position: "absolute", right: 10, top: 35, zIndex: 4 }}
      >
        Remove Selected
      </button>
    </ReactFlow>
  )
}

export default NodeGraph
