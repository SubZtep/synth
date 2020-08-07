/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useRef, useEffect, useState, ChangeEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setLoadElements } from "../../features/ux/uxSlice"
import {
  setName,
  setGains,
  setAnalysers,
  setOscillators,
  setBiquadFilters,
  selectName,
} from "../../features/activeSound/activeSoundSlice"
import { validateSound } from "../../scripts/helpers"
import { IconButton } from "../../styled"

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
  const currentName = useSelector(selectName)
  const [names, setNames] = useState<string[]>([])
  const select = useRef<HTMLSelectElement>(null)

  const load = (name: string) => {
    const data = localStorage.getItem(name)
    if (data) {
      const obj = JSON.parse(data)
      if (validateSound(obj)) {
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

  useEffect(() => {
    setNames(retreiveNames())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentName && names.includes(currentName)) {
      load(currentName)
    }
  }, [names])

  const loadSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.currentTarget.value
    select.current!.value = ""
    load(name)
  }

  return (
    <div>
      {/* @ts-ignore */}
      <select as="select" ref={select} onChange={loadSelected}>
        <option value="">--- Please, Select ---</option>
        {names.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <IconButton onClick={() => setNames(retreiveNames())}>
        <FontAwesomeIcon icon={["fad", "folder-open"]} fixedWidth size="lg" />
      </IconButton>
    </div>
  )
}
