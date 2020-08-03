/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
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
import { validateSound } from "../../scripts/helpers"

const retreiveNames = () =>
  Object.keys(localStorage).filter(name => {
    let obj
    try {
      obj = JSON.parse(localStorage[name])
    } catch {
      return false
    }
    return validateSound(obj)
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
      if (validateSound(obj)) {
        console.log("!ANAL", obj.analysers)
        dispatch(setAnalysers(obj.analysers))
        dispatch(setGains(obj.gains))
        dispatch(setBiquadFilters(obj.biquadFilters))
        dispatch(setOscillators(obj.oscillators))
        dispatch(setLoadElements(obj.elements))
        dispatch(setName(name))
        toast.success(`Sound "${name}" loaded`)
        return
      }
    }
    toast.error(`Error loading "${name}" sound`)
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
