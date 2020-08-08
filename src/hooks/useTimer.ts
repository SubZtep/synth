/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react"

const useTimer = (callback: () => void, ms: number | null) => {
  const [time, setTime] = useState(false)
  const timeRef = useRef(false)

  useEffect(() => {
    let timer: number
    if (ms !== null) {
      timer = window.setInterval(() => {
        timeRef.current = !timeRef.current
        setTime(timeRef.current)
      }, ms)
    }
    return () => {
      if (ms !== null) {
        window.clearInterval(timer)
      }
    }
  }, [ms])

  useEffect(() => {
    if (ms !== null) {
      callback()
    }
  }, [time])
}

export default useTimer
