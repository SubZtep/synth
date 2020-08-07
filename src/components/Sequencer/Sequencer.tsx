/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useState, useEffect, useMemo } from "react"
import PlaybackControls from "./PlaybackControls"
import BarSettings from "./BarSettings"
import Bar from "./Bar"
import useTimer from "../../hooks/useTimer"

export type StepValue = number | null

export default () => {
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
  const [cursor, setCursor] = useState(0)
  const [playing, setPlaying] = useState(false)

  useTimer(
    () => {
      setCursor(cursor < totalSteps - 1 ? cursor + 1 : 0)
    },
    playing ? timePerStep : null
  )

  useEffect(() => {
    if (cursor > stepsPerBar) {
      setCursor(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepsPerBar])

  return (
    <div>
      <div css={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PlaybackControls {...{ playing, setPlaying }} />
        <BarSettings
          {...{ BPM, setBPM, notesPerBeat, setNotesPerBeat, beatsPerBar, setBeatsPerBar }}
        />
      </div>
      <div>
        <Bar {...{ cursor, beatsPerBar, stepsPerBar }} />
      </div>
    </div>
  )
}
