/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDispatch } from "react-redux"
import { useState, useEffect, useMemo } from "react"
import { setPlayFrequency } from "../../features/activeSound/activeSoundSlice"
import PlaybackControls from "./PlaybackControls"
import BarSettings from "./BarSettings"
import Bar from "./Bar"
import useTimer from "../../hooks/useTimer"

export type StepValue = number | null

export default () => {
  const dispatch = useDispatch()
  const baseBPMPerOneSecond = 60

  const barsPerSequence = 1
  const [notesPerBeat, setNotesPerBeat] = useState(4)
  const [beatsPerBar, setBeatsPerBar] = useState(4)
  const stepsPerBar = useMemo(() => notesPerBeat * beatsPerBar, [notesPerBeat, beatsPerBar])
  const totalSteps = stepsPerBar * barsPerSequence
  const totalBeats = beatsPerBar * barsPerSequence
  const [BPM, setBPM] = useState(140)
  const timePerSequence = useMemo(() => (baseBPMPerOneSecond / BPM) * 1000 * totalBeats, [
    baseBPMPerOneSecond,
    BPM,
    totalBeats,
  ])
  const timePerStep = useMemo(() => timePerSequence / totalSteps, [timePerSequence, totalSteps])

  const [steps, setSteps] = useState<StepValue[]>(new Array(stepsPerBar).fill(null))

  const [cursor, setCursor] = useState(0)
  const [playing, setPlaying] = useState(false)

  useTimer(
    () => {
      const nextCursor = cursor < totalSteps - 1 ? cursor + 1 : 0
      dispatch(setPlayFrequency(steps[nextCursor]))
      setCursor(nextCursor)
    },
    playing ? timePerStep : null
  )

  useEffect(() => {
    if (cursor > stepsPerBar) {
      setCursor(0)
    }
    const s = [...steps]
    const oldLength = s.length
    s.length = stepsPerBar
    if (stepsPerBar > oldLength) {
      s.fill(null, oldLength)
    }
    setSteps(s)
  }, [stepsPerBar])

  return (
    <div>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <PlaybackControls {...{ playing, setPlaying }} />
        <BarSettings
          {...{ BPM, setBPM, notesPerBeat, setNotesPerBeat, beatsPerBar, setBeatsPerBar }}
        />
      </div>
      <div>
        <Bar {...{ steps, setSteps, cursor, beatsPerBar }} />
      </div>
    </div>
  )
}
