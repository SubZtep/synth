/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDispatch } from "react-redux"
import { useRef, useEffect, useState, ChangeEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SelectNames, btnIconStyle, DataStoreItem } from "./styled"
import { setLoadElements } from "../../features/ux/uxSlice"
import {
  setName,
  setGains,
  setAnalysers,
  setOscillators,
  setBiquadFilters,
} from "../../features/activeSound/activeSoundSlice"

const validate = (obj: any) => Object.keys(obj).some(key => key === "elements")
const retreiveNames = () =>
  Object.keys(localStorage).filter(name => {
    let obj
    try {
      obj = JSON.parse(localStorage[name])
    } catch {
      return false
    }
    return validate(obj)
  })

export default () => {
  const dispatch = useDispatch()
  const [names, setNames] = useState<string[]>([])
  const select = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    setNames(retreiveNames())
  }, [])

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
        dispatch(setName(name))
      }
    }
  }

  return (
    <DataStoreItem>
      {/* @ts-ignore */}
      <SelectNames as="select" ref={select} onChange={load}>
        <option value="">--- Please Select ---</option>
        {names.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </SelectNames>
      <FontAwesomeIcon
        onClick={() => setNames(retreiveNames())}
        icon={["fal", "folder-open"]}
        fixedWidth
        size="lg"
        css={btnIconStyle}
      />
    </DataStoreItem>
  )
}
