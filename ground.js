import { getAssetProp, incrementAssetProp, setAssetProp } from "./updateLevel.js"

let ground = document.querySelectorAll(".ground")
let speed = .05

// places ground images to overlap at start
export function layGround() {
    setAssetProp(ground[0], "--left", 0)
    setAssetProp(ground[1], "--left", 100)
}

// handles ground movement and replaces each ground image to create infinite ground loop
export function moveGround(currentTime, gameSpeed) {
    ground.forEach(groundSection => {
        incrementAssetProp(groundSection, "--left", currentTime * gameSpeed * speed * -1)

        if (getAssetProp(groundSection, "--left") <= -100) {
            incrementAssetProp(groundSection, "--left", 200)
        }
    })
}
