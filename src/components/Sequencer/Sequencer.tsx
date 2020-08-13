/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectBPM,
  selectNotesPerBeat,
  selectBeatsPerBar,
  selectBars,
  addBar,
  delBar,
} from "../../features/sounds/soundsSlice"
import PlaybackControls from "./PlaybackControls"
import { sound } from "../../scripts/audio"
import useTimer from "../../hooks/useTimer"
import BarSettings from "./BarSettings"
import Bar from "./Bar"
import { IconButton } from "../../styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export type StepValue = number | null

export default () => {
  const dispatch = useDispatch()
  const bars = useSelector(selectBars)
  const BPM = useSelector(selectBPM)
  const notesPerBeat = useSelector(selectNotesPerBeat)
  const beatsPerBar = useSelector(selectBeatsPerBar)
  const baseBPMPerOneSecond = 60
  const barsPerSequence = 1
  const stepsPerBar = useMemo(() => notesPerBeat * beatsPerBar, [notesPerBeat, beatsPerBar])
  const totalSteps = stepsPerBar * barsPerSequence
  const totalBeats = beatsPerBar * barsPerSequence
  const timePerSequence = useMemo(() => (baseBPMPerOneSecond / BPM) * 1000 * totalBeats, [
    baseBPMPerOneSecond,
    BPM,
    totalBeats,
  ])
  const timePerStep = useMemo(() => timePerSequence / totalSteps, [timePerSequence, totalSteps])
  const [cursor, setCursor] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

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

  useEffect(() => {
    if (!playing) {
      sound.stop()
    }
  }, [playing])

  return (
    <div>
      <div css={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PlaybackControls {...{ playing, setPlaying }} />
        <div>
          <IconButton onClick={() => {}} title="Render To Audio File">
            <FontAwesomeIcon icon={["fad", "file-audio"]} fixedWidth size="lg" />
          </IconButton>
          <IconButton
            onClick={() => setShowSettings(!showSettings)}
            title="Open/Close Bar Settings"
          >
            <FontAwesomeIcon icon={["fad", "cogs"]} />
          </IconButton>
          <IconButton onClick={() => void dispatch(addBar())} title="Add Bar">
            <FontAwesomeIcon icon={["fad", "layer-plus"]} />
          </IconButton>
        </div>
      </div>
      {showSettings && <BarSettings />}
      <div>
        {bars.map(barId => (
          <Bar
            key={barId}
            {...{ cursor, beatsPerBar, stepsPerBar }}
            onRemove={() => void dispatch(delBar(barId))}
          />
        ))}
      </div>
    </div>
  )
}
