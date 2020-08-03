/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import * as snd from "../../features/activeSound/activeSoundSlice"
import {
  restartAudioContext,
  audioNodes,
  AUDIO_CONTEXT_DESTINATION,
  applyParams,
  audioContext,
} from "../../scripts/audio"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { WidgetRows } from "../../styled"

type AudioSource = {
  sourceId: string
  audioNode?: AudioScheduledSourceNode
  targetAudioNode: AudioNode
}

export default () => {
  const playFrequency = useSelector(snd.selectPlayFrequency)
  const biquadFilter = useSelector(snd.selectBiquadFilter)
  const oscillator = useSelector(snd.selectOscillator)
  const analyser = useSelector(snd.selectAnalyser)
  const gain = useSelector(snd.selectGain)
  const biquadFilters = useSelector(snd.selectBiquadFilters)
  const oscillators = useSelector(snd.selectOscillators)
  const analysers = useSelector(snd.selectAnalysers)
  const gains = useSelector(snd.selectGains)
  const playDelay = useRef(0.1)
  const restarting = useRef(false)
  const latency = useRef(0)

  const play = (frequency: number) => {
    const t = audioContext.currentTime + playDelay.current
    let audioNode
    let produced

    gains.forEach(node => {
      audioNode = audioNodes.get(node.id)
      if (audioNode === undefined) throw new Error("No Gain (for apply params)")
      produced = gain(node.id) as snd.Gain
      if (produced === undefined) throw new Error("No produced Gain (for apply params)")
      applyParams(audioNode, produced.params, t)
    })

    biquadFilters.forEach(node => {
      audioNode = audioNodes.get(node.id)
      if (audioNode === undefined) throw new Error("No BiquadFilter (for apply params)")
      produced = biquadFilter(node.id) as snd.BiquadFilter
      if (produced === undefined) throw new Error("No produced BiquadFilter (for apply params)")
      applyParams(audioNode, produced.params, t)
    })

    oscillators.forEach(node => {
      const produced = oscillator(node.id) as snd.Oscillator
      if (produced === undefined) throw new Error("No Oscillator (play error!)")
      const audioNode = audioContext.createOscillator() as OscillatorNode
      audioNode.type = produced.type
      audioNode.frequency.setValueAtTime(frequency, 0)
      applyParams(audioNode, produced.params, t)
      node.connectIds.forEach(
        toId =>
          void audioNode.connect(
            toId === AUDIO_CONTEXT_DESTINATION ? audioContext.destination : audioNodes.get(toId)!
          )
      )
      audioNodes.set(node.id, audioNode)
      audioNode.start(t)
    })
  }

  const stop = () => {
    oscillators.forEach(node => {
      const audioNode = audioNodes.get(node.id) as AudioScheduledSourceNode
      if (audioNode === undefined) {
        toast.error(`${node.id} source node is missing for stop`)
        return
      }
      audioNode.stop()
      audioNode.disconnect()
      audioNodes.delete(node.id)
    })
  }

  useEffect(() => {
    if (playFrequency !== null) {
      console.time("play")
      const t = Date.now()
      try {
        play(playFrequency)
      } catch (e) {
        toast.error(e.message)
      }
      console.timeEnd("play")
      latency.current = Date.now() - t

      return () => stop()
    }
  }, [playFrequency])

  const reloadAudio = async () => {
    toast.info("Restart Audio Context")
    await restartAudioContext()
    audioNodes.clear()
    let produced
    let audioNode

    // Create AudioNodes
    gains.forEach(node => {
      produced = gain(node.id) as snd.Gain
      if (produced === undefined) throw new Error("No Gain (waiting for audio graph)")
      audioNode = audioContext.createGain()
      audioNodes.set(node.id, audioNode)
    })
    analysers.forEach(node => {
      produced = analyser(node.id) as snd.Analyser
      if (produced === undefined) throw new Error("No Analyser (waiting for audio graph)")
      audioNode = audioContext.createAnalyser()
      audioNode.fftSize = produced.fftSize
      audioNodes.set(node.id, audioNode)
    })
    biquadFilters.forEach(node => {
      produced = biquadFilter(node.id) as snd.BiquadFilter
      if (produced === undefined) throw new Error("No BiquadFilter (waiting for audio graph)")
      audioNode = audioContext.createBiquadFilter()
      audioNode.type = produced.type
      audioNodes.set(node.id, audioNode)
    })

    // Connect AudioNodes
    ;[...gains, ...analysers, ...biquadFilters].forEach(({ id, connectIds }) => {
      connectIds.forEach(toId => {
        const fromNode = audioNodes.get(id)
        if (!fromNode) {
          toast.error(`${id} audio node not found for from connect`)
          return
        }
        const toNode =
          toId === AUDIO_CONTEXT_DESTINATION ? audioContext.destination : audioNodes.get(toId)
        if (!toNode) {
          toast.error(`${toId} audio node not found for to connect`)
          return
        }
        fromNode.connect(
          toId === AUDIO_CONTEXT_DESTINATION ? audioContext.destination : audioNodes.get(toId)!
        )
      })
    })
  }

  useEffect(() => {
    if (!restarting.current) {
      restarting.current = true
      ;(async () => {
        try {
          await reloadAudio()
          restarting.current = false
        } catch (e) {
          toast.error(e.message)
        }
      })()
    }
  }, [biquadFilters, oscillators, analysers, gains])

  return (
    <WidgetRows>
      <button onClick={() => reloadAudio()}>
        <FontAwesomeIcon fixedWidth icon={["fas", "sync"]} size="lg" />
        Force Reload Audio Context
      </button>

      <div>
        <div>
          <label htmlFor="playDelayInput">Play delay:</label>
          <output name="pd" htmlFor="playDelayInput"></output>
        </div>
        <input
          id="playDelayInput"
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={playDelay.current}
          onChange={event => {
            playDelay.current = event.currentTarget.valueAsNumber
          }}
        />
      </div>
      <div>
        <div>Setup for Play:</div>
        <div>
          <strong>{latency.current}ms</strong>.
        </div>
      </div>
    </WidgetRows>
  )
}
