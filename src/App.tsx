import React, { createContext, useState } from "react"
import Menu from "./components/Menu"
import Page from "./components/Page"
import { NodeType } from "./hooks/useAudio"

type RoutingContextType = {
  routing: NodeType[]
  setRouting: (routing: NodeType[]) => void
}

export const RoutingContext = createContext<RoutingContextType>({
  routing: [],
  setRouting: () => {},
})

export default function App() {
  const [routing, setRouting] = useState<NodeType[]>([])
  return (
    <RoutingContext.Provider value={{ routing, setRouting }}>
      <Menu />
      <Page />
    </RoutingContext.Provider>
  )
}
