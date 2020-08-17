/**
 * Wav header description: http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html
 */
export const wavHeader = (
  numOfChan = 1,
  sampleRate = 48_000,
  sampleSize = 32,
  fileSize = 44
): ArrayBuffer => {
  const buffer = new ArrayBuffer(44)
  let view = new DataView(buffer)
  let pos = 0

  const setUint16 = (data: number) => {
    view.setUint16(pos, data, true)
    pos += 2
  }

  const setUint32 = (data: number) => {
    view.setUint32(pos, data, true)
    pos += 4
  }

  // write WAVE header
  setUint32(0x46464952) // "RIFF" in ASCII form (little-endian form)
  setUint32(fileSize - 8) // file length - 8
  setUint32(0x45564157) // "WAVE"

  setUint32(0x20746d66) // "fmt " chunk
  setUint32(16) // length = 16 for PCM - This is the size of therest of the Subchunk which follows this number.
  // setUint16(1) // PCM (uncompressed)
  setUint16(3) // IEEE FLOAT
  setUint16(numOfChan)
  setUint32(sampleRate)

  setUint32((sampleRate * numOfChan * sampleSize) / 8) // ByteRate = SampleRate * NumChannels * BitsPerSample/8
  setUint16((numOfChan * sampleSize) / 8) // BlockAlign = NumChannels * BitsPerSample/8
  setUint16(sampleSize)

  setUint32(0x61746164) // "data" - chunk
  // setUint32((length * numOfChan * sampleSize) / 8) // Subchunk2Size = NumSamples * NumChannels * BitsPerSample/8
  setUint32(fileSize - 44)

  return buffer
}
