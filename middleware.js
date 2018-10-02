const fs = require('fs')

const consoleLogMiddleware = (req, res, next) => {
  req.user = 'admin'
  console.log(req.user)
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)

  next() // para ir al siguiente middleware o a la ruta
  // también podríamos hacer un send() y cortar
  // la cola de middlewares, por ej en un control de permisos
}

const fileLogMiddleware = (req, res, next) => {
  req.user = 'admin'
  console.log(req.user)
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) console.log(`No se ha podido usar el fichero de log:  ${err}`)
  })
  next() // para ir al siguiente middleware o a la ruta
  // también podríamos hacer un send() y cortar
  // la cola de middlewares, por ej en un control de permisos
}

module.exports = {
  consoleLogMiddleware,
  fileLogMiddleware
}
