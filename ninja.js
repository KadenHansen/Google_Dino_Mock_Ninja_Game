import { incrementAssetProp, getAssetProp, setAssetProp } from "./updateLevel.js"

let ninja = document.querySelector(".ninja")
let ninjaRunningFrames = [
    "./assets/images/ninja/ninja_running/ninja_run_1.png",
    "./assets/images/ninja/ninja_running/ninja_run_2.png",
    "./assets/images/ninja/ninja_running/ninja_run_3.png",
    "./assets/images/ninja/ninja_running/ninja_run_4.png",
    "./assets/images/ninja/ninja_running/ninja_run_5.png",
    "./assets/images/ninja/ninja_running/ninja_run_6.png",
]
// let runningFrameTime = 100
let jumpSpeed = .45
let gravity = .00195
let yVelocity
let isJumping

export function startNinja() {
    isJumping = false
    yVelocity = 0
    setAssetProp(ninja, "--bottom", 20)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function moveNinja(startSpeed, currentTime) {
    cycleRun(startSpeed)
    jumpNinja(currentTime)
}

let currentImage = 0 

export async function cycleRun(interval) {
    if (isJumping) return
    if (currentImage < ninjaRunningFrames.length - 1) {
        if (currentImage === 0) {
            await setTimeout(function() {
                currentImage = 1
            }, interval)
        }
        if (currentImage === 1) {
            await setTimeout(function() {
                currentImage = 2
            }, interval)
        }
        if (currentImage === 2) {
            await setTimeout(function() {
                currentImage = 3
            }, interval)
        }
        if (currentImage === 3) {
            await setTimeout(function() {
                currentImage = 4
            }, interval)
        }
        if (currentImage === 4) {
            await setTimeout(function() {
                currentImage = 5
            }, interval)
        }
    } else {
        await setTimeout(function() {
            currentImage = 0
        }, interval)
    }
    ninja.src = ninjaRunningFrames[currentImage]
}

function jumpNinja(currentTime) {
    if(!isJumping) return

    incrementAssetProp(ninja, "--bottom", yVelocity * currentTime)
    
    if (getAssetProp(ninja, "--bottom") <= 20) {
        setAssetProp(ninja, "--bottom", 20)
        isJumping = false
    }
    
    yVelocity -= gravity * currentTime
}

function onJump(e) {
    if(isJumping) return
    
    ninja.src = "./assets/images/ninja/ninja_jump.png"
    yVelocity = jumpSpeed
    isJumping = true
}