/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { useStoreState, Elements } from "react-flow-renderer"
import { useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { btnIconStyle, InputName, DataStoreItem } from "./styled"
import { setName, selectName, selectAudioNodes } from "../../features/activeSound/activeSoundSlice"

export default () => {
  const dispatch = useDispatch()
  const name = useSelector(selectName)
  const input = useRef<HTMLInputElement>(null)
  const audioNodes = useSelector(selectAudioNodes)
  const elements = useStoreState(store => store.elements)

  useEffect(() => {
    input.current!.value = name
  }, [name])

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
    <DataStoreItem>
      <InputName
        ref={input}
        type="text"
        defaultValue={name}
        onChange={event => dispatch(setName(event.target.value))}
        onFocus={event => event.target.select()}
      />
      <FontAwesomeIcon
        onClick={save}
        icon={["fal", "save"]}
        fixedWidth
        size="lg"
        css={btnIconStyle}
      />
    </DataStoreItem>
  )
}
