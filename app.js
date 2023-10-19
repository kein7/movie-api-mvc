import express, { json } from 'express'
import { createMovieRouter } from './routes/movies-routes.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.disable('x-powered-by')

  app.use(corsMiddleware())

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`Server listening in port http://localhost:${PORT}`)
  })
}
