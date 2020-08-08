/** @jsx jsx */
import { jsx, css } from "@emotion/core"

const fontStyle = css`
  font-size: 0.8rem !important;
`

const selectStyle = css`
  font-size: 0.8rem !important;
  padding: 1px 2px !important;
  margin-left: 2px;
`

type Props = {
  BPM: number
  setBPM: (bpm: number) => void
  beatsPerBar: number
  setBeatsPerBar: (beatsPerBar: number) => void
  notesPerBeat: number
  setNotesPerBeat: (stepsPerBar: number) => void
}

export default ({
  BPM,
  setBPM,
  beatsPerBar,
  setBeatsPerBar,
  notesPerBeat,
  setNotesPerBeat,
}: Props) => {
  return (
    <div css={fontStyle}>
      <span css={{ marginLeft: 4 }}>
        BPM:
        <input
          css={[selectStyle, { width: 48 }]}
          type="number"
          defaultValue={BPM}
          onChange={event => setBPM(event.currentTarget.valueAsNumber)}
        />
      </span>
      <span css={{ marginLeft: 4 }}>
        Beats:
        <input
          css={[selectStyle, { width: 32 }]}
          type="number"
          min={1}
          defaultValue={beatsPerBar}
          onChange={event => setBeatsPerBar(event.currentTarget.valueAsNumber)}
        />
      </span>
      <span css={{ marginLeft: 4 }}>
        Notes/Beat:
        <input
          css={[selectStyle, { width: 32 }]}
          type="number"
          min={1}
          defaultValue={notesPerBeat}
          onChange={event => setNotesPerBeat(event.currentTarget.valueAsNumber)}
        />
      </span>
    </div>
  )
}
