import { getManager } from 'typeorm'
import { Cities } from '../../entity/city'
import { Countries } from '../../entity/country'
import { PaginationService } from '../pagination'
export default class CountriesRepository {

    async findOneOrAll (pagination, countryId?: number) {
      const paginationService = new PaginationService()
        const dataManager = getManager()
        const query = dataManager.createQueryBuilder(Countries, 'ct')
        .select('ct.id', 'id')
        .addSelect('ct.name', 'name')
        if(countryId){
            query.where('ct.id = :countryId', {countryId})
        }
        return paginationService.addPagination({...pagination, builder: query})
    }

    async getCountryCities (pagination, countryId: number) {
      const paginationService = new PaginationService()
        const dataManager = getManager()
        const query = dataManager.createQueryBuilder(Countries, 'ct')
        .leftJoin(Cities, 'c', 'ct.id=c.country_id')
        .select('ct.id', 'id')
        .addSelect('ct.name', 'countryName')
        .addSelect('c.name', 'cityName')
        .addSelect('c.id', 'cityId')
        .where('ct.id = :countryId', { countryId })
        return paginationService.addPagination({...pagination, builder: query})
    }

}