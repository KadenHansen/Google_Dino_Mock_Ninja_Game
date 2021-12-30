import { layGround, moveGround } from "./ground.js"
import { startNinja, moveNinja, getNinjaHitBox, ninjaHit } from "./ninja.js"
import { setUpShuriken, moveShuriken, getShurikenHitBox } from "./obstacles.js"

setWorldScale()
window.addEventListener("resize", setWorldScale)
document.addEventListener("keydown", startGame, {once: true})

let previousTime
let gameSpeed
let gameRateIncrease = .00001
let startSpeed = 100
let startScreen = document.querySelector(".start-screen")
let currentFrame
let score
let scoreText = document.querySelector(".score")

function update(time) {
    if (previousTime == null) {
        previousTime = time
        window.requestAnimationFrame(update)
        return
    }
    currentFrame = time - previousTime
    increaseGameSpeed(currentFrame)

    moveGround(currentFrame, gameSpeed)
    moveNinja(startSpeed, currentFrame)
    moveShuriken(currentFrame, gameSpeed)
    updateScore(currentFrame)

    if(checkLose()) {return loseGame()}
    
    previousTime = time
    window.requestAnimationFrame(update)
}

function checkLose() {
    let ninjaHitBox = getNinjaHitBox()
    return getShurikenHitBox().some(hitBox => checkCollision(hitBox, ninjaHitBox))
}

function checkCollision(asset1, asset2) {
    return (
        asset1.left < asset2.right && 
        asset1.top < asset2.bottom && 
        asset1.right > asset2.left && 
        asset1.bottom > asset2.top
    )

}

function increaseGameSpeed(currentTime) {
    gameSpeed += currentTime * gameRateIncrease
    startSpeed += gameSpeed * -.01
}

function updateScore(currentFrame) {
    score += currentFrame * .01
    scoreText.textContent = "Score = " + Math.floor(score)
}

function startGame() {
    previousTime = null
    layGround()
    startNinja()
    setUpShuriken()
    gameSpeed = 1.25
    score = 0
    startScreen.remove()
    window.requestAnimationFrame(update)
}

function loseGame() {
    ninjaHit()
    setTimeout(() => {
        document.addEventListener("keydown", startGame, { once: true })
        startScreen.remove()
    }, 100)
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