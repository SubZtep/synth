import { audioContext, nodes } from "../scripts/audio"

const useAudio = () => {
  const addNode = (id: string, node: AudioNode) => {
    nodes[id] = node
  }

  const delNode = (id: string) => {
    //TODO: check connections
    // if (nodes[id].)
    delete nodes[id]
  }

  const connectNodes = (source: string, target: string) => {
    if (target === "destination") {
      nodes[source].connect(audioContext.destination)
    } else {
      nodes[source].connect(nodes[target])
    }
  }

  const disconnectNodes = (source: string, target: string) => {
    if (target === "destination") {
      nodes[source].disconnect()
    } else {
      nodes[source].disconnect(nodes[target])
    }
  }

  return {
    audioContext,
    addNode,
    delNode,
    connectNodes,
    disconnectNodes,
  }
}

export default useAudio
