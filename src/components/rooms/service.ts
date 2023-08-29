import RoomsRepository from './repository'
export default class RoomsService {
    private readonly roomsRepo: RoomsRepository
    constructor() {
        this.roomsRepo = new RoomsRepository();
    }

    // todo need to change response to user SSE instead of json to handle heavy loads
    async getAllRooms (pagination){
        return this.roomsRepo.getAllRooms(pagination)
    }

    async getRoomDetails (roomId){
        return this.roomsRepo.getRoomDetails(roomId)
    }

    async bookRooms (roomId, checkInDate, checkoutDate){
        const isAvailable = (await this.roomsRepo.checkAvailableRoom(roomId)).roomStatus.id
        // todo need to check if the date is valid
        if(new Date(checkInDate) > new Date(checkoutDate)){
            throw ('Check in date can\'t be greater than check out date')
        }
        if(isAvailable !==1){
            throw ('No such room or Not Available')
        }
        await this.roomsRepo.changeRoomStatus(roomId)
        await this.roomsRepo.bookRoom(roomId, checkInDate,checkoutDate)
        return {
            msg: 'Booked Successfully'
        }
    }

}