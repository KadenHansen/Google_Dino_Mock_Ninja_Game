export function getAssetProp(asset, prop) {
    return parseFloat(getComputedStyle(asset).getPropertyValue(prop)) || 0
}

export function setAssetProp(asset, prop, value) {
    asset.style.setProperty(prop, value)
}

export function incrementAssetProp(asset, prop, inc) {
    setAssetProp(asset, prop, getAssetProp(asset, prop) + inc)
}