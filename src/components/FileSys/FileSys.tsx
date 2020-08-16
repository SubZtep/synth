/* eslint-disable array-callback-return */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "../../styled"
import Widget from "../misc/Widget"
import { setBPM, setNotesPerBeat, setBeatsPerBar, setBars } from "../../features/sounds/soundsSlice"

export default () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const loadFile = (ev: Event) => {
    // @ts-ignore
    const files: FileList = ev.target.files
    if (files.length === 1) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = () => {
        //TODO: Validation
        localStorage.clear()
        const data = JSON.parse(reader.result as string)
        Object.entries(data).forEach(([key, value]) => {
          if (key === "sequencer") {
            dispatch(setBPM((value as any).BPM))
            dispatch(setNotesPerBeat((value as any).notesPerBeat))
            dispatch(setBeatsPerBar((value as any).beatsPerBar))
            dispatch(setBars((value as any).bars))
          } else {
            localStorage.setItem(key, JSON.stringify(value))
          }
        })
        toast.info(`${file.name} loaded`)
      }
      reader.readAsText(file)
    }
  }

  useEffect(() => {
    fileInput.current!.onchange = loadFile
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveFile = (): void => {
    const data: any = {}
    Object.keys(localStorage).map(key => {
      data[key] = JSON.parse(localStorage.getItem(key)!)
    })
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json;charset=utf-8",
      })
      let url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      document.body.appendChild(a)
      a.style.display = "none"
      a.href = url
      a.download = `Synth-${new Date().getTime()}.json`
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    }
  }

  const renderMusic = () => {
    //
  }

  return (
    <Widget title="File System">
      <div>
        <IconButton onClick={() => fileInput.current!.click()}>
          <FontAwesomeIcon icon={["fad", "folder-open"]} fixedWidth size="lg" />
        </IconButton>
        <IconButton onClick={saveFile} title="Save To File">
          <FontAwesomeIcon icon={["fad", "save"]} fixedWidth size="lg" />
        </IconButton>
        <IconButton onClick={renderMusic}>
          <FontAwesomeIcon icon={["fad", "file-music"]} fixedWidth size="lg" />
        </IconButton>
        <input type="file" ref={fileInput} css={{ display: "none" }} />
      </div>
    </Widget>
  )
}
