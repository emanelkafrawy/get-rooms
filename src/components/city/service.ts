import CitiesRepository from './repository'
export default class CitiesService {
    private readonly citiesRepo: CitiesRepository
    constructor() {
        this.citiesRepo = new CitiesRepository();
    }

    async getOneOrAllCities(pagination, cityId?: number){
        return await this.citiesRepo.findOneOrAll(pagination, cityId)
    }
}