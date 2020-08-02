/** @jsx jsx */
import { Fragment } from "react"
import { jsx, css } from "@emotion/core"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"
import { formatNumber } from "../../../scripts/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DataRow, DataKey, DataNote, H2 } from "./styled"

type Props = {
  audioParams: AudioParams
  addParam: (name?: string, defaultValue?: number) => void
  hideButton?: boolean
}

export default ({ audioParams, addParam, hideButton }: Props) => {
  return (
    <Fragment>
      <H2>Defaults</H2>
      {Object.entries(audioParams).map(([key, params]) => {
        return (
          <DataRow key={key}>
            <div>
              {!hideButton && (
                <FontAwesomeIcon
                  onClick={() => addParam(key, params.defaultValue)}
                  icon={["fal", "layer-plus"]}
                  size="lg"
                  color="LimeGreen"
                  css={css`
                    margin-right: 4px;
                    cursor: pointer;
                    &:hover {
                      transition: 100ms;
                      transform: scale(1.1);
                    }
                  `}
                />
              )}
              <DataKey>{key}:</DataKey> {params.defaultValue}
            </div>
            <DataNote>
              {params.minValue <= Number.MIN_SAFE_INTEGER ? "∞" : formatNumber(params.minValue)} —{" "}
              {params.maxValue >= Number.MAX_SAFE_INTEGER ? "∞" : formatNumber(params.maxValue)}
            </DataNote>
          </DataRow>
        )
      })}
    </Fragment>
  )
}
