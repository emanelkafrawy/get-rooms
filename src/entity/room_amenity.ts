import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
    UpdateDateColumn,
    Index,
  } from "typeorm";
import { Rooms } from "./room";
  
  @Entity({ name: "room_amenities" })
  export class RoomAmenity extends BaseEntity {
    @PrimaryGeneratedColumn("increment", { name: "id" })
    id: number | undefined;
  
    @Column({ type: 'varchar', name: 'name', length: 100, nullable: true })
    name: String | undefined;

    @ManyToOne((type) => Rooms, (room) => room.id, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
        nullable: false
    })
    @JoinColumn({ name: "room_id", referencedColumnName: "id" })
    roomId: Rooms | undefined;

    @UpdateDateColumn({ type: "timestamp", name: "record_creation" })
    recordCreation: Date | undefined;
  }
  