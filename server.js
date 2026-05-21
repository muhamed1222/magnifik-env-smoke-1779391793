const http = require("node:http")
const fs = require("node:fs")

let buildEnvPresent = false
try {
  buildEnvPresent = JSON.parse(fs.readFileSync("build-marker.json", "utf8")).buildEnvPresent === true
} catch {
  buildEnvPresent = false
}

const server = http.createServer((req, res) => {
  if (req.url === "/env-smoke") {
    const body = JSON.stringify({
      buildEnvPresent,
      runtimeEnvPresent: Boolean(process.env.MAGNIFIK_RUNTIME_SMOKE),
    })
    res.writeHead(200, { "content-type": "application/json" })
    res.end(body)
    return
  }

  res.writeHead(200, { "content-type": "text/plain" })
  res.end("magnifik env smoke")
})

server.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("env smoke server listening")
})
