/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Fragment } from "react"
import useAudioParamKeys from "../../../hooks/useAudioParamKeys"

const defP = css`
  margin: 4px 8px;
  font-size: 0.9rem;
  small {
    margin-left: 8px;
    font-size: 0.7rem;
  }
`

type Props = {
  audioNode: AudioNode
  keys?: string[]
}

export default ({ audioNode, keys }: Props) => {
  const audioParams = keys || useAudioParamKeys(audioNode)

  return (
    <Fragment>
      {audioParams.map(key => {
        // @ts-ignore
        const param = audioNode[key] as AudioParam
        return (
          <p css={defP} key={key}>
            {key}: {param.defaultValue}
            <small>
              (
              {param.minValue <= Number.MIN_SAFE_INTEGER &&
              param.maxValue >= Number.MAX_SAFE_INTEGER
                ? `0 - 1 ?`
                : `${param.minValue} — ${param.maxValue}`}
              )
            </small>
          </p>
        )
      })}
    </Fragment>
  )
}
