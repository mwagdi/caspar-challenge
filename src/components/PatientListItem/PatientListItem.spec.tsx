import { render, screen } from '@testing-library/react';

import { PatientListItem } from './PatientListItem';

const samplePatient = {
    patient_id: 1,
    first_name: 'John',
    last_name: 'Doe'
};

describe('PatientListItem', () => {
    it('renders the patient ID and name correctly', () => {
        render(
            <PatientListItem
                patient_id={samplePatient.patient_id}
                first_name={samplePatient.first_name}
                last_name={samplePatient.last_name}
            />
        );

        expect(screen.getByText(`Patient ID: ${samplePatient.patient_id}`)).toBeInTheDocument();
        expect(screen.getByText(`${samplePatient.last_name}, ${samplePatient.first_name}`)).toBeInTheDocument();
    });
});
