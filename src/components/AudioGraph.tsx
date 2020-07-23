import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
  useStoreState,
  removeElements,
  BackgroundVariant,
  ArrowHeadType,
} from "react-flow-renderer"
import useAudio from "../hooks/useAudio"
import Oscillator from "./nodes/Oscillator"
import { newNodePosition } from "../scripts/utils"
import { GraphMutateButton } from "./elems/buttons"

const NodeGraph = () => {
  console.log("RELOAAAAAD")

  const { connectNodes, disconnectNodes, delNode } = useAudio()
  // const nodes = useStoreState(store => store.nodes)
  const width = useStoreState(
    store => store.width,
    (prev, next) => prev === next
  )
  const height = useStoreState(
    store => store.height,
    (prev, next) => prev === next
  )

  console.log({ width, height })

  const [elements, setElements] = useState<Elements>(() => {
    // console.log("AAAAA", width)
    return [
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
        // position: newNodePosition(width, height, true),
        position: { x: width / 2, y: height / 2 },
      },
    ]
  })
  const selected = useRef<Elements | null>(null)

  const removeSelected = () => {
    if (selected.current !== null) {
      selected.current.forEach(el => {
        if (el.type !== undefined) {
          console.log("XXXXXX", el)
          // Node
          delNode(el.id)
        } else {
          // Edge
          disconnectNodes((el as Edge).source, (el as Edge).target)
        }
      })

      setElements(removeElements(selected.current, elements))
      selected.current = null
    }
  }

  const onConnect = (connection: Edge | Connection) => {
    if (connection.source === null || connection.target === null) {
      return
    }
    // ;(connection as Edge).animated = true
    ;(connection as Edge).arrowHeadType = ArrowHeadType.Arrow

    // Connect nodes audio
    connectNodes(connection.source, connection.target)

    // Connect nodes visual
    setElements(els => addEdge(connection, els))
  }

  const addOscillator = () => {
    const id = (elements.length + 1).toString()
    const osc: Node = {
      id,
      type: "oscillator",
      className: "audioNode",
      position: newNodePosition(width, height),
      //FIXME: weird form coz slider move the node with itself
      // draggable: true,
    }
    const elems = [...elements, osc]
    setElements(elems)
  }

  return (
    <ReactFlow
      elements={elements}
      onLoad={() => {
        console.log("LOADED JUHUU")
      }}
      onConnect={onConnect}
      // onLoad={reactFlowInstance => {
      //   return reactFlowInstance.fitView({ padding: elements.length < 4 ? 2 : 0 })
      // }}
      onSelectionChange={els => (selected.current = els)}
      nodeTypes={{
        oscillator: Oscillator,
      }}
      connectionLineStyle={{ stroke: "#006" }}
      snapToGrid={true}
      snapGrid={[16, 16]}
      style={{ backgroundColor: "#7d4e57" }}
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
      <Controls showInteractive={false} />
      <Background variant={BackgroundVariant.Lines} color="#A16873" gap={32} />

      <GraphMutateButton onClick={addOscillator}>
        <FontAwesomeIcon icon={["fas", "wave-sine"]} />
        Add Oscillator
      </GraphMutateButton>
      <GraphMutateButton second onClick={removeSelected}>
        <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        Remove Selected
      </GraphMutateButton>
    </ReactFlow>
  )
}

export default NodeGraph
