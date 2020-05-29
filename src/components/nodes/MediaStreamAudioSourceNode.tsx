/** @jsx jsx */
import { jsx } from "@emotion/core"
import useMicrophone from "../../hooks/useMicrophone"
import NodeOverview from "../elems/NodeOverview"
import { useEffect, useState, useRef } from "react"
import useAudio from "../../hooks/useAudio"

export default function MediaElementAudioSourceNode({ id }: { id: string }) {
  const { audioContext, setNode } = useAudio()
  // const node = useRef(audioContext.createMediaStreamSource())
  const supportedConstraints = useRef(navigator.mediaDevices.getSupportedConstraints())

  const node = useRef<MediaStreamAudioSourceNode>()
  const { devices } = useMicrophone()
  const [inputs, setInputs] = useState<MediaDeviceInfo[]>([])
  const [deviceId, setDeviceId] = useState("default")

  const [autoGainControl, setAutoGainControl] = useState(false)
  const [channelCount, setChannelCount] = useState(1)
  const [echoCancellation, setEchoCancellation] = useState(false)
  const [noiseSuppression, setNoiseSuppression] = useState(false)
  const [sampleRate, setSampleRate] = useState(44100)
  const [sampleSize, setSampleSize] = useState(8)

  useEffect(() => {
    const fetchDevices = async () => {
      const devs = await devices()
      setInputs(devs)
      if (Object.keys(devs).indexOf("default") === -1) {
        setDeviceId(devs.length > 0 ? devs[0].deviceId : "")
      }
    }
    fetchDevices()
  }, [])

  useEffect(() => {
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
        const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        console.log(stream)
        node.current = audioContext.createMediaStreamSource(stream)
        setNode(id, node.current)
      } catch (err) {
        alert(err)
      }
    }
    startStream()
  }, [
    deviceId,
    autoGainControl,
    channelCount,
    echoCancellation,
    noiseSuppression,
    sampleRate,
    sampleSize,
  ])

  return (
    <section className="component">
      <h3>Stream</h3>
      <div>
        <NodeOverview
          id={id}
          link="https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode"
        >
          The <code>MediaStreamAudioSourceNode</code> interface is operates as an audio source whose
          media is received from a microphone or from a remote peer on a WebRTC call.
        </NodeOverview>
        <div className="example">
          <div className="field-row-stacked" css={{ width: 200 }}>
            <label>Audio Input:</label>
            <select value={deviceId} onChange={event => setDeviceId(event.currentTarget.value)}>
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
      </div>
    </section>
  )
}
