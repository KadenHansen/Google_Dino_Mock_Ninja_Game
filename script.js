import { layGround, moveGround } from "./ground.js"

setWorldScale()
window.addEventListener("resize", setWorldScale)

layGround()

let previousTime
function update(time) {
    if (previousTime == null) {
        previousTime = time
        window.requestAnimationFrame(update)
        return
    }
    let currentTime = time - previousTime
    moveGround(currentTime)    

    previousTime = time
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

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