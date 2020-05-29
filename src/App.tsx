import React, { createContext, useState } from "react"
import Menu from "./components/Menu"
import Page from "./components/Page"
import { AudioNodeBundle } from "./hooks/useAudio"

type RoutingContextType = {
  routing: AudioNodeBundle[]
  setRouting: (routing: AudioNodeBundle[]) => void
}

export const RoutingContext = createContext<RoutingContextType>({
  routing: [],
  setRouting: () => {},
})

export default function App() {
  const [routing, setRouting] = useState<AudioNodeBundle[]>([])
  return (
    <RoutingContext.Provider value={{ routing, setRouting }}>
      <Menu />
      <Page />
    </RoutingContext.Provider>
  )
}
