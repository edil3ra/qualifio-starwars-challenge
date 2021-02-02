import axios from 'axios'
import Config from './config.js'

export function createApiStarwars() {
    const api = axios.create({
        baseURL: Config.starwarsApi.root,
    })

    async function get(apiName, id) {
        try {
            const response = await api.get(`/${apiName}/${id}`)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getFilm: (id) => get(Config.starwarsApi.films, id),
        getPlanet: (id) => get(Config.starwarsApi.planets, id),
        async getPlanetsByFilmId(id) {
            const film = await this.getFilm(id)
            const planets = await film.planets.map(async (url) => {
                // could be improved with regex I try with url module but it wasn't improving id extraction
                const splittedUrl = url.split('/')
                const urlIndex = splittedUrl[splittedUrl.length - 2]
                const result = await this.getPlanet(urlIndex)
                return result
            })
            return Promise.all(planets)
        },
    }
}
