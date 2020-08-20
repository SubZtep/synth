/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Elements, useStoreState, Node } from "react-flow-renderer"
import { BaseNode, SynthStore } from "../../audio"
import { resetSoundsState } from "../../features/sounds/soundsSlice"
import { setLoadElements } from "../../features/ux/uxSlice"
import LocalSoundSelect from "../misc/LocalSoundSelect"
import { defaultNode } from "../AudioGraph/AudioGraph"
import { validateSound } from "../../scripts/helpers"
import {
  selectName,
  setName,
  emptyNodes,
  setAnalyser,
  setGain,
  setBiquadFilter,
  setOscillator,
  selectAudioNodes,
} from "../../features/activeSound/activeSoundSlice"
import { sound } from "../../scripts/audio"
import { IconButton } from "../../styled"
import Widget from "../misc/Widget"

export default () => {
  const dispatch = useDispatch()
  const name = useSelector(selectName)
  const input = useRef<HTMLInputElement>(null)
  const [showSelect, setShowSelect] = useState(false)
  const audioNodes = useSelector(selectAudioNodes)
  const elements = useStoreState(store => store.elements)

  useEffect(() => {
    if (!showSelect) {
      input.current!.value = name
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  useEffect(() => {
    return () => save()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newSound = () => {
    save()
    dispatch(setName("No Name"))
    dispatch(emptyNodes())
    dispatch(setLoadElements([]))
    dispatch(resetSoundsState())
    setShowSelect(false)
    localStorage.clear()
    toast.success(`Create New Sound`)
  }

  const load = (name: string) => {
    save()
    const data = localStorage.getItem(name)
    if (data) {
      sound.destroyAudioNodes()

      const obj: SynthStore = JSON.parse(data)
      if (validateSound(obj)) {
        dispatch(setName(name))
        dispatch(emptyNodes())

        const nodeFactory = (node: BaseNode, type: string, data?: any) => ({
          id: node.id,
          type,
          className: "audioNode",
          position: node.position!,
          data,
        })

        const edgeFactory = (source: string, target: string) => ({
          source,
          target,
          id: `reactflow__edge-${source}-${target}`,
          type: "default",
        })

        const elements: Elements = []

        obj.analysers.forEach(node => {
          elements.push(nodeFactory(node, "analyser", { ...node }))
          delete node.position
          node.connectIds.forEach(toId => void elements.push(edgeFactory(node.id, toId)))
          dispatch(setAnalyser(node))
        })

        obj.gains.forEach(node => {
          elements.push(nodeFactory(node, "gain", { ...node }))
          delete node.position
          node.connectIds.forEach(toId => void elements.push(edgeFactory(node.id, toId)))
          dispatch(setGain(node))
        })

        obj.biquadFilters.forEach(node => {
          elements.push(nodeFactory(node, "biquadfilter", { ...node }))
          delete node.position
          node.connectIds.forEach(toId => void elements.push(edgeFactory(node.id, toId)))
          dispatch(setBiquadFilter(node))
        })

        obj.oscillators.forEach(node => {
          elements.push(nodeFactory(node, "oscillator", { ...node }))
          delete node.position
          node.connectIds.forEach(toId => void elements.push(edgeFactory(node.id, toId)))
          dispatch(setOscillator(node))
        })

        elements.push({
          ...defaultNode,
          position: obj.destination.position,
        })

        dispatch(setLoadElements(elements))

        setShowSelect(false)
        toast.success(`Sound "${name}" loaded`)
        return
      }
    }
    toast.error(`Error loading "${name}" sound`)
  }

  const save = () => {
    const addPosition = (node: BaseNode) => ({
      ...node,
      position: (elements.find(element => element.id === node.id) as Node | undefined)?.__rf
        .position,
    })

    try {
      localStorage.setItem(
        name || "No Name",
        JSON.stringify({
          destination: addPosition({ id: "destination", connectIds: [] }),
          analysers: audioNodes.analysers.flatMap(addPosition),
          gains: audioNodes.gains.flatMap(addPosition),
          biquadFilters: audioNodes.biquadFilters.flatMap(addPosition),
          oscillators: audioNodes.oscillators.flatMap(addPosition),
        })
      )
      toast.success(`Sound "${name}" saved`)
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <Widget title="Current Sound Name">
      <div css={{ display: "flex" }}>
        {showSelect ? (
          <LocalSoundSelect onChange={load} unchangeable />
        ) : (
          <input
            ref={input}
            type="text"
            defaultValue={name}
            onChange={event => dispatch(setName(event.target.value))}
            onFocus={event => event.target.select()}
          />
        )}
        <IconButton onClick={() => setShowSelect(!showSelect)} title="Toggle Select">
          <FontAwesomeIcon icon={["fad", "disc-drive"]} fixedWidth size="lg" />
        </IconButton>
        <IconButton onClick={newSound} title="Create New Sound">
          <FontAwesomeIcon icon={["fad", "file"]} fixedWidth size="lg" />
        </IconButton>
      </div>
    </Widget>
  )
}
