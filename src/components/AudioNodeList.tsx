/** @jsx jsx */
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import useAudio from "../hooks/useAudio"

export default function AudioNodeList() {
  const { nodeTypes } = useAudio()

  if (nodeTypes().length === 0) {
    return (
      <p>
        The <code>AudioContext</code> interface inherits the nodes an create an audio routing graph.
        <strong>Click on a node name</strong> on the left menu to add to the graph.{" "}
        <span css={{ position: "absolute", fontSize: 21, marginLeft: 4, marginTop: -4 }}>🖯</span>
      </p>
    )
  }

  return <Fragment>{nodeTypes().map(node => node.el)}</Fragment>
}
