import { useContext, createElement } from "react"
import { audioContext } from "../scripts/audio"
import { RoutingContext } from "../App"

const inputNodes = [
  OscillatorNode.name,
  MediaElementAudioSourceNode.name,
  MediaStreamAudioSourceNode.name,
]

export type AudioNodeBundle = {
  el: JSX.Element
  id: string
  params: {
    [key: string]: any
  }
  node?: AudioNode
}

export type NodeProps = {
  id: string
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
    if (routing.length > 0) {
      routing.forEach((bundle, index) => {
        if (bundle.node) {
          bundle.node.disconnect()
          if (index > 0) {
            const from = routing![index - 1]
            if (
              !from.node ||
              (from.el.type.name === OscillatorNode.name && from.params.start === false)
            ) {
              return
            }
            from.node.connect(bundle.node)
          }
        }
      })
      routing[routing.length - 1].node?.connect(audioContext.destination)
    }
    return routing
  }

  const createAudioNodeBundle = (nodeType: string) => {
    let { routing } = store
    let pushAfter = true

    if (inputNodes.includes(nodeType)) {
      const index = routing.findIndex(bundle => inputNodes.includes(bundle.el.type.name))
      if (index !== -1) {
        if (!window.confirm(`Input Node Already Exists!\n\nWould you like to replace it?`)) {
          return
        }
        routing.splice(index, 1)
      }
      pushAfter = false
    }

    const id = "k" + Math.random().toString()
    const node: AudioNodeBundle = {
      el: createElement(require(`../components/nodes/${nodeType}`).default, { key: id, id }),
      id,
      params: {},
    }
    routing[pushAfter ? "push" : "unshift"](node)
    store.setRouting([...routing])
    return node
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
