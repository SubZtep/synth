export default function useMicrophone() {
  const devices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    console.log({ devices })
    return devices.filter(device => device.kind === "audioinput")
  }

  return {
    devices,
  }
}
