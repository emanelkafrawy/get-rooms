import {
    Get,
    JsonController,
    Param,
    Post,
    Req,
} from "routing-controllers";
import RoomStatusService from "./service";

@JsonController('/room-status')
export class RoomStatusController {
    private readonly roomStatusSrv : RoomStatusService
    constructor(){
        this.roomStatusSrv = new RoomStatusService()
    }

    @Post("/fill")
    async fillRoomStatuses() {
        
        await this.roomStatusSrv.fill().catch((e) => { throw(e) })
        return {
            message: 'data inserted successfully'
        }
    }

    @Get("/:id?")
    async getOneOrAllRoomStatuses(@Req() request: any) { 
        const id= request.params?.id;
        const data = await this.roomStatusSrv.getRooms(id).catch((e) => { throw(e) })
        return {
            message: 'Execute room status data successfully',
            data
        }
    }
}