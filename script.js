import { layGround, moveGround } from "./ground.js"
import { startNinja, moveNinja, getNinjaHitBox, ninjaHit } from "./ninja.js"
import { setUpObstacle, moveObstacle, getObstacleHitBox } from "./obstacles.js"

// acitvates the auto-sizing of the game world in window at first launch
setWorldScale()
window.addEventListener("resize", setWorldScale)

document.addEventListener("keydown", startGame, {once: true})

let previousFrame // used for determination of time between window fram updates
let currentFrame // value of time between window frame updates
let gameSpeed // determines current rate of game movement
let gameRateIncrease = .00001 // incremental value that determines the speed of game speed increase
let startSpeed = 100 // initial rate of asset movement
let score // determines current score
let startScreen = document.querySelector(".start-screen")
let scoreText = document.querySelector(".score")

// auto resizes the game world inside window
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

// resets all variables and assets, starts score and game mechanics
function startGame(e) {
    if (e.code !== "Enter") {
        document.addEventListener("keydown", startGame, {once: true})
        return
    }

    previousFrame = null
    layGround()
    startNinja()
    setUpObstacle()
    gameSpeed = 1.25
    score = 0
    startScreen.remove()
    window.requestAnimationFrame(update)
}

// Updates each aspect of the game in ratio to browser update speed
function update(frame) {
    if (previousFrame == null) {
        previousFrame = frame
        window.requestAnimationFrame(update)
        return
    }
    currentFrame = frame - previousFrame
    increaseGameSpeed(currentFrame)

    moveGround(currentFrame, gameSpeed)
    moveNinja(startSpeed, currentFrame)
    moveObstacle(currentFrame, gameSpeed)
    updateScore(currentFrame)

    if(checkLose()) {return loseGame()}
    
    previousFrame = frame
    window.requestAnimationFrame(update)
}

// increments the speed of obstacles, ground movement, and ninja run speed in proportion to gameRateIncrease variable
function increaseGameSpeed(currentTime) {
    gameSpeed += currentTime * gameRateIncrease
    startSpeed += gameSpeed * -.01
}

// calculates score variable and updates the score DOM element
function updateScore(currentFrame) {
    score += currentFrame * .01
    scoreText.textContent = "Score: " + Math.floor(score)
}

// checks if any obstacles have collided with the ninja
function checkCollision(asset1, asset2) {
    return (
        asset1.left < asset2.right && 
        asset1.top < asset2.bottom && 
        asset1.right > asset2.left && 
        asset1.bottom > asset2.top
    )

}

// activates lose if any obstacles have collided with the ninja
function checkLose() {
    let ninjaHitBox = getNinjaHitBox()
    return getObstacleHitBox().some(hitBox => checkCollision(hitBox, ninjaHitBox))
}

// handles the stopping of the game and the reset after losing
function loseGame() {
    ninjaHit()
    setTimeout(() => {
        document.addEventListener("keydown", startGame, { once: true })
    }, 100)
}