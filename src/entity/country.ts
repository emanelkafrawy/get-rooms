import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany } from 'typeorm';
import { Cities } from './city';

@Unique('uniqueCountries',['name'])
@Entity({ name: 'countries' })
export class Countries extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number | undefined;

  @Column({ type: 'varchar', name: 'name', length: 100, nullable: true })
  name: String | undefined;

  @OneToMany(
    (type) => Cities,
    (city) => city.id,
    {
      eager: false
    }
  )
  cityId: Cities[] | undefined;
}
