/** @jsx jsx */
import { useSelector, useDispatch } from "react-redux"
import { selectEditMode, toggleEditMode } from "../../features/ux/uxSlice"
import { GraphButtons, GraphButton } from "./styled"
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import { audioNodeTypes } from "./AudioGraph"

type Props = {
  addAudioNode: (type: keyof typeof audioNodeTypes) => () => void
  delSelected: () => void
}

export default ({ addAudioNode, delSelected }: Props) => {
  const dispatch = useDispatch()
  const editMode = useSelector(selectEditMode)

  return (
    <GraphButtons>
      <GraphButton
        mode="mode"
        onClick={() => dispatch(toggleEditMode())}
        icon={["fas", editMode ? "edit" : "project-diagram"]}
      >
        {editMode ? (
          <Fragment>
            To View <u>m</u>ode
          </Fragment>
        ) : (
          <Fragment>
            To Edit <u>m</u>ode
          </Fragment>
        )}
      </GraphButton>
      <GraphButton onClick={addAudioNode("oscillator")} icon={["fad", "wave-sine"]}>
        Add Oscillator
      </GraphButton>
      <GraphButton onClick={addAudioNode("gain")} icon={["fad", "volume"]}>
        Add Gain
      </GraphButton>
      <GraphButton onClick={addAudioNode("biquadfilter")} icon={["fad", "filter"]}>
        Add Biquad Filter
      </GraphButton>
      <GraphButton onClick={addAudioNode("analyser")} icon={["fad", "analytics"]}>
        Add Analyser
      </GraphButton>
      <GraphButton mode="del" onClick={delSelected} icon={["fad", "trash-alt"]}>
        Remove Selected
      </GraphButton>
    </GraphButtons>
  )
}
