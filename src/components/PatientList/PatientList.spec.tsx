/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';

import { PatientList } from './PatientList';

const samplePatients = [
    {
        patient_id: 1,
        first_name: 'John',
        last_name: 'Doe'
    },
    {
        patient_id: 2,
        first_name: 'Jane',
        last_name: 'Smith'
    }
];

describe('PatientList', () => {
    it('renders a list of patients when patients are provided', () => {
        render(<PatientList patients={samplePatients} />);

        expect(screen.getByText('Doe, John')).toBeInTheDocument();
        expect(screen.getByText('Smith, Jane')).toBeInTheDocument();
    });

    it('renders nothing when no patients are provided', () => {
        const { container } = render(<PatientList patients={[]} />);

        expect(container.firstChild).toBeNull();
    });

    it('renders nothing when patients prop is undefined', () => {
        const { container } = render(<PatientList patients={undefined} />);

        expect(container.firstChild).toBeNull();
    });
});
