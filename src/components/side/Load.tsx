/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setLoadElements } from "../../features/ux/uxSlice"
import {
  setName,
  setGain,
  setAnalyser,
  setOscillator,
  setBiquadFilter,
  Analyser,
  Gain,
  BiquadFilter,
  Oscillator,
  BaseNode,
  emptyNodes,
} from "../../features/activeSound/activeSoundSlice"
import { validateSound } from "../../scripts/helpers"
import { IconButton } from "../../styled"
import { Elements, XYPosition } from "react-flow-renderer"
import { defaultNode } from "../graph/AudioGraph"
import { sound } from "../../scripts/audio"
import LocalSoundSelect from "../misc/LocalSoundSelect"

type SynthLocalStore = {
  name: string
  destination: {
    position: XYPosition
  }
  analysers: Analyser[]
  gains: Gain[]
  biquadFilters: BiquadFilter[]
  oscillators: Oscillator[]
}

export default () => {
  const dispatch = useDispatch()

  const load = (name: string) => {
    const data = localStorage.getItem(name)
    if (data) {
      sound.destroyAudioNodes()

      const obj: SynthLocalStore = JSON.parse(data)
      if (validateSound(obj)) {
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
        dispatch(setName(name))
        toast.success(`Sound "${name}" loaded`)
        return
      }
    }
    toast.error(`Error loading "${name}" sound`)
  }

  return (
    <div>
      <LocalSoundSelect onChange={load} unchangeable />
      <IconButton
        onClick={() => {
          alert("Worst Easter Egg Ever #weee")
        }}
      >
        <FontAwesomeIcon icon={["fad", "folder-open"]} fixedWidth size="lg" />
      </IconButton>
    </div>
  )
}
