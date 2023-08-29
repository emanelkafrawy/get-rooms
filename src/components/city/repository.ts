import { getManager } from 'typeorm'
import { Cities } from '../../entity/city'
import { PaginationService } from '../pagination'
import { Countries } from '../../entity/country'
export default class CitiesRepository {

    async findOneOrAll (pagination, cityId?: number) {
        const paginationService = new PaginationService()

        const dataManager = getManager()
        const query = dataManager.createQueryBuilder(Cities, 'c')
        .leftJoin(Countries, 'ct', 'ct.id=c.country_id')
        .select('c.id', 'id')
        .addSelect('c.name', 'cityName')
        .addSelect('c.country_id', 'countryId')
        .addSelect('ct.name', 'countryName')
        if(cityId){
            query.where('c.id = :cityId', {cityId})
        }
        return paginationService.addPagination({...pagination, builder: query})
    }

}