export default class Config {
    static cli = {
        correctFilmNumbersId: ['1', '2', '3', '4', '5', '6'],
    }

    static starwarsApi  = {
        root: 'https://swapi.dev/api',
        films: 'films',
        planets: 'planets',
    }

    static planetExtraction  = {
        minimumSurfaceWater: 1,
        montainsNamesFilter: ['mountains', 'mountain ranges'],
    } 
    
}
