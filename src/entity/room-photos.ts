import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne } from 'typeorm';
import { Rooms } from './room';

@Entity({ name: 'room_photos' })
export class RoomPhotos extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number | undefined;

  //supposed to add the link on cloud and store here only the image name (not the full path)
  /*
    * cloud path: https:xx/..container/xxx.png
    * image_path: xxx.png
  */
  @Column({ type: 'varchar', name: 'image_path', length: 100, nullable: true })
  imagePath: String | undefined;

  @ManyToOne((type) => Rooms, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  roomId: Rooms | undefined;

}
