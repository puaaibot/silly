const fs = require('fs')
const path = require('path')

const backup = path.resolve(__dirname, 'backup.txt')

fs.readFile(backup, (err, file) => {
  const now = +new Date()
  const result = file
    .toString()
    .split('\n')
    .map(line => JSON.parse(line))
    .filter(({ expired_on }) => expired_on * 1000 > now)
    .sort((a, b) => a.server_port > b.server_port)
    .reduce((acc, cur) => cur.server_port === 8888 ? [cur, ...acc] : [...acc, cur], [])
    .reduce((acc, cur) => acc + JSON.stringify(cur).replace(/(:|,)/g, '$1 ') + '\n', '')
    .trim()

  fs.createWriteStream(backup).write(result)
})
