export interface Appointment {
    id: string;
    date: Date;
    appointmentType: string;
    active: boolean;
    ownerId?: string;
}

