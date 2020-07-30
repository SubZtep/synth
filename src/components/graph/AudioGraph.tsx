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
import { useSelector, useDispatch } from "react-redux"
import React, { useState, useRef, useEffect } from "react"
import { selectLoadElements, setLoadElements } from "../../features/ux/uxSlice"
import Oscillator from "./nodes/Oscillator"
import Gain from "./nodes/Gain"
import BiquadFilter from "./nodes/BiquadFilter"
import Analyser from "./nodes/Analyser"
import { newNodePosition } from "../../scripts/utils"
import { GraphButtons, GraphButton } from "./buttons"
import {
  nodes,
  connectNodes,
  disconnectNodes,
  delNode,
  AUDIO_CONTEXT_DESTINATION,
} from "../../scripts/audio"

export const audioNodeTypes = {
  oscillator: Oscillator,
  gain: Gain,
  biquadfilter: BiquadFilter,
  analyser: Analyser,
}

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
  const dispatch = useDispatch()
  const loadElements = useSelector(selectLoadElements)
  const width = useStoreState(store => store.width, checkSize)
  const height = useStoreState(store => store.height, checkSize)
  const [elements, setElements] = useState<Elements>([])
  const selected = useRef<Elements | null>(null)
  const nextId = useRef<number>(1)

  useEffect(() => {
    if (loadElements) {
      nodes.clear()
      setElements(loadElements)
      dispatch(setLoadElements(null))
      nextId.current = loadElements.length + 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadElements])

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

  const addAudioNode = (type: keyof typeof audioNodeTypes) => () =>
    setElements([
      ...elements,
      {
        id: (nextId.current++).toString(),
        type,
        className: "audioNode",
        position: newNodePosition(width, height),
      },
    ])

  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      nodeTypes={audioNodeTypes}
      onSelectionChange={els => (selected.current = els)}
      connectionLineStyle={{ stroke: "#006" }}
      style={{ backgroundColor: "#7d4e57" }}
      snapToGrid={true}
      snapGrid={[16, 16]}
    >
      <Controls showInteractive={false} />
      <Background variant={BackgroundVariant.Lines} color="#A16873" gap={32} />

      <GraphButtons>
        <GraphButton onClick={addAudioNode("oscillator")} icon={["fas", "wave-sine"]}>
          Add Oscillator
        </GraphButton>
        <GraphButton onClick={addAudioNode("gain")} icon={["fas", "volume"]}>
          Add Gain
        </GraphButton>
        <GraphButton onClick={addAudioNode("biquadfilter")} icon={["fas", "filter"]}>
          Add Biquad Filter
        </GraphButton>
        <GraphButton onClick={addAudioNode("analyser")} icon={["fas", "analytics"]}>
          Add Analyser
        </GraphButton>
        <GraphButton onClick={removeSelected} icon={["fas", "trash-alt"]}>
          Remove Selected
        </GraphButton>
      </GraphButtons>
    </ReactFlow>
  )
}

export default NodeGraph
