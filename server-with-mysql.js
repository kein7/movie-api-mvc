import { createApp } from './app.js'

import { MovieModel } from './Models/mysql/movie-model-mysql.js'

createApp({ movieModel: MovieModel })
