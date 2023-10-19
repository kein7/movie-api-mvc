import z from 'zod'
// notar que como no se esta validando la id, entonces al momento de querer modificar esta
// no se va poder ya que como no esta pasando por la validación entonces no toma en cuenta
// ese parametro
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid url'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi'
    ]),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

export function validateMovie (input) {
  return movieSchema.parse(input)
}

export function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}
