import { getManager, getRepository } from 'typeorm'
import { Rooms } from '../../entity/room';
import { Cities } from '../../entity/city';
import { Countries } from '../../entity/country';
import { RoomStatus } from '../../entity/room-status';
import { RoomRestaurant } from '../../entity/room-resturant';
import { PaginationService } from '../pagination';
import { Booking } from '../../entity/booking';
export default class RoomsRepository {

    async getRoomDetails(roomId){
      const roomRepository = getRepository(Rooms);
      return roomRepository.find({
        where: {
          id: roomId
        },
        relations: ['nearRestaurants', 'nearPetrolStation', 'amenityId', 'roomPhotos', 'nearSupermarkets']
      });
    }

    async getAllRooms(pagination){
      const conditions = pagination?.conditions || {}
      console.log({conditions});
      
      const paginationService = new PaginationService()
      const query =  getManager().createQueryBuilder(Rooms, 'r')
      .leftJoin(Cities, 'c', 'c.id = r.cityId')
      .leftJoin(Countries, 'ct', 'ct.id = c.country_id')
      .leftJoin(RoomStatus, 'rs', 'rs.id = r.roomStatus')
      .select('r.id', 'id')
      .addSelect('r.title', 'name')
      .addSelect('r.description', 'description')
      .addSelect('r.location', 'location')
      .addSelect('r.size', 'size')
      .addSelect('rs.status', 'status')
      .addSelect('r.roomStatus', 'roomStatus')
      .addSelect('c.name', 'cityName')
      .addSelect('ct.name', 'countryName')
      await this.dynamicWhereQuery(
        conditions,
        query, 
        ['id', 'name', 'title', 'description', 'size','location', 'roomStatus'],
        ['cityName'],
        ['countryName'],
        ['status']
        )
      return paginationService.addPagination({...pagination, builder: query})
    }

    async dynamicWhereQuery(conditions, query, roomKeys=[], cityKeys=[], countryKeys=[], roomStatusKeys=[]){
      const keys = Object.keys(conditions)
      const params:any = {}; 
      keys.map((key, index) => {
        let newKey = ''
        if(roomKeys.includes(key)){  
          newKey = 'r.'
        }
        else if(cityKeys.includes(key)){
          if(key == 'cityName'){
            key = 'name'
          }
          newKey = 'c.'
        }
        else if(countryKeys.includes(key)){
          if(key == 'countryName'){
            key = 'name'
          }
          newKey = 'ct.'
        }
        else if(roomStatusKeys.includes(key)){
          newKey = 'rs.'
        }
        params[newKey+key] = `%${conditions[key]}%`;
        console.log(params);
        
        const whereClause = `${newKey+key} like :${newKey+key}`;
        if(index === 0){
          query.where(whereClause, params)
          return;
        }
        query.andWhere(whereClause, params);
      })
    }

    async checkAvailableRoom(roomId){
      const roomRepository = getRepository(Rooms);
      return roomRepository.findOne({
        where: {
          id: roomId
        },
        select: ['id']
      });
    }

    async changeRoomStatus(roomId){
      await getManager().update(Rooms, { id:roomId }, { roomStatus: {id: 2} })
    }

    async bookRoom(roomId, checkInDate, checkoutDate){
      await getManager()
      .insert(Booking, {
        roomId: roomId,
        checkInDate: checkInDate,
        checkOutDate: checkoutDate
      })
    }
}