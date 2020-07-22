import React, { useState, useRef, CSSProperties } from "react"
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
  useStoreState,
  removeElements,
  BackgroundVariant,
} from "react-flow-renderer"
import Oscillator from "./nodes/Oscillator"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { randomBetween } from "../scripts/utils"

const newNodePosition = (canvasWidth: number, canvasHeight: number, bottom = false): XYPosition => {
  // x: Math.round((canvasWidth - 100) * Math.random()),
  // y: Math.round((bottom ? canvasHeight - 50 : 50) * Math.random()),

  const halfWidth = canvasWidth / 2
  const halfHeight = canvasHeight / 2

  return {
    x: randomBetween(-halfWidth, halfWidth),
    y: bottom ? randomBetween(0, halfHeight) : randomBetween(-halfHeight, 0),
  }
}

const btnCss: CSSProperties = {
  position: "absolute",
  top: 8,
  right: 10,
  width: 160,
  height: 28,
  zIndex: 4,
  borderRadius: 4,
  backgroundColor: "#212d40",
  borderColor: "#212d40",
  color: "#fff",
}

const NodeGraph = () => {
  // const nodes = useStoreState(store => store.nodes)
  const width = useStoreState(
    store => store.width,
    (prev, next) => prev === next
  )
  const height = useStoreState(
    store => store.height,
    (prev, next) => prev === next
  )

  const [elements, setElements] = useState<Elements>([
    {
      id: "destination",
      type: "output",
      selectable: false,
      connectable: true,
      data: { label: "Audio Output" },
      style: {
        backgroundColor: "#364156",
        color: "#fff",
      },
      position: newNodePosition(width, height, true),
    },
  ])
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
      position: newNodePosition(width, height),
    }
    console.log({ osc })
    const elems = [...elements, osc]
    setElements(elems)
  }

  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      onLoad={reactFlowInstance =>
        reactFlowInstance.fitView({ padding: elements.length < 4 ? 2 : 0 })
      }
      onSelectionChange={els => (selected.current = els)}
      nodeTypes={{
        oscillator: Oscillator,
      }}
      connectionLineStyle={{ stroke: "#006" }}
      snapToGrid={true}
      snapGrid={[16, 16]}
      style={{ backgroundColor: "#7d4e57" }}
    >
      {/* <MiniMap
        nodeColor={(n: Node): string => {
          if (n.style?.background) return n.style.background.toString()
          if (n.type === "input") return "#9999ff"
          if (n.type === "output") return "#79c9b7"
          if (n.type === "default") return "#ff6060"
          return "#eee"
        }}
      /> */}
      <Controls showInteractive={false} />
      <Background variant={BackgroundVariant.Lines} color="black" gap={32} />

      <button onClick={addOscillator} style={btnCss}>
        <FontAwesomeIcon icon={["fas", "wave-sine"]} pull="left" color="#ccc" />
        Add Oscillator
      </button>
      <button onClick={removeSelected} style={{ ...btnCss, top: 40 }}>
        <FontAwesomeIcon icon={["fas", "trash-alt"]} pull="left" color="#ccc" />
        Remove Selected
      </button>
    </ReactFlow>
  )
}

export default NodeGraph
