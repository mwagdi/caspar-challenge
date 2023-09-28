import { FC } from 'react';
import { PatientListItemProps } from 'types';

export const PatientListItem: FC<PatientListItemProps> = ({ patient_id, first_name, last_name }) => (
    <div>
        <p>Patient ID: {patient_id}</p>
        <p>{last_name}, {first_name}</p>
    </div>
);