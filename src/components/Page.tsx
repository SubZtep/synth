import React from "react"
import AudioNodeList from "./AudioNodeList"

export default function Page() {
  return (
    <main>
      <h1>Audio Nodes</h1>
      <hr />
      <p>Web Audio API - audio nodes showcase.</p>
      <h2 id="intro">Intro</h2>
      <p>
        Not in the
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet">AudioWorklet</a>.
      </p>
      <p>
        For specification visit{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">MDN</a> website.
      </p>
      <p>
        First create <code>AudioContext</code> and get the nodes from it.
      </p>
      <h2 id="nodes">Audio Nodes</h2>

      <AudioNodeList />
    </main>
  )
}
