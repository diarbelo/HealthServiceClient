import {Appointment} from './appointment.model';

export interface Patient {
    id: number;
    name: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;

    Appointments?: Appointment[];
}
