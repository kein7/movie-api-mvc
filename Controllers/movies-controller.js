// import { MovieModel } from '../Models/local/movie-model-local.js'
// import { MovieModel } from '../Models/mysql/movie-model-mysql.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      // tambien se puede usar un 422: Unproccessable entity
      return res.status(400).json({ error: result.error.message })
    }

    const newMovie = await this.movieModel.create({ input: result })

    res.status(201).json(newMovie) // actualizar el cache del cliente
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.movieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie Deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params

    const updatedMovie = await this.movieModel.update({
      id,
      input: result.data
    })

    return res.json(updatedMovie)
  }
}
