const fs = require('fs')
const path = require('path')

const formatTime = tsp => {
  const hours = tsp / (1000 * 60 * 60)
  const days = Math.floor(hours / 24)
  return `${days && `${days} days`} ${Math.floor(hours % 24)} hours`
}

fs.readFile(path.resolve(__dirname, 'backup.txt'), (err, file) => {
  const now = +new Date()
  const ports = file
    .toString()
    .split('\n')
    .map(line => JSON.parse(line))
    .map(({ server_port: port, password, expired_on }) => ({
      port,
      password,
      expired: formatTime(expired_on * 1000 - now),
    }))
  console.log(ports)
})
