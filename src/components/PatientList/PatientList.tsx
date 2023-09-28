import { FC } from 'react';
import { PatientListItemProps } from 'types';

import { PatientListItem } from 'components';

export const PatientList: FC<{patients?: PatientListItemProps[]}> = ({ patients }) => patients && patients.length
? (
    <div>
        {patients.map(patient => <PatientListItem key={patient.patient_id} {...patient} />)}
    </div>
)
: null;