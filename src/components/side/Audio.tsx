/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useStoreState, Node, Edge } from "react-flow-renderer"
import * as snd from "../../features/activeSound/activeSoundSlice"
import {
  restartAudioContext,
  audioNodes,
  AUDIO_CONTEXT_DESTINATION,
  applyParams,
  audioContext,
} from "../../scripts/audio"

type AudioSource = {
  sourceId: string
  audioNode?: AudioScheduledSourceNode
  targetAudioNode: AudioNode
}

export default () => {
  const nodes: Node[] = useStoreState(store => store.nodes)
  const edges: Edge[] = useStoreState(store => store.edges)
  const playFrequency = useSelector(snd.selectPlayFrequency)
  const biquadFilter = useSelector(snd.selectBiquadFilter)
  const oscillator = useSelector(snd.selectOscillator)
  const analyser = useSelector(snd.selectAnalyser)
  const gain = useSelector(snd.selectGain)
  const sources = useRef<AudioSource[]>([])
  const latency = useRef(0)

  const play = (frequency: number) => {
    nodes.forEach(node => {
      let produced
      let audioNode
      switch (node.type) {
        case "oscillator":
          produced = oscillator(node.id) as snd.Oscillator
          audioNode = audioContext.createOscillator() as OscillatorNode
          audioNode.type = produced.type
          audioNode.frequency.setValueAtTime(frequency, 0)
          applyParams(audioNode, produced.params)
          audioNodes.set(node.id, audioNode)
          break
        case "gain":
          produced = gain(node.id) as snd.Gain
          audioNode = audioNodes.get(node.id) as GainNode
          applyParams(audioNode, produced.params)
          break
        case "biquadfilter":
          produced = biquadFilter(node.id) as snd.BiquadFilter
          audioNode = audioNodes.get(node.id) as BiquadFilterNode
          applyParams(audioNode, produced.params)
          break
      }
    })

    sources.current.forEach(source => {
      const sourceNode = audioNodes.get(source.sourceId) as AudioScheduledSourceNode
      sourceNode.connect(source.targetAudioNode)
      sourceNode.start()
    })
  }

  const stop = () => {
    sources.current.forEach(source => {
      const sourceNode = audioNodes.get(source.sourceId) as AudioScheduledSourceNode
      sourceNode.stop()
      sourceNode.disconnect()
      audioNodes.delete(source.sourceId)
    })
  }

  useEffect(() => {
    if (playFrequency !== null) {
      const t = audioContext.currentTime
      play(playFrequency)
      latency.current = audioContext.currentTime - t

      return () => {
        stop()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playFrequency])

  const reloadAudio = async () => {
    const ctx = await restartAudioContext()
    const sourceIds: string[] = []
    sources.current = []

    nodes.forEach(node => {
      let produced
      let audioNode
      switch (node.type) {
        case "oscillator":
          produced = oscillator(node.id) as snd.Oscillator
          if (produced === undefined) throw new Error("Not Produced Oscillator (reload)")
          sourceIds.push(node.id)
          break
        case "gain":
          produced = gain(node.id) as snd.Gain
          if (produced === undefined) throw new Error("Not Produced Gain (reload)")
          audioNodes.set(node.id, ctx.createGain())
          break
        case "analyser":
          produced = analyser(node.id) as snd.Analyser
          if (produced === undefined) throw new Error("Not Produced Analyser (reload)")
          audioNode = ctx.createAnalyser()
          audioNode.fftSize = produced.fftSize
          audioNodes.set(node.id, audioNode)
          break
        case "biquadfilter":
          produced = biquadFilter(node.id) as snd.BiquadFilter
          if (produced === undefined) throw new Error("Not Produced BiquadFilter (reload)")
          audioNode = ctx.createBiquadFilter()
          audioNode.type = produced.type
          audioNodes.set(node.id, audioNode)
          break
      }
    })

    edges.forEach(edge => {
      const target =
        edge.target === AUDIO_CONTEXT_DESTINATION ? ctx.destination : audioNodes.get(edge.target)!

      if (sourceIds.includes(edge.source)) {
        sources.current.push({
          sourceId: edge.source,
          targetAudioNode: target,
        })
      } else {
        audioNodes.get(edge.source)!.connect(target)
      }
    })
  }

  useEffect(() => {
    ;(async () => {
      try {
        await reloadAudio()
      } catch (e) {
        console.error(e)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges.length])

  return (
    <div css={{ backgroundColor: "#364156", padding: 8 }}>
      <div
        css={{
          fontFamily: "Tomorrow",
          fontSize: "0.8rem",
          fontWeight: 500,
          color: "#D66853",
          backgroundColor: "#000",
          opacity: 0.3,
        }}
      >
        Holding Audio Player
      </div>
      Latency of oscillators: <strong>{latency.current}ms</strong>.
    </div>
  )
}
