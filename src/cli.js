import Config from './config.js'
import { Command } from 'commander'
import { createApiStarwars } from './apiStarwars.js'
import { hasMountain, hasWaterSurface, sumDiameter } from './planetExtractions.js'

const apiStarwars = createApiStarwars()

function buildCLI() {
    const cli = new Command()

    return cli
        .version('0.0.1')
        .description(
            'An application to calculate diameter of planets with mountains and surface water by starwars episode'
        )
        .arguments('<fileNumberArg>')
        .option('-d, --debug', 'output extra debugging', false)
        .description('star wars distance program', {
            fileNumberArg: 'starwars film order number, value between 1 and 6',
        })
        .action(handleAction)
}

async function handleAction(fileNumberArg, options) {
    if (options.debug) {
        console.log('[DEBUG MODE]')
        console.log('[ARG RECEIVE]')
        console.log(fileNumberArg)
        console.log(options)
    }

    if (Config.cli.correctFilmNumbersId.findIndex((correctFilm) => correctFilm === fileNumberArg) === -1) {
        console.log('the film number you enter does not exist!\n Please provide a number between 1 and 6')
        process.exit()
    }
    const fileNumber = parseInt(fileNumberArg)
    const planets = await apiStarwars.getPlanetsByFilmId(fileNumber)
    const planetsWithSurfaceAndMountains = planets.filter(
        (planet) => hasMountain(planet) && hasWaterSurface(planet)
    )
    const planetsDiameter = sumDiameter(planetsWithSurfaceAndMountains)
    console.log(planetsDiameter)
}

export function startCLI(args) {
    const cli = buildCLI()
    cli.parse(args)
}
