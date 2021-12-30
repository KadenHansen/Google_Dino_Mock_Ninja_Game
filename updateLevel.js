
// receives numerical values for css custom properties of entered asset
export function getAssetProp(asset, prop) {
    return parseFloat(getComputedStyle(asset).getPropertyValue(prop)) || 0
}

// defines numerical value for selected asset property, to be determined by getAssetProp
export function setAssetProp(asset, prop, value) {
    asset.style.setProperty(prop, value)
}

// handles asset movement using getAssetProp and SetAssetProp to retrieve css value, then re-assign css value
export function incrementAssetProp(asset, prop, inc) {
    setAssetProp(asset, prop, getAssetProp(asset, prop) + inc)
}