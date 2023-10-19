// funcion utilidad para abrir JSON con ESModules
import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils/readJSON.js'

const movies = readJSON('../movies.json')

// tiene que ser una clase porque de esta forma se pueden implementar contratos o interfaces
export class MovieModel {
  static getAll ({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(), // universal unique id es es un número de 16 bytes y 128 bits,
      ...input
    }
    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}
