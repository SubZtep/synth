/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useRef, useEffect, useState, ChangeEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setLoadElements } from "../../features/ux/uxSlice"
import {
  setName,
  setGain,
  setAnalyser,
  setOscillator,
  setBiquadFilter,
  selectName,
  Analyser,
  Gain,
  BiquadFilter,
  Oscillator,
  BaseNode,
} from "../../features/activeSound/activeSoundSlice"
import { validateSound } from "../../scripts/helpers"
import { IconButton } from "../../styled"
import { Elements, XYPosition } from "react-flow-renderer"
import { defaultNode } from "../graph/AudioGraph"
import { sound } from "../../scripts/audio"

const retreiveNames = () =>
  Object.keys(localStorage).filter(name => {
    let obj
    try {
      obj = JSON.parse(localStorage[name])
    } catch {
      return false
    }
    return validateSound(obj)
  })

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
  const currentName = useSelector(selectName)
  const [names, setNames] = useState<string[]>([])
  const select = useRef<HTMLSelectElement>(null)

  const load = (name: string) => {
    const data = localStorage.getItem(name)
    if (data) {
      sound.destroyAudioNodes()

      const obj: SynthLocalStore = JSON.parse(data)
      if (validateSound(obj)) {
        // dispatch(emptyNodes()) <- async call

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

  useEffect(() => {
    setNames(retreiveNames())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentName && names.includes(currentName)) {
      setTimeout(() => load(currentName))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names])

  const loadSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.currentTarget.value
    select.current!.value = ""
    load(name)
  }

  return (
    <div>
      {/* @ts-ignore */}
      <select as="select" ref={select} onChange={loadSelected}>
        <option value="">--- Please, Select ---</option>
        {names.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <IconButton onClick={() => setNames(retreiveNames())}>
        <FontAwesomeIcon icon={["fad", "folder-open"]} fixedWidth size="lg" />
      </IconButton>
    </div>
  )
}
