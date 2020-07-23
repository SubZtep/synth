import { audioContext, nodes } from "../scripts/audio"
import { AUDIO_CONTEXT_DESTINATION } from "../types"

const useAudioNodes = () => {
  const connectNodes = (source: string, target: string) => {
    if (target === AUDIO_CONTEXT_DESTINATION) {
      nodes.get(source)?.connect(audioContext.destination)
    } else {
      const destination = nodes.get(target)
      if (destination) nodes.get(source)?.connect(destination)
    }
  }

  const disconnectNodes = (source: string, target: string) => {
    if (target === AUDIO_CONTEXT_DESTINATION) {
      nodes.get(source)?.disconnect()
    } else {
      const destination = nodes.get(target)
      if (destination) nodes.get(source)?.disconnect(destination)
    }
  }

  const delNode = (id: string) => {
    const node = nodes.get(id)
    node?.disconnect()
    nodes.delete(id)
  }

  return {
    delNode,
    connectNodes,
    disconnectNodes,
  }
}

export default useAudioNodes
