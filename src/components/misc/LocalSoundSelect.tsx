/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useEffect, useState, useRef } from "react"
import { validateSound } from "../../scripts/helpers"

type Props = {
  defaultText?: string
  onChange?: (name: string) => void
  unchangeable?: boolean
  disabled?: boolean
  selected?: string
}

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

export default ({ defaultText, onChange, unchangeable, disabled, selected }: Props) => {
  const [names, setNames] = useState<string[]>([])
  const select = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    setNames(retreiveNames())
  }, [])

  return (
    <select
      ref={select}
      value={selected ?? ""}
      disabled={disabled}
      onChange={event => {
        if (onChange) {
          onChange(event.currentTarget.value)
        }
        if (unchangeable) {
          select.current!.value = ""
        }
      }}
      onDoubleClick={() => {
        setNames(retreiveNames())
      }}
    >
      <option value="">{defaultText ?? "--- Please, Select ---"}</option>
      {names.map(name => (
        // <option key={name} value={name} selected={name === selected}>
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}
