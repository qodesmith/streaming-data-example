import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

app.get('/test', (req, res) => {
  res.json({hello: 'world'})
})

app.get('/stream', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})

  let i = 0
  const interval = setInterval(() => {
    if (i < 5) {
      res.write(`Data: ${i + 1}`)
      i++
    } else {
      clearInterval(interval)
      res.end()
    }
  }, 1000)
})

ViteExpress.listen(app, 3000, () => {
  console.log('Express server listening...')
})
