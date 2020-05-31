/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useEffect, useState, useRef } from "react"
import useAudio, { NodeProps } from "../../hooks/useAudio"
import { Section, Main, Example } from "../elems/styled"
import useMicrophone from "../../hooks/useMicrophone"
import NodeOverview from "../elems/NodeOverview"

export default function MediaStreamAudioSourceNode({ id }: NodeProps) {
  const { audioContext, setNode } = useAudio()
  const supportedConstraints = useRef(navigator.mediaDevices.getSupportedConstraints())

  const node = useRef<MediaStreamAudioSourceNode>()
  const { devices } = useMicrophone()
  const [inputs, setInputs] = useState<MediaDeviceInfo[]>([])
  const [deviceId, setDeviceId] = useState("default")
  const [start, setStart] = useState(false)

  const [autoGainControl, setAutoGainControl] = useState(false)
  const [channelCount, setChannelCount] = useState(1)
  const [echoCancellation, setEchoCancellation] = useState(false)
  const [noiseSuppression, setNoiseSuppression] = useState(false)
  const [sampleRate, setSampleRate] = useState(44100)
  const [sampleSize, setSampleSize] = useState(8)

  const startStream = async () => {
    try {
      const audio: MediaTrackConstraints = {
        deviceId,
        autoGainControl,
        channelCount,
        echoCancellation,
        noiseSuppression,
        sampleRate,
        sampleSize,
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio })
      node.current = audioContext.createMediaStreamSource(stream)
      setNode(id, node.current)
    } catch (err) {
      alert(err)
    }
  }

  const stopStream = () => {
    node.current?.mediaStream.getTracks().forEach(stream => stream.stop())
    node.current?.disconnect()
  }

  useEffect(() => {
    const fetchDevices = async () => {
      const devs = await devices()
      setInputs(devs)
      if (Object.keys(devs).indexOf("default") === -1) {
        setDeviceId(devs.length > 0 ? devs[0].deviceId : "")
      }
    }
    fetchDevices()

    return () => stopStream()
  }, [])

  useEffect(() => {
    if (start) {
      startStream()
    } else {
      stopStream()
    }
  }, [start])

  return (
    <Section id={id}>
      <h3>Stream</h3>
      <Main>
        <NodeOverview
          id={id}
          link="https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode"
        >
          The <code>MediaStreamAudioSourceNode</code> interface is operates as an audio source whose
          media is received from a microphone or from a remote peer on a WebRTC call.
        </NodeOverview>
        <Example>
          <button className={start ? "active" : undefined} onClick={() => setStart(true)}>
            Start
          </button>
          <button css={{ marginLeft: 6 }} onClick={() => setStart(false)}>
            Stop
          </button>
        </Example>
        <div className="example">
          <div className="field-row-stacked" css={{ width: 300 }}>
            <label>Audio Input:</label>
            <select
              value={deviceId}
              onChange={event => setDeviceId(event.currentTarget.value)}
              disabled={start}
            >
              {inputs.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label.replace(/\s(\(\w+:\w+\))/, "")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="example">
          {supportedConstraints.current["autoGainControl"] && (
            <div className="field-row">
              <input
                type="checkbox"
                id={`${id}_autoGainControl`}
                checked={autoGainControl}
                onChange={() => setAutoGainControl(!autoGainControl)}
                disabled={start}
              />
              <label htmlFor={`${id}_autoGainControl`}>Auto Gain Control</label>
            </div>
          )}
          {supportedConstraints.current["channelCount"] && (
            <div className="field-row">
              <select
                value={channelCount}
                onChange={ev => setChannelCount(+ev.target.value)}
                id={`${id}_channelCount`}
                disabled={start}
              >
                // @ts-ignore
                {Array.apply(null, { length: audioContext.destination.maxChannelCount })
                  .map(Number.call, Number)
                  .map((i: number) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                      {i === 0 ? " - Mono" : i === 1 ? " - Stereo" : ""}
                    </option>
                  ))}
              </select>
              <label htmlFor={`${id}_channelCount`}>Channel Count</label>
            </div>
          )}
          {supportedConstraints.current["echoCancellation"] && (
            <div className="field-row">
              <input
                type="checkbox"
                id={`${id}_echoCancellation`}
                checked={echoCancellation}
                onChange={() => setEchoCancellation(!echoCancellation)}
                disabled={start}
              />
              <label htmlFor={`${id}_echoCancellation`}>Echo Cancellation</label>
            </div>
          )}
          {supportedConstraints.current["noiseSuppression"] && (
            <div className="field-row">
              <input
                type="checkbox"
                id={`${id}_noiseSuppression`}
                checked={noiseSuppression}
                onChange={() => setNoiseSuppression(!noiseSuppression)}
                disabled={start}
              />
              <label htmlFor={`${id}_noiseSuppression`}>Noise Suppression</label>
            </div>
          )}
          {supportedConstraints.current["sampleRate"] && (
            <div className="field-row">
              <select
                id={`${id}_sampleRate`}
                value={sampleRate}
                onChange={ev => setSampleRate(+ev.target.value)}
                disabled={start}
              >
                {[44100, 48000, 88200, 96000, 192000].map(i => (
                  <option key={i} value={i}>
                    {i} Hz
                  </option>
                ))}
              </select>
              <label htmlFor={`${id}_sampleRate`}>Sample Rate</label>
            </div>
          )}
          {supportedConstraints.current["sampleSize"] && (
            <div className="field-row">
              <select
                id={`${id}_sampleSize`}
                value={sampleSize}
                onChange={ev => setSampleSize(+ev.target.value)}
                disabled={start}
              >
                {[8, 16, 24, 32].map(i => (
                  <option key={i} value={i}>
                    {i} bit
                  </option>
                ))}
              </select>
              <label htmlFor={`${id}_sampleSize`}>Sample Size</label>
            </div>
          )}
        </div>
      </Main>
    </Section>
  )
}
