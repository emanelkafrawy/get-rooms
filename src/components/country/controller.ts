import {
    Get,
    JsonController,
    Req,
    UseBefore,
} from "routing-controllers";
import CountriesService from "./service";
import { PaginationMiddleware } from "../../common/middlewares/pagination.middleware";

@JsonController('/countries')
export class CountriesController {
    private readonly countriesSrv : CountriesService
    constructor(){
        this.countriesSrv = new CountriesService()
    }

  @UseBefore(PaginationMiddleware)
    @Get("/:countryId?")
    async getOneOrAllCities(@Req() request: any) { 
        const pagination = request?.query
        const countryId= request.params?.countryId;
        const data = await this.countriesSrv.getOneOrAllCities(pagination, countryId).catch((e) => { throw(e) })
        return {
            message: 'Execute countries data successfully',
            data
        }
    }

    @UseBefore(PaginationMiddleware)
    @Get("/cities/:countryId")
    async getCountryCities(@Req() request: any) { 
        const pagination = request?.query
        const countryId= request.params?.countryId;
        const data = await this.countriesSrv.getCountryCities(pagination, countryId).catch((e) => { throw(e) })
        return {
            message: 'Execute country cities data successfully',
            data
        }
    }
}