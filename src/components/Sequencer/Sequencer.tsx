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
  selectBars,
  selectStepsPerBar,
  addBar,
  delBar,
} from "../../features/sounds/soundsSlice"
import { selectName } from "../../features/activeSound/activeSoundSlice"
import { IconButton } from "../../styled"
import BarSettings from "./BarSettings"
import Bar from "./Bar"

export default () => {
  const dispatch = useDispatch()
  const bars = useSelector(selectBars)
  const BPM = useSelector(selectBPM)
  const beatsPerBar = useSelector(selectBeatsPerBar)
  const stepsPerBar = useSelector(selectStepsPerBar)
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
          <IconButton onClick={() => void dispatch(addBar(name))} title="Add Bar">
            <FontAwesomeIcon icon={["fad", "layer-plus"]} />
          </IconButton>
        </div>
      </div>
      {showSettings && <BarSettings />}
      <div>
        {bars.map(barId => (
          <Bar
            key={barId}
            {...{ cursor, beatsPerBar, barId }}
            onRemove={() => void dispatch(delBar(barId))}
          />
        ))}
      </div>
    </div>
  )
}
