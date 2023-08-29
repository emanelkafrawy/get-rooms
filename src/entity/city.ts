import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Countries } from './country';

@Entity({ name: 'cities' })
export class Cities extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number | undefined;

  @Column({ type: 'varchar', name: 'name', length: 100, nullable: true })
  name: String | undefined;

  @ManyToOne((type) => Countries, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'country_id' })
  countryId: Countries | undefined;
}
