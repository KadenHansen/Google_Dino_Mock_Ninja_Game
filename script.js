let worldWidth = 100
let worldHeight = 30

const worldSize = document.querySelector(".world")

setWorldScale()
window.addEventListener("resize", setWorldScale)

function setWorldScale() {
    let worldScale
    if (window.innerWidth / window.innerHeight < worldWidth / worldHeight) {
        worldScale = window.innerWidth / worldWidth
    } else {
        worldScale = window.innerHeight / worldHeight
    }

    worldSize.style.width = `${worldWidth * worldScale}px`
    worldSize.style.height = `${worldHeight * worldScale}px`
}