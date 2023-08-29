import { Booking } from './booking';
import { Rooms } from './room';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from 'typeorm';

@Entity({ name: 'room_status' })
export class RoomStatus extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'status_id' })
  id: number | undefined;

  @Column({ type: 'varchar', name: 'status_desc', length: 45, nullable: true })
  status: String | undefined;

  @OneToMany((type) => Booking, (booking) => booking.id, {
    lazy: true
  })
  BookingId: Booking[] | undefined;
}
