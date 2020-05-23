import { useContext } from "react"
import { audioContext } from "./audio"
import { RoutingContext } from "../App"

export type AudioNodeType = "OscillatorNode" | "GainNode" | "BiquadFilterNode"

export type NodeType = {
  nodeType: AudioNodeType
  node: AudioNode
  key: string
}

/**
 * Audio helper functions.
 */
export default function useAudio() {
  const store = useContext(RoutingContext)

  const createAudioNode = (nodeType: AudioNodeType) => {
    switch (nodeType) {
      case "OscillatorNode":
        return audioContext.createOscillator()
      case "GainNode":
        return audioContext.createGain()
      case "BiquadFilterNode":
        return audioContext.createBiquadFilter()
    }
  }

  const reconnectAllNodes = (routing: NodeType[]) => {
    if (routing.length > 0) {
      routing.forEach((nt, index) => {
        nt.node.disconnect()
        if (index > 1) {
          routing[index - 1].node.connect(nt.node)
        }
      })
      routing[routing.length - 1].node.connect(audioContext.destination)
    }
    return routing
  }

  const addNodeType = (nodeType: AudioNodeType) => {
    let { routing } = store
    if (nodeType === "OscillatorNode" && routing.length > 0) {
      throw new Error("Only one oscillator and must be the first please.")
    }

    const routingNode: NodeType = {
      nodeType,
      node: createAudioNode(nodeType),
      key: `k${Math.random().toString()}`,
    }

    routing.push(routingNode)
    routing = reconnectAllNodes(routing)
    store.setRouting([...routing])
  }

  const delNodeType = (key: string) => {
    let { routing } = store
    routing = routing.filter(nt => nt.key !== key)
    routing = reconnectAllNodes(routing)
    store.setRouting([...routing])
  }

  const destination = (key: string) => {
    const { routing } = store
    const index = routing.findIndex(nt => nt.key === key)
    return index < routing.length - 1 ? routing[index + 1].node : audioContext.destination
  }

  /**
   * Store that holding audio nodes.
   */
  const nodeTypes = () => store.routing

  return {
    addNodeType,
    delNodeType,
    nodeTypes,
    destination,
  }
}
