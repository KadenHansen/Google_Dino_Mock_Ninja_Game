import { getAssetProp, setAssetProp, incrementAssetProp } from "./updateLevel.js"

let speed = .05
let shurikenIntervalMin = 500
let shurikenIntervalMax = 2000
let world = document.querySelector(".world")

let nextShurikenTime

export function setUpShuriken() {
    nextShurikenTime = shurikenIntervalMin
    document.querySelectorAll(".shuriken").forEach(shuriken => {
        shuriken.remove()
    })
}

export function moveShuriken(currentFrame, gameSpeed) {
    document.querySelectorAll(".shuriken").forEach(shuriken => {
        incrementAssetProp(shuriken, "--left", gameSpeed * currentFrame * speed * -1)

        if(getAssetProp(shuriken, "--left") <= -30) {
            shuriken.remove()
        }
    })

    if(nextShurikenTime <= 0) {
        createShuriken()
        nextShurikenTime = randomNumberBetween(shurikenIntervalMin, shurikenIntervalMax) / gameSpeed
    }
    nextShurikenTime -= currentFrame
}

function createShuriken() {
    let shuriken = document.createElement("img")
    shuriken.src = "./assets/images/shuriken.gif"
    shuriken.classList.add("shuriken")
    setAssetProp(shuriken, "--left", 100)
    world.append(shuriken)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}