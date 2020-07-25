/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { audioContext, nodes } from "../scripts/audio"
import { addAnalyser, setAnalyser, delAnalyser } from "../features/activeSound/activeSoundSlice"

export const fftSizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768] as const
export type FFTSize = typeof fftSizes[number]

export default (id: string, fftSize: FFTSize, color: string, lineWidth: number) => {
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    nodes.set(id, audioContext.createAnalyser())
    dispatch(addAnalyser({ id, fftSize, color, lineWidth }))
    setReady(true)

    return () => void dispatch(delAnalyser(id))
  }, [id, dispatch])

  useEffect(() => {
    ;(nodes.get(id) as AnalyserNode).fftSize = fftSize
    dispatch(setAnalyser({ id, fftSize, color, lineWidth }))
  }, [id, fftSize])

  useEffect(() => {
    dispatch(setAnalyser({ id, fftSize, color, lineWidth }))
  }, [id, color, lineWidth])

  return {
    ready,
  }
}
