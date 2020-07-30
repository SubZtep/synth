/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useSelector } from "react-redux"
import { useStoreState, Elements } from "react-flow-renderer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { selectName, selectAudioNodes } from "../../features/activeSound/activeSoundSlice"

export default () => {
  const elements = useStoreState(store => store.elements)
  const name = useSelector(selectName)
  const audioNodes = useSelector(selectAudioNodes)

  const save = () => {
    localStorage.setItem(
      name,
      JSON.stringify({
        elements: elements.map((element: any) => {
          if (element.__rf !== undefined) {
            if (element.__rf.position !== undefined) {
              element.position = element.__rf.position
            }
            delete element.__rf
          }
          return element
        }) as Elements,
        ...audioNodes,
      })
    )
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
