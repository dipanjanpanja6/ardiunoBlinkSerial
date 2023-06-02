const permissionButton = document.getElementById("request")
const lampState = document.getElementById("lamp-state")
const onButton = document.getElementById("on")
const offButton = document.getElementById("off")
let keepReading = true
let reader, writer, port, writableStreamClosed, readableStreamClosed

permissionButton.addEventListener("click", init)

onButton.addEventListener("click", handleLamp("on"))
offButton.addEventListener("click", handleLamp("off"))

async function readUntilClosed() {
  while (port.readable && keepReading) {
    console.log(port.readable, keepReading)
    const textDecoder = new TextDecoderStream()
    readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
    reader = textDecoder.readable.getReader()

    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          // reader.cancel() has been called.
          break
        }
        // value is a string.
        console.log(value)
      }
    } catch (error) {
      // Handle error...
    } finally {
      // Allow the serial port to be closed later.
      console.log("release lock")
      reader.releaseLock()
    }
  }

  console.log("SErial disconnected successfully")
}

function handleLamp(state) {
  return async e => {
    console.log("lamp state changed to ", state)

    await writer.write(state)
  }
}

async function init(e) {
  if (e.target.innerText === "Disconnect") {
    keepReading = false
    // Force reader.read() to resolve immediately and subsequently
    // call reader.releaseLock() in the loop example above.
    reader.cancel()
    await readableStreamClosed.catch(() => {
      /* Ignore the error */
    })

    writer.close()
    await writableStreamClosed

    await port.close()

    e.target.innerText = "Request Serial Port"
    lampState.style.display = "none"

    return
  }

  // Prompt user to select any serial port.
  try {
    port = await navigator.serial.requestPort()
  } catch (err) {
    if (err.name === "NotFoundError") {
      window.alert("Serial not fond")
      return
    }
  }

  if (!port) return

  window.port = port
  console.log("You can access the serial port from 'window.port'")

  // open serial communication
  try {
    await port.open({ baudRate: 115200 })
  } catch (err) {
    alert(err.message)
    return
  }

  e.target.innerText = "Disconnect"
  lampState.style.display = "flex"

  const textEncoder = new TextEncoderStream()
  writableStreamClosed = textEncoder.readable.pipeTo(port.writable)

  writer = textEncoder.writable.getWriter()

  await readUntilClosed()
}
