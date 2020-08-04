/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectReloadAudio, toggleReloadAudio } from "../../features/ux/uxSlice"
import * as snd from "../../features/activeSound/activeSoundSlice"
import {
  restartAudioContext,
  audioNodes,
  AUDIO_CONTEXT_DESTINATION,
  applyParams,
  audioContext,
  destroyAudioNodes,
} from "../../scripts/audio"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { WidgetRows } from "../../styled"

type AudioSource = {
  sourceId: string
  audioNode?: AudioScheduledSourceNode
  targetAudioNode: AudioNode
}

export default () => {
  const dispatch = useDispatch()
  const reloadAudio = useSelector(selectReloadAudio)
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

  const reloadAudioNodes = async () => {
    toast.info("Restart Audio Context")
    destroyAudioNodes()
    await restartAudioContext()
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
    if (reloadAudio) {
      dispatch(toggleReloadAudio())
      if (!restarting.current) {
        restarting.current = true
        ;(async () => {
          try {
            await reloadAudioNodes()
            restarting.current = false
          } catch (e) {
            toast.error(e.message)
          }
        })()
      }
    }
  }, [reloadAudio])

  return (
    <WidgetRows>
      <button onClick={() => reloadAudioNodes()} css={{ position: "relative" }}>
        <FontAwesomeIcon
          fixedWidth
          icon={["fad", "sync"]}
          size="lg"
          css={{ position: "absolute", top: 4, right: 6 }}
        />
        Force Reload Audio Context
      </button>
      <button onClick={() => toast.clearWaitingQueue()} css={{ position: "relative" }}>
        <FontAwesomeIcon
          fixedWidth
          icon={["fad", "comment-alt-slash"]}
          size="lg"
          css={{ position: "absolute", top: 4, right: 6 }}
        />
        Clear Notification Queue
      </button>

      <div css={{ display: "flex" }}>
        <div css={{ width: "50%" }}>
          <label htmlFor="playDelayInput">Play delay:</label>{" "}
          <input
            id="playDelayInput"
            type="number"
            min={0}
            max={1}
            step={0.01}
            defaultValue={playDelay.current}
            onChange={event => {
              playDelay.current = event.currentTarget.valueAsNumber
            }}
          />
        </div>
        <div css={{ width: "50%" }}>
          Setup time: <strong>{latency.current}ms</strong>.
        </div>
      </div>

      <div css={{ fontSize: "0.58rem", color: "limegreen", textDecoration: "underline" }}>
        Save works but kill the app, probably for the good coz memory leak suspected!
      </div>
    </WidgetRows>
  )
}
