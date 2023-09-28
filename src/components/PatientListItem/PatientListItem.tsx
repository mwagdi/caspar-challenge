import { FC } from 'react';
import Link from 'next/link';
import { PatientListItemProps } from 'types';

import * as styles from './PatientListItem.module.scss';

export const PatientListItem: FC<PatientListItemProps> = ({ patient_id, first_name, last_name }) => (
    <Link className={styles.patientListItem} href={`/${patient_id}`}>
        <strong>Patient ID: {patient_id}</strong>
        <p className={styles.patientListItem__name}>{last_name}, {first_name}</p>
    </Link>
);