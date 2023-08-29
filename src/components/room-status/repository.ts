import { getManager } from 'typeorm'
import { roomStatusEnum } from '../../common/constants/constant'
import { RoomStatus } from '../../entity/room-status'
export default class RoomStatusRepository {
    async fill() {
        await RoomStatus.upsert([
            {id: 1, status: roomStatusEnum.available},
            {id: 2, status: roomStatusEnum.notAvailable}
        ], ['status']).catch((e)=> { throw(e) })
    }

    async findOneOrAll (id?: number) {
        const dataManager = getManager()
        const query = dataManager.createQueryBuilder(RoomStatus, 'rs')
        if(id){
            query.where('rs.id = :id', {id})
        }
        return query
    }
}