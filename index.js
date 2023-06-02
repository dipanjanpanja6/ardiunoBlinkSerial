const express = require("express")
const { SerialPort } = require("serialport")

const port = 3000
const COMPort = "/dev/tty.usbmodem1101"

// const Serial = new SerialPort({ path: COMPort, baudRate: 9600 })
// Serial.on("open", function () {
//   Serial.set({ dsr: true })
//   console.log("Serial Port " + COMPort + " is opened.")
// })
// Serial.on("error", function (err) {
//   console.log("Error: ", err.message)
// })
// Serial.on("data", function (data) {
//   //   console.log("Serial Port data ", data)
//   process.stdout.write(data.toString())
// })

const app = express()
app.use(express.static("public"))

app.get("/:action", function (req, res) {
  const action = req.params.action

  if (action == "on") {
    Serial.write(action)
    return res.send("Led light is on!")
  }
  if (action == "off") {
    Serial.write(action)
    return res.send("Led light is off!")
  }

  return res.send("Action: " + action)
})

app.listen(port, function () {
  console.log("Example app listening on port http://0.0.0.0:" + port + "!")
})
