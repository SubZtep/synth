/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { useStoreState, Elements } from "react-flow-renderer"
import { useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setName, selectName, selectAudioNodes } from "../../features/activeSound/activeSoundSlice"
import { IconButton } from "../../styled"

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
    //FIXME: after succesful save it kills the app
    const elems = elements.map((element: any) => {
      if (element.__rf !== undefined) {
        if (element.__rf.position !== undefined) {
          element.position = element.__rf.position
        }
        delete element.__rf
      }
      return element
    }) as Elements

    try {
      localStorage.setItem(name, JSON.stringify({ elements: elems, ...audioNodes }))
      toast.success(`Sound "${name}" saved`)
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div>
      <input
        ref={input}
        type="text"
        defaultValue={name}
        onChange={event => dispatch(setName(event.target.value))}
        onFocus={event => event.target.select()}
      />
      <IconButton onClick={save}>
        <FontAwesomeIcon icon={["fad", "save"]} fixedWidth size="lg" />
      </IconButton>
    </div>
  )
}
