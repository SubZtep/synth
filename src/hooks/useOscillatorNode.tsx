import { useState, useEffect } from "react"
import { audioContext, nodes, ctime } from "../scripts/audio"

const useOscillatorNode = (id: string, frequency: number, detune: number, type: OscillatorType) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const osc = audioContext.createOscillator()
    osc.start()
    nodes.set(id, osc)
    setReady(true)
  }, [id])

  useEffect(() => {
    ;(nodes.get(id) as OscillatorNode).frequency.setValueAtTime(frequency, ctime)
  }, [id, frequency])

  useEffect(() => {
    ;(nodes.get(id) as OscillatorNode).detune.setValueAtTime(detune, ctime)
  }, [id, detune])

  useEffect(() => {
    ;(nodes.get(id) as OscillatorNode).type = type
  }, [id, type])

  return {
    ready,
  }
}

export default useOscillatorNode
