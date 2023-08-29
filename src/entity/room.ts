import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { RoomPhotos } from './room-photos';
import { Cities } from './city';
import { RoomStatus } from './room-status';
import { RoomAmenity } from './room_amenity';
import { RoomSupermarkets } from './room-supermarkets';
import { RoomRestaurant } from './room-resturant';
import { RoomPetrolStation } from './room-petrol-station';

@Entity({ name: 'rooms' })
export class Rooms extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number | undefined;

  @Column({ type: 'varchar', name: 'title', length: 50, nullable: true })
  title: String | undefined;

  @Column({ type: 'varchar', name: 'description', length: 100, nullable: true })
  description: String | undefined;

  @Column({ type: 'varchar', name: 'location', length: 100, nullable: true })
  location: String | undefined;

  @Column({ type: 'varchar', name: 'size', length: 100, nullable: true })
  size: String | undefined;
  
  @OneToMany(
    (type) => RoomPhotos,
    (roomPhotos) => roomPhotos.roomId,
    {
        nullable: true,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        eager: true,
        lazy: true
    }
  )
  @JoinColumn({ name: 'room_id' })
  roomPhotos: RoomPhotos[] | undefined;

  @ManyToOne((type) => RoomStatus, (roomStatus) => roomStatus.id, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true
  })
  roomStatus: RoomStatus | undefined;

  @OneToMany(
    (type) => RoomSupermarkets,
    (RoomSupermarkets) => RoomSupermarkets.roomId,
    {
      lazy: true
    }
  )
  @JoinColumn({ name: 'room_id' })
  nearSupermarkets: RoomSupermarkets[] | undefined;

  @OneToMany(
    (type) => RoomRestaurant,
    (RoomRestaurant) => RoomRestaurant.roomId,
    {
      nullable: true,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      eager: true,
      lazy: true
    }
  )
  @JoinColumn({ name: 'room_id' })
  nearRestaurants: RoomRestaurant[] | undefined;
 
  @OneToMany(
    (type) => RoomPetrolStation,
    (nr) => nr.roomId,
    {
      lazy: true
    }
  )
  @JoinColumn({ name: 'room_id' })
  nearPetrolStation: RoomPetrolStation[] | undefined;
 
  @ManyToOne(
    (type) => Cities,
    (cities) => cities.id,
    {
      lazy: true
    }
   )
  city: Cities[] | undefined;

  @OneToMany(
    (type) => RoomAmenity,
    (amenity) => amenity.roomId,
    {
      lazy: true
    }
  )
  @JoinColumn({ name: 'room_id' })
  amenityId: RoomAmenity[] | undefined;
}
