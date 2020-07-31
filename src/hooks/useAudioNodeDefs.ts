import { useState } from "react"

export type AudioParams = {
  [key: string]: {
    automationRate: "a-rate"
    minValue: number
    maxValue: number
    defaultValue: number
  }
}

export default (type: "AnalyserNode" | "BiquadFilterNode" | "GainNode" | "OscillatorNode") => {
  const [numberOfInputs] = useState(type === "OscillatorNode" ? 0 : 1)
  const [numberOfOutputs] = useState(1)
  const [audioParams] = useState<AudioParams>(
    (): AudioParams => {
      switch (type) {
        case "BiquadFilterNode":
          return {
            frequency: {
              automationRate: "a-rate",
              minValue: 10,
              /** half of the sample rate */
              maxValue: 24000,
              defaultValue: 350,
            },
            detune: {
              automationRate: "a-rate",
              defaultValue: 0,
              minValue: -153600,
              maxValue: 153600,
            },
            Q: {
              automationRate: "a-rate",
              defaultValue: 1,
              minValue: 0.0001,
              maxValue: 1000,
            },
            gain: {
              automationRate: "a-rate",
              /** dB value */
              defaultValue: 0,
              minValue: -40,
              maxValue: 40,
            },
          }
        case "GainNode":
          return {
            gain: {
              automationRate: "a-rate",
              minValue: 0,
              /** half of the sample rate */
              maxValue: 1,
              defaultValue: 1,
            },
          }
        case "OscillatorNode":
          return {
            frequency: {
              automationRate: "a-rate",
              minValue: -24000,
              maxValue: 24000,
              defaultValue: 440,
            },
            detune: {
              automationRate: "a-rate",
              defaultValue: 0,
              minValue: -153600,
              maxValue: 153600,
            },
          }
      }
      return {}
    }
  )

  return {
    numberOfInputs,
    numberOfOutputs,
    audioParams,
  }
}
