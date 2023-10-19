import { Router } from 'express'

import { MovieController } from '../Controllers/movies-controller.js'

/* Leer un JSON en ESModules
import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
*/

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.getAll)
  moviesRouter.get('/:id', movieController.getById)
  moviesRouter.post('/', movieController.create)
  moviesRouter.delete('/:id', movieController.delete)
  moviesRouter.patch('/:id', movieController.update)

  return moviesRouter
}
