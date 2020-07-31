/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useDispatch } from "react-redux"
import { useRef, useState, ChangeEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  setAnalysers,
  setGains,
  setBiquadFilters,
  setOscillators,
} from "../../features/activeSound/activeSoundSlice"
import { setLoadElements } from "../../features/ux/uxSlice"

const validate = (obj: any) => {
  const requiredKeys = ["elements", "analysers", "gains"]
  return Object.keys(obj).filter(key => requiredKeys.includes(key)).length === requiredKeys.length
}

export default () => {
  const select = useRef<HTMLSelectElement>(null)
  const dispatch = useDispatch()
  const [names, setNames] = useState<string[]>([])

  const load = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.currentTarget.value
    select.current!.value = ""
    const data = localStorage.getItem(name)
    if (data) {
      const obj = JSON.parse(data)
      if (validate(obj)) {
        dispatch(setAnalysers(obj.analysers))
        dispatch(setGains(obj.gains))
        dispatch(setBiquadFilters(obj.biquadFilters))
        dispatch(setOscillators(obj.oscillators))
        dispatch(setLoadElements(obj.elements))
      }
    }
  }

  return (
    <div
      css={css`
        transition: 50ms;
        display: flex;
        &:hover {
          select {
            display: block;
          }
          svg {
            transition: 50ms;
            transform: scale(1.05);
          }
        }
      `}
    >
      <select ref={select} css={{ display: "none", marginRight: 8 }} onChange={load}>
        <option value="">--- Please Select ---</option>
        {names.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <FontAwesomeIcon
        icon={["fal", "folder-open"]}
        size="lg"
        onMouseOver={() => setNames(Object.keys(localStorage))}
      />
    </div>
  )
}
