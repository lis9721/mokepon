const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
  constructor(id) {
    this.id = id
    this.actualizado = Date.now()
  }

  asignarMokepon(mokepon) {
    this.mokepon = mokepon
    this.actualizado = Date.now()
  }

  actualizarPosicion(x, y) {
    this.x = x
    this.y = y
    this.actualizado = Date.now()
  }

  asignarAtaques(ataques) {
    this.ataques = ataques
    this.actualizado = Date.now()
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre
  }
}

app.get("/unirse", (req, res) => {
  const ahora = Date.now()
  // Limpiar sesiones inactivas de más de 30 segundos
  for (let i = jugadores.length - 1; i >= 0; i--) {
    if (ahora - (jugadores[i].actualizado || 0) > 30000) {
      jugadores.splice(i, 1)
    }
  }

  const id = `${Math.random()}`

  const jugador = new Jugador(id)

  jugadores.push(jugador)

  res.setHeader("Access-Control-Allow-Origin", "*")
  
  res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const nombre = req.body.mokepon || ""
  const mokepon = new Mokepon(nombre)
  
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon)
  }
  
  console.log(jugadores)
  console.log(jugadorId)
  res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y)
  }

  // Filtrar jugadores activos que no sean el jugador actual y tengan mascota
  const ahora = Date.now()
  const enemigos = jugadores.filter((jugador) => {
    return jugadorId !== jugador.id && jugador.mokepon && (ahora - (jugador.actualizado || 0) < 10000)
  })

  res.send({
    enemigos
  })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const ataques = req.body.ataques || []
  
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarAtaques(ataques)
  }

  res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
  res.send({
    ataques: jugador ? (jugador.ataques || []) : []
  })
})

// Servir archivos estáticos y redireccionar ruta principal a mokepon.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "mokepon.html"))
})

app.use(express.static(__dirname))

app.listen(8080, () => {
  console.log("Servidor funcionando en http://localhost:8080")
})