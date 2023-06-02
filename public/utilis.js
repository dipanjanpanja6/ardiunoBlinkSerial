// async function _connect(abortSignal) {
//   console.log("Starting console read loop")
//   try {
//     await port.readable
//       .pipeThrough(new TextDecoderStream(), { signal: abortSignal })
//       .pipeThrough(new TransformStream())
//       .pipeTo(
//         new WritableStream({
//           write: chunk => {
//             console.log(chunk.replace("\r", ""))
//           },
//         })
//       )
//     if (!abortSignal.aborted) {
//       console.log("")
//       console.log("")
//       console.log("Terminal disconnected")
//     }
//   } catch (e) {
//     console.log("")
//     console.log("")
//     console.log(`Terminal disconnected: ${e}`)
//   } finally {
//     await sleep(100)
//     console.log("Finished console read loop")
//   }
// }

// async function _sendCommand(command) {
//   const encoder = new TextEncoder()
//   const writer = port.writable.getWriter()
//   await writer.write(encoder.encode(command + "\r\n"))
//   console.log(`> ${command}\r\n`)
//   input.value = ""
//   input.focus()
//   try {
//     writer.releaseLock()
//   } catch (err) {
//     console.error("Ignoring release lock error", err)
//   }
// }
