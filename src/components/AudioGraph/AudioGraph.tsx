/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import ReactFlow, {
  Edge,
  Node,
  isEdge,
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
import { globalGraph, globalGraphEditMode, globalGraphDraggableMode } from "./styled"
import { addConnect, delConnect } from "../../features/activeSound/activeSoundSlice"
import {
  selectEditMode,
  selectLoadElements,
  selectDelSelected,
  toggleDelSelected,
  setLoadElements,
} from "../../features/ux/uxSlice"
import { getNextId, checkSize } from "../../scripts/helpers"
import { AUDIO_CONTEXT_DESTINATION } from "../../audio.d"
import { newNodePosition } from "../../scripts/utils"
import BiquadFilter from "./nodes/BiquadFilter"
import Oscillator from "./nodes/Oscillator"
import Analyser from "./nodes/Analyser"
import GraphMenu from "./GraphMenu"
import Gain from "./nodes/Gain"

export const audioNodeTypes = {
  biquadfilter: BiquadFilter,
  oscillator: Oscillator,
  analyser: Analyser,
  gain: Gain,
}

export const defaultNode: Node = {
  id: AUDIO_CONTEXT_DESTINATION,
  data: { label: "Audio Output" },
  type: "output",
  connectable: true,
  selectable: false,
  position: { x: 0, y: 0 },
  className: "audioNode output",
}

export default () => {
  const dispatch = useDispatch()
  const loadElements = useSelector(selectLoadElements)
  const editMode = useSelector(selectEditMode)
  const isDelSelected = useSelector(selectDelSelected)
  const width = useStoreState(store => store.width, checkSize)
  const height = useStoreState(store => store.height, checkSize)
  const [elements, setElements] = useState<Elements>([])
  const selected = useRef<Elements | null>(null)
  const nextId = useRef<number>(1)

  const onConnect = (connection: Edge | Connection) => {
    if (connection.source !== null && connection.target !== null) {
      setElements(els => addEdge(connection, els))
      dispatch(addConnect({ source: connection.source, target: connection.target }))
    }
  }

  useEffect(() => {
    if (loadElements) {
      setElements(loadElements)
      nextId.current = getNextId(loadElements)
      dispatch(setLoadElements(null))
    }
  }, [loadElements, dispatch])

  useEffect(() => {
    if (width > 0 && height > 0 && elements.length === 0) {
      defaultNode.position = { x: width / 2, y: height / 2 }
      setElements([defaultNode])
    }
  }, [width, height, elements])

  useEffect(() => {
    if (isDelSelected) {
      delSelected()
      dispatch(toggleDelSelected())
    }
  }, [isDelSelected])

  const delSelected = () => {
    if (selected.current !== null) {
      setElements(removeElements(selected.current, elements))
      selected.current
        .filter(el => isEdge(el))
        .forEach(
          el =>
            void dispatch(delConnect({ source: (el as Edge).source, target: (el as Edge).target }))
        )
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
        snapGrid={[16, 16]}
        snapToGrid={true}
        onlyRenderVisibleNodes={false}
        connectionLineStyle={{ stroke: "#71474e" }}
      >
        <Controls showInteractive={false} />
        <Background
          variant={editMode ? BackgroundVariant.Dots : BackgroundVariant.Lines}
          color="#364156"
          gap={32}
          size={1}
        />
        <GraphMenu addAudioNode={addAudioNode} delSelected={delSelected} />
      </ReactFlow>
    </Fragment>
  )
}
