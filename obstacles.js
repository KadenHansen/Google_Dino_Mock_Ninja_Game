import { getAssetProp, setAssetProp, incrementAssetProp } from "./updateLevel.js"

let speed = .09 // determines ratio for obstacle speed increase
let ObstacleIntervalMin = 750 // sets min distance between obstacles
let ObstacleIntervalMax = 2000 // sets max distance between obstacles
let nextObstacleTime // tracks distance value for each instance of an obstacle for obstacle creation
let world = document.querySelector(".world")

// starts first obstacle and removes all obstacles left over from previous game
export function setUpObstacle() {
    nextObstacleTime = ObstacleIntervalMin
    document.querySelectorAll(".Obstacle").forEach(Obstacle=> {
        Obstacle.remove()
    })
}

// handles new obstacle creation
function createObstacle() {
    let Obstacle= document.createElement("img")
    Obstacle.src = "./assets/images/Kunai.png"
    Obstacle.classList.add("Obstacle")
    setAssetProp(Obstacle, "--left", 100)
    world.append(Obstacle)
}

// handles randomization between obstacle creation times for use in moveObstacle function
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

// handles obstacle movement and time between new obstacle creation
export function moveObstacle(currentFrame, gameSpeed) {
    document.querySelectorAll(".Obstacle").forEach(Obstacle=> {
        incrementAssetProp(Obstacle, "--left", gameSpeed * currentFrame * speed * -1)

        if(getAssetProp(Obstacle, "--left") <= -30) {
            Obstacle.remove()
        }
    })

    if(nextObstacleTime <= 0) {
        createObstacle()
        nextObstacleTime = randomNumberBetween(ObstacleIntervalMin, ObstacleIntervalMax) / gameSpeed
    }
    nextObstacleTime -= currentFrame
}

// defines obstacle element's outline for collision check
export function getObstacleHitBox() {
    return [...document.querySelectorAll(".Obstacle")].map(Obstacle=> {
        return Obstacle.getBoundingClientRect()
    })
}