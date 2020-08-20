/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useDispatch, useSelector } from "react-redux"
import {
  setBPM,
  setNotesPerBeat,
  setBeatsPerBar,
  selectBPM,
  selectNotesPerBeat,
  selectBeatsPerBar,
} from "../../features/sounds/soundsSlice"

const selectStyle = css`
  font-size: 0.8rem !important;
  padding: 1px 2px !important;
  margin-left: 2px;
`

export default () => {
  const dispatch = useDispatch()
  const BPM = useSelector(selectBPM)
  const notesPerBeat = useSelector(selectNotesPerBeat)
  const beatsPerBar = useSelector(selectBeatsPerBar)

  return (
    <div
      css={css`
        font-size: 0.8rem !important;
        display: flex;
        justify-content: space-between;
        padding: 8px;
      `}
    >
      <div>
        BPM:
        <input
          title="BPM"
          css={[selectStyle, { width: 55 }]}
          type="number"
          defaultValue={BPM}
          onChange={event => dispatch(setBPM(event.currentTarget.valueAsNumber))}
        />
      </div>
      <div>
        Beats:
        <input
          title="Beats"
          css={[selectStyle, { width: 45 }]}
          type="number"
          min={1}
          defaultValue={beatsPerBar}
          onChange={event => dispatch(setBeatsPerBar(event.currentTarget.valueAsNumber))}
        />
      </div>
      <div>
        Notes/Beat:
        <input
          title="Notes/Beat"
          css={[selectStyle, { width: 45 }]}
          type="number"
          min={1}
          defaultValue={notesPerBeat}
          onChange={event => dispatch(setNotesPerBeat(event.currentTarget.valueAsNumber))}
        />
      </div>
    </div>
  )
}
