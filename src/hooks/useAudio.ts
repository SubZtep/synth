import { useContext, createElement } from "react"
import { audioContext } from "../scripts/audio"
import { RoutingContext } from "../App"

export type AudioNodeBundle = {
  el: JSX.Element
  id: string
  params: {
    [key: string]: any
  }
  node?: AudioNode
}

/**
 * Audio helper functions.
 */
export default function useAudio() {
  const store = useContext(RoutingContext)

  const reconnectAllNodes = () => {
    let { routing } = store
    routing = reconnectAllNodesMiddleware(routing)
    store.setRouting([...routing])
  }

  const reconnectAllNodesMiddleware = (routing: AudioNodeBundle[]) => {
    console.log({ routing })
    if (routing.length > 0) {
      routing.forEach((bundle, index) => {
        bundle.node!.disconnect()
        if (index > 0) {
          const from = routing![index - 1]
          if (from.el.type.name === OscillatorNode.name && from.params.start === false) {
            return
          }
          console.log(`${from.el.type.name} -> ${bundle.el.type.name}`)
          from.node!.connect(bundle.node!)
        }
      })
      console.log(`${routing[routing.length - 1].el.type.name} -> audioContext.destination`)
      routing[routing.length - 1].node!.connect(audioContext.destination)
    }
    return routing
  }

  const createAudioNodeBundle = (nodeType: string) => {
    let { routing } = store
    const inputNodes = [OscillatorNode.name, MediaElementAudioSourceNode.name]
    if (
      inputNodes.includes(nodeType) &&
      routing.find(bundle => inputNodes.includes(bundle.el.type.name))
    ) {
      alert("Input Node Already Exists!")
      return
    }

    const id = "k" + Math.random().toString()
    const node: AudioNodeBundle = {
      el: createElement(require(`../components/nodes/${nodeType}`).default, { key: id, id }),
      id,
      params: {},
    }
    routing.push(node)
    store.setRouting([...routing])
  }

  const setNode = (id: string, node: AudioNode) => {
    let { routing } = store
    routing.find(bundle => bundle.id === id)!.node = node
    store.setRouting([...routing])
    reconnectAllNodes()
  }

  const setParam = (id: string, key: string, value: any) => {
    let { routing } = store
    routing.find(node => node.id === id)!.params[key] = value
    store.setRouting([...routing])
  }

  const param = (id: string, key: string) => store.routing.find(node => node.id === id)!.params[key]

  const removeAudioNodeBundle = (id: string) => {
    let { routing } = store
    routing = routing.filter(bundle => bundle.id !== id)
    routing = reconnectAllNodesMiddleware(routing)
    store.setRouting([...routing])
  }

  /**
   * Store that holding audio nodes.
   */
  const nodeTypes = () => store.routing

  return {
    audioContext,
    createAudioNodeBundle,
    setNode,
    reconnectAllNodes,
    removeAudioNodeBundle,
    setParam,
    param,
    nodeTypes,
  }
}
