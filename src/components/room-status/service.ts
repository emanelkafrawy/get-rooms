import RoomStatusRepository from './repository'
export default class roomStatusService {
    private readonly roomStatusRepo: RoomStatusRepository
    constructor() {
        this.roomStatusRepo = new RoomStatusRepository();
    }
    async fill () {
        await this.roomStatusRepo.fill().catch((e) =>{ throw(e) })
    }

    async getRooms(id?: number){
        return (await this.roomStatusRepo.findOneOrAll(id))
        .execute()
        .catch((e) =>{ throw(e) })
    }
}