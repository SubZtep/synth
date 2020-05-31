/** @jsx jsx */
import { jsx } from "@emotion/core"
import AudioNodeList from "./AudioNodeList"

export default function Page() {
  return (
    <main css={{ width: 600 }}>
      <h1>Audio Nodes</h1>
      <hr />
      <p>Web Audio API — Audio Nodes Showcase</p>
      <h2 id="intro">Intro</h2>
      <p>
        Audio Nodes are a significant part of the <strong>Web Audio API</strong>, provide the
        capability to process audio just like in a professional desktop application. In this page I
        just try some of the existing nodes, surely to achieve the imagined goal the scriptable{" "}
        <code>AudioWorklet</code> interface is to look forward.
      </p>

      <h2 id="nodes">Audio Nodes</h2>

      <AudioNodeList />

      <h2 id="outro">Outro</h2>

      <p>
        The main institution of this page is to getting more familiar with the{" "}
        <a href="https://webaudio.github.io/web-audio-api/">Web Audio API</a> and practice some{" "}
        <a href="https://create-react-app.dev/">React</a>. It can't be complete but can be updated
        from time to time.{" "}
        <strong>
          <a href="https://github.com/SubZtep/audionodes">Its GitHub Page</a>
        </strong>{" "}
        is open for issues, also fork it, create a pull request if you mind, license the{" "}
        <a href="https://unlicense.org/">Unlicense</a>.
      </p>

      <p>
        Layout is a copycat of the amazing <a href="https://github.com/jdan/98.css">98.css</a> demo
        page. I think this oldskool design and web audio matching, both trigger similar feelings.
      </p>

      <p>
        Thanks for checking and hope you found it moderately amusing not just wasting time. Here is{" "}
        <strong>
          <a href="https://twitter.com/SubZtep">My Twitter</a>
        </strong>{" "}
        if you are into it, <i>Take Care!</i>
      </p>
    </main>
  )
}
