/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react"
import { ElementId } from "react-flow-renderer"
import { audioContext, nodes, ctime, connectNodes } from "../scripts/audio"

const useOscillator = (
  id: string,
  active: boolean,
  target: ElementId | null,
  frequency: number,
  detune: number,
  type: OscillatorType
) => {
  const [ready, setReady] = useState(false)
  const node = useRef<OscillatorNode | null>(null)

  const oscillatorFactory = () => {
    if (node.current === null) {
      const osc = audioContext.createOscillator()
      osc.onended = () => {
        setReady(false)
        throw new Error(`Oscillator #{$id} ended.`)
      }
      osc.frequency.setValueAtTime(frequency, ctime)
      osc.detune.setValueAtTime(detune, ctime)
      osc.type = type
      node.current = osc
      nodes.set(id, osc)
      if (target !== null) {
        connectNodes(id, target)
      }
    }
  }

  useEffect(() => {
    oscillatorFactory()
    setReady(true)
  }, [id])

  useEffect(() => {
    if (active) {
      node.current!.start()
    } else {
      if (node.current !== null) {
        node.current.disconnect()
        node.current = null
        oscillatorFactory()
      }
    }
  }, [active])

  useEffect(() => {
    if (node.current !== null && target !== null) {
      connectNodes(id, target)
    }
  }, [target])

  useEffect(() => {
    node.current?.frequency.setValueAtTime(frequency, ctime)
  }, [frequency])

  useEffect(() => {
    node.current?.detune.setValueAtTime(detune, ctime)
  }, [detune])

  useEffect(() => {
    if (node.current !== null) {
      node.current.type = type
    }
  }, [type])

  return {
    ready,
  }
}

export default useOscillator
