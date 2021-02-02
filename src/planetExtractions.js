import Config from './config.js'

export function hasWaterSurface(planet) {
    return parseInt(planet.surface_water, 0) >= Config.planetExtraction.minimumSurfaceWater
}

export function hasMountain(planet) {
    return planet.terrain
        .split(',')
        .map((terrain) => terrain.trim())
        .find((terrain) =>
            Config.planetExtraction.montainsNamesFilter.find((terrainFilter) => terrainFilter === terrain)
        )
}

export function sumDiameter(planets) {
    return planets.reduce((sum, planet) => {
        return sum + parseInt(planet.diameter, 0)
    }, 0)
}
