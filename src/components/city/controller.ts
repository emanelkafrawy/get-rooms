import {
    Get,
    JsonController,
    Req,
    UseBefore,
} from "routing-controllers";
import CitiesService from "./service";
import { PaginationMiddleware } from "../../common/middlewares/pagination.middleware";

@JsonController('/cities')
export class CitiesController {
    private readonly citiesSrv : CitiesService
    constructor(){
        this.citiesSrv = new CitiesService()
    }

    @UseBefore(PaginationMiddleware)
    @Get("/:cityId?")
    async getOneOrAllCities(@Req() request: any) { 
        const cityId= request.params?.cityId;
        const pagination = request?.query
        const data = await this.citiesSrv.getOneOrAllCities(pagination, cityId).catch((e) => { throw(e) })
        return {
            message: 'Execute cities data successfully',
            data
        }
    }
}