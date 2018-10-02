const express = require('express')
const app = express()
const fs = require('fs')
// const hbs = require('hbs')
app.set('view engine', 'hbs') // clave valor

const { consoleLogMiddleware, fileLogMiddleware } = require('./middleware.js')

// primero se ponen los middleware a modo de filtro
/*
app.use(('/contactar', '/contactar2'), (req, res, next) => {
  // operaciones del middleware
  // const now = new Date().toString()
  // console.log(`Time: ${now} ${req.method} ${req.url}`)
  //req.user = 'admin'
  next() // para ir al siguiente middleware o a la ruta
  // también podríamos hacer un send() y cortar
  // la cola de middlewares, por ej en un control de permisos
})
*/

app.use(consoleLogMiddleware)
app.use(fileLogMiddleware)
const path = require('path')

// Ahora uso partials
const hbs = require('hbs')
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.set('view engine', 'hbs') // clave valor

// ahora defino mi carpeta con el middleware predifinido
const staticRoute = path.join(__dirname, 'public')
// path.join es un modulo de node que con _dirname  se desentiende de sistemas operativos
app.use(express.static(staticRoute))
// O bien poniendo una ruta:
// app.use(express.static(staticRoute))
// const staticRoute = path.join(__dirname, 'public')
// con la anterior yo digo donde esta en mi sistema
// con la anterior digo como la ve el usuario
// app.use('/static', express.static(staticRoute))

app.get('/', (req, res) => {
  res.send('Hola mundo')
})
app.get('/contactar2', (req, res) => {
  res.render('contactar.hbs', {
    pageTitle: 'Contactar',
    currentYear: new Date().getFullYear()
  })
})
app.get('/contactar', (req, res) => {
  res.send({ nombre: 'pepico', correo: 'pepe@grr.la' })
})
app.listen(3000, () => {
  console.log('App listeneing on port 3000')
})
