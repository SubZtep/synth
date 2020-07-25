import { useState, useEffect } from "react"
import { audioContext, nodes, ctime } from "../scripts/audio"

const useBiquadFilter = (id: string, type: BiquadFilterType, frequency: number, gain: number) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    nodes.set(id, audioContext.createBiquadFilter())
    setReady(true)
  }, [id])

  useEffect(() => {
    ;(nodes.get(id) as BiquadFilterNode).type = type
  }, [id, type])

  useEffect(() => {
    ;(nodes.get(id) as BiquadFilterNode).frequency.setValueAtTime(frequency, ctime)
  }, [id, frequency])

  useEffect(() => {
    ;(nodes.get(id) as BiquadFilterNode).gain.setValueAtTime(gain, ctime)
  }, [id, gain])

  return {
    ready,
  }
}

export default useBiquadFilter
