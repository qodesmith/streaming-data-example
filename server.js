import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

app.get('/test', (req, res) => {
  res.json({hello: 'world'})
})

ViteExpress.listen(app, 3000, () => {
  console.log('Express server listening...')
})
