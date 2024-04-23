import { User } from '../User/User.type';

export enum TransportType {
    LightDuty = 'LightDuty',
    MediumDuty = 'MediumDuty',
    HeavyDuty = 'HeavyDuty',
}


export type Transport = {
    id: string;
    name: string;

    licensePlate: string;

    tonnage: number;

    type: TransportType;

    carrierId: string;

    carrier: User;
}