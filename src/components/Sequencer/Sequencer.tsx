/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PlaybackControls from "./PlaybackControls"
import { sound } from "../../scripts/audio"
import useTimer from "../../hooks/useTimer"
import {
  selectBPM,
  selectBeatsPerBar,
  selectBarKeys,
  selectNotesPerBeat,
  selectStepsPerBar,
  selectBars,
  addBar,
  delBar,
} from "../../features/sounds/soundsSlice"
import { selectName } from "../../features/activeSound/activeSoundSlice"
import { IconButton } from "../../styled"
import BarSettings from "./BarSettings"
import Bar from "./Bar"
import Widget from "../misc/Widget"

export default () => {
  const dispatch = useDispatch()
  const barKeys = useSelector(selectBarKeys)
  const BPM = useSelector(selectBPM)
  const notesPerBeat = useSelector(selectNotesPerBeat)
  const beatsPerBar = useSelector(selectBeatsPerBar)
  const stepsPerBar = useSelector(selectStepsPerBar)
  const bars = useSelector(selectBars)
  const name = useSelector(selectName)

  const baseBPMPerOneSecond = 60
  const barsPerSequence = 1
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

  useEffect(() => {
    localStorage.setItem("sequencer", JSON.stringify({ BPM, notesPerBeat, beatsPerBar, bars }))
  }, [BPM, notesPerBeat, beatsPerBar, bars])

  return (
    <Widget title="Sequencer">
      <div css={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PlaybackControls {...{ playing, setPlaying }} />
        <div>
          <IconButton
            onClick={() => setShowSettings(!showSettings)}
            title="Open/Close Bar Settings"
          >
            <FontAwesomeIcon icon={["fad", "cogs"]} />
          </IconButton>
          <IconButton onClick={() => void dispatch(addBar(name))} title="Add Bar">
            <FontAwesomeIcon icon={["fad", "layer-plus"]} />
          </IconButton>
        </div>
      </div>
      {showSettings && <BarSettings />}
      <div>
        {barKeys.map(barKey => (
          <Bar
            key={barKey}
            {...{ cursor, beatsPerBar, barId: barKey }}
            onRemove={() => void dispatch(delBar(barKey))}
          />
        ))}
      </div>
    </Widget>
  )
}
