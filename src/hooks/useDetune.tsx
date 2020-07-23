import React, { useState, useEffect } from "react"
import { Label } from "../components/elems/nodeform"
import { ctime } from "../scripts/audio"

export default function useDetune(node: AudioNode) {
  const [detune, setDetune] = useState(0)

  useEffect(() => {
    // @ts-ignore
    node.detune.setValueAtTime(detune, ctime)
    // @ts-ignore
  }, [node.detune, detune])

  return (
    <Label>
      Detune (-10k — 10k)
      <input
        className="detune"
        type="number"
        min={-10000}
        max={10000}
        value={detune}
        onChange={event => setDetune(event.currentTarget.valueAsNumber)}
      />
    </Label>
  )
}
