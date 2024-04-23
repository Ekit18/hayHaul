import { Timestamps } from 'src/lib/classes/timestamps.class';
import { User } from 'src/user/user.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TransportType {
    LightDuty = 'LightDuty',
    MediumDuty = 'MediumDuty',
    HeavyDuty = 'HeavyDuty',
}

const roles = Object.values(TransportType)
    .map((role) => `'${role}'`)
    .join(', ');

@Entity()
@Check(`"type" IN (${roles})`)
export class Transport extends Timestamps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    licensePlate: string;

    @Column()
    tonnage: number;

    @Column()
    type: TransportType;

    @Column()
    carrierId: string;

    @ManyToOne(() => User, (user) => user.transports)
    @JoinColumn({ name: 'carrierId' })
    carrier: User;
}