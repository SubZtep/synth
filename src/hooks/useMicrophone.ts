export default function useMicrophone() {
  const requestAudio = (rejectedCallback?: (reason: any) => void) =>
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .catch(rejectedCallback || console.error)

  const devices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter(device => device.kind === "audioinput")
  }

  return {
    requestAudio,
    devices,
  }
}
