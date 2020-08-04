/** @jsx jsx */
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import { AudioParams } from "../../../hooks/useAudioNodeDefs"
import { formatNumber } from "../../../scripts/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DataRow, DataKey, DataNote, H2 } from "./styled"
import { IconButton } from "../../../styled"

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
              <DataKey>{key}:</DataKey> {params.defaultValue}
            </div>
            <DataNote>
              {params.minValue <= Number.MIN_SAFE_INTEGER ? "∞" : formatNumber(params.minValue)} —{" "}
              {params.maxValue >= Number.MAX_SAFE_INTEGER ? "∞" : formatNumber(params.maxValue)}
              {!hideButton && (
                <IconButton onClick={() => addParam(key, params.defaultValue)}>
                  <FontAwesomeIcon icon={["fad", "layer-plus"]} size="lg" />
                </IconButton>
              )}
            </DataNote>
          </DataRow>
        )
      })}
    </Fragment>
  )
}
