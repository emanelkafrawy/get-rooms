import CountriesRepository from './repository'
export default class CountriesService {
    private readonly countriesRepo: CountriesRepository
    constructor() {
        this.countriesRepo = new CountriesRepository();
    }

    async getOneOrAllCities(pagination, countryId?: number){        
        return this.countriesRepo.findOneOrAll(pagination, countryId)
    }

    async getCountryCities(pagination, cityId?: number){
        return await this.countriesRepo.getCountryCities(pagination, cityId)
    }
}