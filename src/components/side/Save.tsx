/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { useStoreState, Node } from "react-flow-renderer"
import { useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  setName,
  selectName,
  selectAudioNodes,
  BaseNode,
} from "../../features/activeSound/activeSoundSlice"
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
    const addPosition = (node: BaseNode) => ({
      ...node,
      position: (elements.find(element => element.id === node.id) as Node | undefined)?.__rf
        .position,
    })

    try {
      localStorage.setItem(
        name,
        JSON.stringify({
          destination: addPosition({ id: "destination", connectIds: [] }),
          analysers: audioNodes.analysers.flatMap(addPosition),
          gains: audioNodes.gains.flatMap(addPosition),
          biquadFilters: audioNodes.biquadFilters.flatMap(addPosition),
          oscillators: audioNodes.oscillators.flatMap(addPosition),
        })
      )
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
