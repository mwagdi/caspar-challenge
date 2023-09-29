export interface Patient {
    patient_id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    age: number;
    avatar: string;
}

export type AgeOptions = 'A' | 'B' | 'C' | 'D';

export type SexOptions = 'ALL' | 'MALE' | 'FEMALE';

export type FilterType = {
    search?: string
    age?: AgeOptions
    sex?: SexOptions
}

export interface FetchPatientsArgs {
    id?: number;
    filter?: FilterType
}

export type PatientListItemProps = Pick<Patient, 'patient_id' | 'first_name' | 'last_name'>;