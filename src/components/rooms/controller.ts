import {
    Body,
    Get,
    JsonController,
    Param,
    Post,
    Req,
    UseBefore,
} from "routing-controllers";
import RoomsService from "./service";
import { PaginationMiddleware } from "../../common/middlewares/pagination.middleware";

@JsonController('/rooms')
export class RoomsController {
    private readonly roomsSrv : RoomsService
    constructor(){
        this.roomsSrv = new RoomsService()
    }

    @Get("/details/:roomId")
    async getRoomDetails(@Param('roomId') roomId: number) { 
        return this.roomsSrv.getRoomDetails(roomId)
    }

  @UseBefore(PaginationMiddleware)
    @Get("/")
    async getAllRooms(@Req() request: any) { 
        const pagination = request?.query
        return this.roomsSrv.getAllRooms(pagination)
    }

    @Post("/book/:roomId")
    async bookRoom(@Param('roomId') roomId: number, @Body() body: {checkInDate: string, checkoutDate: string}) { 

        if(!body.checkInDate || !body.checkoutDate){
            throw ('Body data is Missing')
        }
        return this.roomsSrv.bookRooms(roomId, body.checkInDate, body.checkoutDate)
    }

    // todo add another api to get room history
}