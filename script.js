import { layGround, moveGround } from "./ground.js"
import { startNinja, cycleRun } from "./ninja.js"

setWorldScale()
window.addEventListener("resize", setWorldScale)
document.addEventListener("keydown", startGame, {once: true})

let previousTime
let gameSpeed
let gameRateIncrease = .00001
let startSpeed = 100
let startScreen = document.querySelector(".start-screen")

function update(time) {
    if (previousTime == null) {
        previousTime = time
        window.requestAnimationFrame(update)
        return
    }
    let currentTime = time - previousTime
    moveGround(currentTime, gameSpeed)
    // moveNinja(currentTime, gameSpeed)
    increaseGameSpeed(currentTime)
    
    previousTime = time
    window.requestAnimationFrame(update)
}

function increaseGameSpeed(currentTime) {
    gameSpeed += currentTime * gameRateIncrease
    startSpeed += gameSpeed * -.01
    cycleRun(startSpeed)
}

function startGame() {
    previousTime = null
    layGround()
    startNinja()
    gameSpeed = .75
    startScreen.remove()
    window.requestAnimationFrame(update)
}

function setWorldScale() {
    let worldScale
    let worldWidth = 100
    let worldHeight = 30
    const worldSize = document.querySelector(".world")
    if (window.innerWidth / window.innerHeight < worldWidth / worldHeight) {
        worldScale = window.innerWidth / worldWidth
    } else {
        worldScale = window.innerHeight / worldHeight
    }
    
    worldSize.style.width = `${worldWidth * worldScale}px`
    worldSize.style.height = `${worldHeight * worldScale}px`
}