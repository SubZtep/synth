/** @jsx jsx */
import { Fragment } from "react"
import { jsx, css } from "@emotion/core"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"
import { numberWithSpaces } from "../../../scripts/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
  audioParams: AudioParams
  addParam: (name?: string, defaultValue?: number) => void
}

export default ({ audioParams, addParam }: Props) => {
  return (
    <Fragment>
      {Object.entries(audioParams).map(([key, params]) => {
        return (
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 6px;
              font-size: 0.9rem;
              margin: 0 6px;
              line-height: 1.35rem;
            `}
            key={key}
          >
            <div>
              <FontAwesomeIcon
                onClick={() => addParam(key, params.defaultValue)}
                icon={["fal", "layer-plus"]}
                size="lg"
                color="LimeGreen"
                css={css`
                  cursor: pointer;
                  &:hover {
                    transition: 100ms;
                    transform: scale(1.1);
                  }
                `}
              />
              <span
                css={css`
                  font-weight: 100;
                  margin-left: 3px;
                `}
              >
                {key}:
              </span>{" "}
              {params.defaultValue}
            </div>
            <div
              css={css`
                font-size: 0.8rem;
                color: #999;
                word-spacing: -1px;
              `}
            >
              {params.minValue <= Number.MIN_SAFE_INTEGER ? "∞" : numberWithSpaces(params.minValue)}{" "}
              —{" "}
              {params.maxValue >= Number.MAX_SAFE_INTEGER ? "∞" : numberWithSpaces(params.maxValue)}
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}
