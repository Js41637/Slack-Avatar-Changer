import request from 'request'
import { slackAPIToken, interval } from '../config'
import fs from 'fs'
import path from 'path'

if (!slackAPIToken || !interval) {
  console.log("Error!: No Slack API Token or Interval in config")
  process.exit(0)
}
if (interval < 5 || parseInt(interval) < 5) {
  console.log("Error!: Interval must be greater than 5 minutes")
  process.exit(0)
}

const dir = './images'
var images = []
var selected = []

try {
  images = fs.readdirSync(dir)
} catch (e) {
  console.log("Error!: Cannot find images directory")
  process.exit(0)
}

function updateAvatar() {
  console.log(`[Avatar Changer] Updating Avatar`)
  if (!images.length) refreshImages()
  let index = Math.floor(Math.random() * images.length)
  let avatar = images[index]

  request.post({ url: `https://slack.com/api/users.setPhoto?token=${slackAPIToken}`, formData: {
    image: fs.createReadStream(path.join(dir, avatar))
  }, json: true }, (err, resp, body) => {
    if (err) return console.log("Request error!", err)
    if (!body) return console.log("No body??")
    if (!body.ok) return console.log("Error updating avatar", body)
    console.log(`[Avatar Changer] Successfully changed avatar to ${avatar}`)
  })
  selected.push(images.splice(index, 1)) // Removes image from images array and pushes it to selected
}

function refreshImages() {
  console.log("Refreshing images, starting again")
  images = selected
  selected = []
}

setInterval(() => {
  updateAvatar()
}, (interval * 60) * 1000)

console.log(`[Avatar Changer] Avatar changer started, total of ${images.length} images to choose from`)
console.log(`[Avatar Changer] Avatar will update every ${interval} minutes (${interval * 60} seconds)`)
