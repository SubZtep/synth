import React, { Fragment } from "react"
import { AudioParamSetting } from "./AudioParamForm"
import { DataRow, DataKey, DataNote } from "../elems/styled"

type Props = {
  params: AudioParamSetting[]
}

export default ({ params }: Props) => (
  <Fragment>
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
