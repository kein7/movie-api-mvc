// Leer un JSON en ESModules recomendado
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url) // crea un require con la dirección del archivo actual
export const readJSON = (path) => require(path)
