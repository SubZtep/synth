import React from "react"
import { useState, useEffect } from "react"
import { ctime } from "../scripts/audio"

export default function useDetune(node: AudioNode) {
  const [detune, setDetune] = useState(0)

  useEffect(() => {
    // @ts-ignore
    node.detune.setValueAtTime(detune, ctime)
    // @ts-ignore
  }, [node.detune, detune])

  return (
    <fieldset>
      <label>Detune: {detune}</label>
      <input
        className="detune"
        type="range"
        min={-10000}
        max={10000}
        value={detune}
        onChange={event => setDetune(event.currentTarget.valueAsNumber)}
      />
    </fieldset>
  )
}
