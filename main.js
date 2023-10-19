var izquierda_x = 0
var izquierda_y = 0
var derecha_x = 0
var derecha_y = 0
var izquierda_puntos = 0
var derecha_puntos = 0
var volumen = 0
var velocidad = 0
function fiesta() {
    if (cancion.isPlaying()) {
        document.getElementById("iniciar").src = "play (2).png"
        cancion.stop()
    } else {
        document.getElementById("iniciar").src = "pausa.png"
        cancion.play()
    }
}
function preload() {
    cancion = loadSound("Maroon5_Memories.mp3")
    c1 = loadSound("Coldplay_VivaLaVida.mp3")
    c2 = loadSound("Maroon5_Memories.mp3")
    c3 = loadSound("Maroon5_MovesLikeJagger.mp3")
    c4 = loadSound("Maroon5_Sugar.mp3")
    c5 = loadSound("Maroon5_Payphone.mp3")
}
function setup() {
    video = createCapture(VIDEO)
    video.hide()
    canvas = createCanvas(640, 480)
    poseNet = ml5.poseNet(video, listo)
    poseNet.on("pose", respuesta)

}
function listo() {
    console.log("are you ready?")

}
function draw() {
    translate(width, 0)
    scale(-1, 1)
    image(video, 0, 0, 640, 480)
    if (derecha_puntos > 0.2) {
        fill("green")
        circle(derecha_x, derecha_y, 20)
        volumen = 1 - (derecha_y * 1) / 480
        volumen = Math.round(volumen * 100) / 100
        document.getElementById("volumen").innerHTML = volumen * 100 + "%"
        cancion.setVolume(volumen)
    }
    if (izquierda_puntos > 0.2) {
        fill("blue")
        circle(izquierda_x, izquierda_y, 20)
        velocidad = 5 - (izquierda_y * 5) / 480
        velocidad = Math.round(velocidad)
        document.getElementById("flash").innerHTML = velocidad + "x"
        cancion.rate(velocidad)
    }
}
function respuesta(resultados) {
    if (resultados && resultados.length > 0) {
        console.log(resultados)
        izquierda_x = resultados[0].pose.leftWrist.x
        izquierda_y = resultados[0].pose.leftWrist.y
        derecha_x = resultados[0].pose.rightWrist.x
        derecha_y = resultados[0].pose.rightWrist.y
        izquierda_puntos = resultados[0].pose.keypoints[9].score
        derecha_puntos = resultados[0].pose.keypoints[10].score
    }
}

function reproduccion(numerocancion) {
    cancion.stop()
    switch (numerocancion) {
        case 1:
            cancion = c1
            break;
        case 2:
            cancion = c2
            break;
        case 3:
            cancion = c3
            break;
        case 4:
            cancion = c4
            break;
        case 5:
            cancion = c5
            break;

        default:
            break;
    }
    fiesta()
}