/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useEffect, useState, Fragment } from "react"
import { DataRow, DataKey, DataNote, H2 } from "./styled"
import { AudioParamSetting } from "../../../audio"

/** Processed AudioParamSetting for display on coordinate system */
type CoordParam = {
  time: number
  value: number
  //TODO: add curve data
}

type Props = {
  params: AudioParamSetting[]
  showCoord?: boolean
}

export default ({ params, showCoord }: Props) => {
  const [maxTime, setMaxTime] = useState(0)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [coordParams, setCoordParams] = useState<CoordParam[]>([])

  useEffect(() => {
    if (!showCoord) return

    const values = params.map(param => param.values).flat(2)
    setMinValue(Math.min(...values))
    setMaxValue(Math.max(...values))

    const cps: CoordParam[] = []

    setMaxTime(
      params.reduce((total, param) => {
        let time = total
        let value
        switch (param.call) {
          case "setValueAtTime":
          case "linearRampToValueAtTime":
          case "exponentialRampToValueAtTime":
            value = param.values[0] as number
            time += param.values[1] as number
            break
          case "setTargetAtTime":
            value = param.values[0] as number
            time += param.values[2] as number
            break
          case "setValueCurveAtTime":
            value = Math.max(...(param.values[0] as number[]))
            time += param.values[2] as number
            break
        }

        cps.push({ time, value })

        return time
      }, 0)
    )

    setCoordParams(cps)
  }, [params, showCoord])

  if (params.length === 0) {
    return <Fragment />
  }

  return (
    <Fragment>
      <H2>Adjusted Params</H2>

      {showCoord && maxTime > 0 && (
        <div>
          <svg
            viewBox={`0 0 ${maxTime} ${minValue + maxValue}`}
            css={{ width: "100%", height: 50, boxShadow: "inset 0 0 25px red" }}
          >
            {coordParams.map(cp => (
              <circle
                key={JSON.stringify(cp)}
                cx={cp.time}
                cy={cp.value}
                r={(minValue + maxValue) / 10}
                fill="#11151c"
              />
            ))}
          </svg>
          <div css={{ fontSize: "0.8rem", color: "#D66853", marginTop: -18 }}>
            maxTime: {maxTime}, minValue: {minValue}, maxValue: {maxValue}
          </div>
        </div>
      )}

      {params.map((param, index) => (
        <DataRow key={JSON.stringify(param) + index.toString()}>
          <div>
            <DataKey>{param.name}:</DataKey> {param.values.join(", ")}
          </div>
          <DataNote>{param.call}</DataNote>
        </DataRow>
      ))}
    </Fragment>
  )
}
