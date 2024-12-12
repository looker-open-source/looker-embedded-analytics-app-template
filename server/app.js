import express from 'express'
import path from 'path'
import cors from 'cors'

import user from './user.json' assert { type: 'json' }
import { addRoutes } from './api/looker_routes.js'

const app = express()
app.use(cors())

// Serve all Looker routes behind a `/api` prefix
addRoutes(app, user, '/api')

// Serve the built app at the root URL
app.use(express.static('../build'))
app.get('*', (req, res) =>
  res.sendFile(path.resolve('..', 'build', 'index.html'))
)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
