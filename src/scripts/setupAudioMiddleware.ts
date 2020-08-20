import { Middleware, PayloadAction, Dispatch, AnyAction } from "@reduxjs/toolkit"
import { Gain, Analyser, BiquadFilter, Oscillator } from "../audio"
import { sound } from "./audio"

const setupAudioMiddleware: Middleware = () => (next: Dispatch<AnyAction>) => (
  action: PayloadAction
) => {
  if (action.type.startsWith("activeSound/") && !action.type.endsWith("setName")) {
    const asActionType = action.type.substring(action.type.indexOf("/") + 1)
    switch (asActionType) {
      case "emptyNodes":
        sound.destroyAudioNodes()
        break
      case "setGain":
        sound.setGain((action.payload as unknown) as Gain)
        break
      case "setAnalyser":
        sound.setAnalyser((action.payload as unknown) as Analyser)
        break
      case "setBiquadFilter":
        sound.setBiquadFilter((action.payload as unknown) as BiquadFilter)
        break
      case "setOscillator":
        sound.setOscillator((action.payload as unknown) as Oscillator)
        break
      case "delGain":
      case "delAnalyser":
      case "delBiquadFilter":
      case "delOscillator":
        sound.delNode((action.payload as unknown) as string)
        break
      case "addConnect":
        sound.addConnect((action.payload as any).source, (action.payload as any).target)
        break
      case "delConnect":
        sound.delConnect((action.payload as any).source, (action.payload as any).target)
        break
      case "setPlayFrequency":
        if (action.payload === null) {
          sound.stop()
        } else {
          sound.play((action.payload as unknown) as number)
        }
        break
    }
  }

  next(action)
}

export default setupAudioMiddleware
