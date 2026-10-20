const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('mensajes')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/fondo_pelea.webp'
let rivalAleatorio = null

let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 500

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

let alturaQueBuscamos = anchoDelMapa * 350 / 500
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(20, mapa.width - this.ancho - 20)
        this.y = aleatorio(20, mapa.height - this.alto - 20)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueya.png')
let langostelvis = new Mokepon('Langostelvis', './assets/langostelvis.png', 5, './assets/langostelvis.png')
let tucapalma = new Mokepon('Tucapalma', './assets/tucapalma.png', 5, './assets/tucapalma.png')
let pydos = new Mokepon('Pydos', './assets/pydos.png', 5, './assets/pydos.png')

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

const LANGOSTELVIS_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

const TUCAPALMA_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

const PYDOS_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)
pydos.ataques.push(...PYDOS_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}" />
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log("Jugador ID:", respuesta)
                        jugadorId = respuesta
                    })
            }
        })
        .catch(function (error) {
            console.log("Servidor no disponible; se jugará contra rival local:", error)
        })
}

function seleccionarMascotaJugador() {
    let mascotaSeleccionada = false
    mokepones.forEach((mokepon) => {
        const input = document.getElementById(mokepon.nombre)
        if (input && input.checked) {
            mascotaJugador = mokepon.nombre
            mascotaSeleccionada = true
        }
    })

    if (!mascotaSeleccionada) {
        alert('Selecciona una mascota')
        return
    }

    spanMascotaJugador.innerHTML = mascotaJugador
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)

    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    if (!jugadorId) return
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    }).catch(function (error) {
        console.log("No se pudo registrar la mascota en el servidor:", error)
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    contenedorAtaques.innerHTML = ''
    ataques.forEach((ataque) => {
        const ataquesMokepon = `
        <button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f5a'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f5a'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f5a'
                boton.disabled = true
            }
            
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    const plantilla = mokepones.find(m => m.nombre === enemigo.nombre)
    ataquesMokeponEnemigo = plantilla ? plantilla.ataques : enemigo.ataques
    secuenciaAtaque()
}

function enviarAtaques() {
    if (enemigoId && !enemigoId.startsWith('npc')) {
        fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ataques: ataqueJugador
            })
        }).catch(function (error) {
            console.log("Error al enviar ataques:", error)
        })

        intervalo = setInterval(obtenerAtaques, 1000)
    } else {
        ataqueAleatorioEnemigo()
    }
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function ({ ataques }) {
                    if (ataques.length === 5) {
                        clearInterval(intervalo)
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
        .catch(function (error) {
            console.log("Esperando ataques del enemigo...", error)
        })
}

function ataqueAleatorioEnemigo() {
    let ataquesDisponibles = [...ataquesMokeponEnemigo]
    for (let i = 0; i < 5; i++) {
        let index = aleatorio(0, ataquesDisponibles.length - 1)
        let ataque = ataquesDisponibles.splice(index, 1)[0]
        if (ataque.nombre === '🔥') ataqueEnemigo.push('FUEGO')
        else if (ataque.nombre === '💧') ataqueEnemigo.push('AGUA')
        else ataqueEnemigo.push('TIERRA')
    }
    combate()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            crearMensaje("EMPATE", ataqueJugador[index], ataqueEnemigo[index])
        } else if (
            (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') ||
            (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') ||
            (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA')
        ) {
            crearMensaje("GANASTE", ataqueJugador[index], ataqueEnemigo[index])
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            crearMensaje("PERDISTE", ataqueJugador[index], ataqueEnemigo[index])
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("¡Esto fue un empate!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("¡FELICITACIONES! Ganaste :)")
    } else {
        crearMensajeFinal("Lo siento, perdiste :(")
    }
}

function crearMensaje(resultado, ataqueJugador, ataqueEnemigo) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    const resultadoElemento = document.getElementById('resultado')
    if (resultadoElemento) {
        resultadoElemento.innerHTML = resultado
    }

    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    const resultadoElemento = document.getElementById('resultado')
    if (resultadoElemento) {
        resultadoElemento.innerHTML = resultadoFinal
    }
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function obtenerObjetoMascota(nombre) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].nombre === nombre) {
            return mokepones[i]
        }
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    mascotaJugadorObjeto.x = 20
    mascotaJugadorObjeto.y = 20

    crearRivalAleatorio()

    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function crearRivalAleatorio() {
    let rivalesDisponibles = mokepones.filter(m => m.nombre !== mascotaJugador)
    let aleatorioIndex = aleatorio(0, rivalesDisponibles.length - 1)
    let plantillaRival = rivalesDisponibles[aleatorioIndex]
    
    rivalAleatorio = new Mokepon(plantillaRival.nombre, plantillaRival.foto, 5, plantillaRival.foto, 'npc')
    rivalAleatorio.x = aleatorio(Math.floor(mapa.width / 2), Math.max(Math.floor(mapa.width / 2), mapa.width - rivalAleatorio.ancho - 20))
    rivalAleatorio.y = aleatorio(20, Math.max(20, mapa.height - rivalAleatorio.alto - 20))
}

function pintarCanvas() {
    if (!mascotaJugadorObjeto) return

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    if (mascotaJugadorObjeto.x < 0) mascotaJugadorObjeto.x = 0
    if (mascotaJugadorObjeto.x > mapa.width - mascotaJugadorObjeto.ancho) {
        mascotaJugadorObjeto.x = mapa.width - mascotaJugadorObjeto.ancho
    }
    if (mascotaJugadorObjeto.y < 0) mascotaJugadorObjeto.y = 0
    if (mascotaJugadorObjeto.y > mapa.height - mascotaJugadorObjeto.alto) {
        mascotaJugadorObjeto.y = mapa.height - mascotaJugadorObjeto.alto
    }

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    if (mapaBackground.complete && mapaBackground.naturalWidth) {
        lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    }
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    // En el mapa solo deben aparecer 2: tu Mokepon y el enemigo
    if (mokeponesEnemigos.length > 0) {
        // En multijugador mostramos al primer rival conectado
        let enemigo = mokeponesEnemigos[0]
        if (enemigo != undefined) {
            enemigo.pintarMokepon()
            revisarColision(enemigo)
        }
    } else if (rivalAleatorio) {
        // En solitario mostramos al Mokepon elegido aleatoriamente
        rivalAleatorio.pintarMokepon()
        revisarColision(rivalAleatorio)
    }
}

function enviarPosicion(x, y) {
    if (!jugadorId) return
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemigos }) {
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null
                    if (enemigo.mokepon != undefined) {
                        const mokeponNombre = enemigo.mokepon.nombre
                        const plantilla = mokepones.find(m => m.nombre === mokeponNombre)
                        if (plantilla) {
                            mokeponEnemigo = new Mokepon(plantilla.nombre, plantilla.foto, 5, plantilla.foto, enemigo.id)
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        }
                    }
                    return mokeponEnemigo
                }).filter(Boolean)
            })
        }
    })
    .catch(function () {})
}

function moverArriba() {
    if (mascotaJugadorObjeto) mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
    if (mascotaJugadorObjeto) mascotaJugadorObjeto.velocidadY = 5
}

function moverIzquierda() {
    if (mascotaJugadorObjeto) mascotaJugadorObjeto.velocidadX = -5
}

function moverDerecha() {
    if (mascotaJugadorObjeto) mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento() {
    if (mascotaJugadorObjeto) {
        mascotaJugadorObjeto.velocidadX = 0
        mascotaJugadorObjeto.velocidadY = 0
    }
}

window.moverArriba = moverArriba
window.moverAbajo = moverAbajo
window.moverIzquierda = moverIzquierda
window.moverDerecha = moverDerecha
window.detenerMovimiento = detenerMovimiento

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            moverArriba()
            break
        case 'ArrowDown':
        case 's':
        case 'S':
            moverAbajo()
            break
        case 'ArrowLeft':
        case 'a':
        case 'A':
            moverIzquierda()
            break
        case 'ArrowRight':
        case 'd':
        case 'D':
            moverDerecha()
            break
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
