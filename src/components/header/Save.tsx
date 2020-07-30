/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useSelector } from "react-redux"
import { useStoreState } from "react-flow-renderer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { selectName, selectAnalysers } from "../../features/activeSound/activeSoundSlice"

export default () => {
  const elements = useStoreState(store => store.elements)
  const name = useSelector(selectName)
  const analysers = useSelector(selectAnalysers)

  const save = () => {
    localStorage.setItem(name, JSON.stringify({ elements, analysers }))
  }

  return (
    <FontAwesomeIcon
      icon={["fal", "save"]}
      size="lg"
      onClick={save}
      css={css`
        cursor: pointer;
        transition: 50ms;
        &:hover {
          transition: 50ms;
          transform: scale(1.05);
        }
      `}
    />
  )
}
