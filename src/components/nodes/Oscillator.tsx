/** @jsx jsx */
import { jsx } from "@emotion/core"
import { memo, useState, useRef, useEffect, Fragment } from "react"
import { Handle, Position, NodeComponentProps } from "react-flow-renderer"
import { Title, FormWrapper, Hr } from "../elems/nodeform"
import useFrequency from "../../hooks/useFrequency"
import useDetune from "../../hooks/useDetune"
import useType from "../../hooks/useType"
import useAudio from "../../hooks/useAudio"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NodeButton } from "../elems/buttons"

export default memo(({ id }: NodeComponentProps) => {
  // const { audioContext, setNode, reconnectAllNodes, setParam } = useAudio()
  const { audioContext, addNode, delNode } = useAudio()
  const node = useRef(audioContext.createOscillator())
  const frequencyForm = useFrequency(node.current)
  const detuneForm = useDetune(node.current)
  const typeForm = useType(node.current, ["sine", "square", "sawtooth", "triangle"])
  const [start, setStart] = useState(false)

  useEffect(() => {
    node.current.start()
    addNode(id, node.current)
    node.current.disconnect()
    return () => {
      node.current.disconnect()
      delNode(id)
    }
  }, [])

  useEffect(() => {
    if (start) {
      node.current.start()
    } else {
      node.current.disconnect()
      //
    }
  }, [start])

  return (
    <Fragment>
      <Title>Oscillator #{id}</Title>
      <FormWrapper>
        {frequencyForm}
        <Hr />
        {detuneForm}
        <Hr />
        {typeForm}
        <Hr />
        {start ? (
          <NodeButton onClick={() => setStart(false)}>
            <FontAwesomeIcon icon={["fas", "stop-circle"]} />
            Stop
          </NodeButton>
        ) : (
          <NodeButton onClick={() => setStart(true)}>
            <FontAwesomeIcon icon={["fas", "play-circle"]} />
            Play
          </NodeButton>
        )}
      </FormWrapper>
      <Handle type="source" position={Position.Bottom} style={{ background: "#B0BF1A" }} />
    </Fragment>
  )
})
