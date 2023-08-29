import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { Rooms } from './room';

@Entity({ name: 'booking' })
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number | undefined;

  @ManyToOne((type) => Rooms, (room) => room.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true
  })
  roomId: Rooms | undefined;

  @Index({ unique: false })
  @Column({ type: 'date', name: 'check_in_date', nullable: true })
  checkInDate: Date | undefined;

  @Index({ unique: false })
  @Column({ type: 'date', name: 'check_out_date', nullable: true })
  checkOutDate: Date | undefined;

}
