/** @jsx jsx */
import ReactFlow, {
  Edge,
  Node,
  isNode,
  addEdge,
  Elements,
  Controls,
  Connection,
  Background,
  useStoreState,
  removeElements,
  BackgroundVariant,
} from "react-flow-renderer"
import { jsx, Global } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { useState, useRef, useEffect, Fragment } from "react"
import {
  selectEditMode,
  toggleEditMode,
  selectLoadElements,
  setLoadElements,
} from "../../features/ux/uxSlice"
import { connectNodes, AUDIO_CONTEXT_DESTINATION } from "../../scripts/audio"
import {
  GraphButtons,
  GraphButton,
  globalGraph,
  globalGraphEditMode,
  globalGraphDraggableMode,
} from "./styled"
import { newNodePosition } from "../../scripts/utils"
import BiquadFilter from "./nodes/BiquadFilter"
import Oscillator from "./nodes/Oscillator"
import Analyser from "./nodes/Analyser"
import Gain from "./nodes/Gain"

export const audioNodeTypes = {
  biquadfilter: BiquadFilter,
  oscillator: Oscillator,
  analyser: Analyser,
  gain: Gain,
}

const defaultNode: Node = {
  id: AUDIO_CONTEXT_DESTINATION,
  data: { label: "Audio Output" },
  type: "output",
  connectable: true,
  selectable: false,
  position: { x: 0, y: 0 },
  className: "audioNode",
  style: {
    backgroundColor: "#364156",
    color: "#fff",
  },
}

const checkSize = (prev: number, next: number) => prev === next

export default () => {
  const dispatch = useDispatch()
  const loadElements = useSelector(selectLoadElements)
  const editMode = useSelector(selectEditMode)
  const width = useStoreState(store => store.width, checkSize)
  const height = useStoreState(store => store.height, checkSize)
  const [elements, setElements] = useState<Elements>([])
  const selected = useRef<Elements | null>(null)
  const nextId = useRef<number>(1)

  const onConnect = (connection: Edge | Connection) => {
    if (connection.source !== null && connection.target !== null) {
      connectNodes(connection.source, connection.target)
      setElements(els => addEdge(connection, els))
    }
  }

  useEffect(() => {
    if (loadElements) {
      setElements(loadElements)
      nextId.current =
        +loadElements
          .filter(el => isNode(el))
          .filter(el => el.id !== AUDIO_CONTEXT_DESTINATION)
          .sort((a, b) => +b.id - +a.id)[0]?.id + 1 || 1
      dispatch(setLoadElements(null))
    }
  }, [loadElements, dispatch])

  useEffect(() => {
    if (width > 0 && height > 0 && elements.length === 0) {
      defaultNode.position = { x: width / 2, y: height / 2 }
      setElements([defaultNode])
    }
  }, [width, height, elements])

  const removeSelected = () => {
    if (selected.current !== null) {
      setElements(removeElements(selected.current, elements))
      selected.current = null
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
    <Fragment>
      <Global styles={globalGraph} />
      {editMode ? (
        <Global styles={globalGraphEditMode} />
      ) : (
        <Global styles={globalGraphDraggableMode} />
      )}
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        nodeTypes={audioNodeTypes}
        nodesDraggable={!editMode}
        onSelectionChange={els => (selected.current = els)}
        connectionLineStyle={{ stroke: "#006" }}
        style={{ backgroundColor: "#7d4e57", flexGrow: 1 }}
        snapGrid={[16, 16]}
        snapToGrid={true}
      >
        <Controls showInteractive={false} />
        <Background variant={BackgroundVariant.Lines} color="#A16873" gap={32} />

        <GraphButtons>
          <GraphButton
            mode="mode"
            onClick={() => dispatch(toggleEditMode())}
            icon={["fas", editMode ? "edit" : "project-diagram"]}
          >
            {editMode ? "To View Mode" : "To Edit Mode"}
          </GraphButton>
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
          <GraphButton mode="del" onClick={removeSelected} icon={["fas", "trash-alt"]}>
            Remove Selected
          </GraphButton>
        </GraphButtons>
      </ReactFlow>
    </Fragment>
  )
}
