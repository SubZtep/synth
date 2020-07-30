import { useRef } from "react"

export default (audioNode: AudioNode) => {
  const keys = useRef(
    Object.keys(audioNode.constructor.prototype).filter(
      // @ts-ignore
      key => audioNode[key].constructor === AudioParam
    )
  )

  return keys.current
}
