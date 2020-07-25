import { useState, useEffect } from "react"
import { audioContext, nodes, ctime } from "../scripts/audio"

const useGain = (id: string, gain: number) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    nodes.set(id, audioContext.createGain())
    setReady(true)
  }, [id])

  useEffect(() => {
    ;(nodes.get(id) as GainNode).gain.setValueAtTime(gain, ctime)
  }, [id, gain])

  return {
    ready,
  }
}

export default useGain
