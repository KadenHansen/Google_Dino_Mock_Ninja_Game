import { incrementAssetProp, getAssetProp, setAssetProp } from "./updateLevel.js"

let ninja = document.querySelector(".ninja")
let jumpSpeed = .45 // sets vertical jump speed
let gravity = .00195 // sets vertical fall speed
let yVelocity // sets vertical movement up on jump
let isJumping // determines whether ninja is actively jumping
let currentImage = 0 // initializes running animation frame

// contains assets for ninja running animation
let ninjaRunningFrames = [
    "./assets/images/ninja/ninja_running/ninja_run_1.png",
    "./assets/images/ninja/ninja_running/ninja_run_2.png",
    "./assets/images/ninja/ninja_running/ninja_run_3.png",
    "./assets/images/ninja/ninja_running/ninja_run_4.png",
    "./assets/images/ninja/ninja_running/ninja_run_5.png",
    "./assets/images/ninja/ninja_running/ninja_run_6.png",
]

// handles initial ninja behavior at start and restart
export function startNinja() {
    isJumping = false
    yVelocity = 0
    setAssetProp(ninja, "--bottom", 20)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

// handles seperate ninja behaviors during game
export function moveNinja(startSpeed, currentTime) {
    cycleRun(startSpeed)
    jumpNinja(currentTime)
}

// handles ninja running animation
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

// handles ninja vertical movement behavior on jump
function jumpNinja(currentFrame) {
    if(!isJumping) return

    incrementAssetProp(ninja, "--bottom", yVelocity * currentFrame)
    
    if (getAssetProp(ninja, "--bottom") <= 20) {
        setAssetProp(ninja, "--bottom", 20)
        isJumping = false
    }
    
    yVelocity -= gravity * currentFrame
}

// handles ninja appearance and determines variable value on jump
function onJump(e) {
    if(isJumping || e.code !== "Space") return
    
    ninja.src = "./assets/images/ninja/ninja_jump.png"
    yVelocity = jumpSpeed
    isJumping = true
}

// defines ninja element's outline for collision check
export function getNinjaHitBox() {
    return ninja.getBoundingClientRect()
}

// changes ninja's appearance on lose
export function ninjaHit() {
    ninja.src = "./assets/images/ninja/ninja_hit.png"
}