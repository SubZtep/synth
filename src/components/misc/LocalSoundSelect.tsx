/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { useRef } from "react"
import { jsx } from "@emotion/core"
import { useSelector } from "react-redux"
import { selectSoundNames } from "../../features/sounds/soundsSlice"

type Props = {
  defaultText?: string
  onChange?: (name: string) => void
  unchangeable?: boolean
  disabled?: boolean
  selected?: string
  title?: string
}

export default ({ defaultText, onChange, unchangeable, disabled, selected, title }: Props) => {
  const soundNames = useSelector(selectSoundNames)
  const select = useRef<HTMLSelectElement>(null)

  return (
    <select
      ref={select}
      value={selected}
      disabled={disabled}
      title={title}
      onChange={event => {
        if (onChange) {
          onChange(event.currentTarget.value)
        }
        if (unchangeable) {
          select.current!.value = ""
        }
      }}
    >
      <option value="">{defaultText ?? "--- Please, Select ---"}</option>
      {soundNames.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}
