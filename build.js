const fs = require("node:fs")

if (!process.env.MAGNIFIK_BUILD_SMOKE) {
  console.error("MAGNIFIK_BUILD_SMOKE missing")
  process.exit(1)
}

fs.writeFileSync(
  "build-marker.json",
  JSON.stringify({ buildEnvPresent: true }) + "\n"
)
console.log("build env marker written")
