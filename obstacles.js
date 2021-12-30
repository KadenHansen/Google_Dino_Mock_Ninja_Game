import { getAssetProp, setAssetProp, incrementAssetProp } from "./updateLevel.js"

let speed = .05
let ObstacleIntervalMin = 750
let ObstacleIntervalMax = 2000
let world = document.querySelector(".world")

let nextShurikenTime

export function setUpShuriken() {
    nextShurikenTime = ObstacleIntervalMin
    document.querySelectorAll(".Obstacle").forEach(Obstacle=> {
        Obstacle.remove()
    })
}

export function moveShuriken(currentFrame, gameSpeed) {
    document.querySelectorAll(".Obstacle").forEach(Obstacle=> {
        incrementAssetProp(Obstacle, "--left", gameSpeed * currentFrame * speed * -1)

        if(getAssetProp(Obstacle, "--left") <= -30) {
            Obstacle.remove()
        }
    })

    if(nextShurikenTime <= 0) {
        createShuriken()
        nextShurikenTime = randomNumberBetween(ObstacleIntervalMin, ObstacleIntervalMax) / gameSpeed
    }
    nextShurikenTime -= currentFrame
}

export function getShurikenHitBox() {
    return [...document.querySelectorAll(".Obstacle")].map(Obstacle=> {
        return Obstacle.getBoundingClientRect()
    })
}

function createShuriken() {
    let Obstacle= document.createElement("img")
    Obstacle.src = "./assets/images/Kunai.png"
    Obstacle.classList.add("Obstacle")
    setAssetProp(Obstacle, "--left", 100)
    world.append(Obstacle)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}