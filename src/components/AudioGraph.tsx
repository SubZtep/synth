import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useEffect } from "react"
import ReactFlow, {
  Edge,
  Node,
  addEdge,
  Elements,
  Controls,
  Connection,
  Background,
  useStoreState,
  removeElements,
  BackgroundVariant,
} from "react-flow-renderer"
import Oscillator from "./nodes/Oscillator"
import Gain from "./nodes/Gain"
import { newNodePosition } from "../scripts/utils"
import { GraphMutateButton } from "./elems/buttons"
import { AUDIO_CONTEXT_DESTINATION } from "../types"
import useAudioNodes from "../hooks/useAudioNodes"

const defaultNode: Node = {
  id: AUDIO_CONTEXT_DESTINATION,
  type: "output",
  selectable: false,
  connectable: true,
  data: { label: "Audio Output" },
  style: {
    backgroundColor: "#364156",
    color: "#fff",
  },
  position: { x: 0, y: 0 },
}

const checkSize = (prev: number, next: number) => prev === next

const NodeGraph = () => {
  const { connectNodes, disconnectNodes, delNode } = useAudioNodes()
  // const nodes = useStoreState(store => store.nodes)
  const width = useStoreState(store => store.width, checkSize)
  const height = useStoreState(store => store.height, checkSize)
  const [elements, setElements] = useState<Elements>([])
  const selected = useRef<Elements | null>(null)

  useEffect(() => {
    if (width > 0 && height > 0 && elements.length === 0) {
      defaultNode.position = { x: width / 2, y: height / 2 }
      setElements([defaultNode])
    }
  }, [width, height, elements])

  const removeSelected = () => {
    if (selected.current !== null) {
      selected.current.forEach(el => {
        if (el.type !== undefined) {
          delNode(el.id)
        } else {
          disconnectNodes((el as Edge).source, (el as Edge).target)
        }
      })

      setElements(removeElements(selected.current, elements))
      selected.current = null
    }
  }

  const onConnect = (connection: Edge | Connection) => {
    if (connection.source !== null && connection.target !== null) {
      connectNodes(connection.source, connection.target)
      setElements(els => addEdge(connection, els))
    }
  }

  const addOscillator = () =>
    setElements([
      ...elements,
      {
        id: (elements.length + 1).toString(),
        type: "oscillator",
        className: "audioNode",
        position: newNodePosition(width, height),
      },
    ])

  const addGain = () =>
    setElements([
      ...elements,
      {
        id: (elements.length + 1).toString(),
        type: "gain",
        className: "audioNode",
        position: newNodePosition(width, height),
      },
    ])

  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      onSelectionChange={els => (selected.current = els)}
      nodeTypes={{
        oscillator: Oscillator,
        gain: Gain,
      }}
      connectionLineStyle={{ stroke: "#006" }}
      snapToGrid={true}
      snapGrid={[16, 16]}
      style={{ backgroundColor: "#7d4e57" }}
    >
      <Controls showInteractive={false} />
      <Background variant={BackgroundVariant.Lines} color="#A16873" gap={32} />

      <GraphMutateButton onClick={addOscillator}>
        <FontAwesomeIcon icon={["fas", "wave-sine"]} />
        Add Oscillator
      </GraphMutateButton>
      <GraphMutateButton second onClick={addGain}>
        <FontAwesomeIcon icon={["fas", "volume"]} />
        Add Gain
      </GraphMutateButton>
      <GraphMutateButton third onClick={removeSelected}>
        <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        Remove Selected
      </GraphMutateButton>
    </ReactFlow>
  )
}

export default NodeGraph
