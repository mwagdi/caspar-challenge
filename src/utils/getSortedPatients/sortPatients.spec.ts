import { Patient } from 'types'; // Import the function to be tested

import { sortPatients } from './sortPatients';

describe('sortPatients', () => {
    it('should sort patients by last_name in ascending order', () => {
        const unsortedPatients = [
            { last_name: 'Smith' },
            { last_name: 'Doe' },
            { last_name: 'Johnson' }
        ] as Patient[];

        const sortedPatients = sortPatients([...unsortedPatients]);

        expect(sortedPatients).toEqual([
            { last_name: 'Doe' },
            { last_name: 'Johnson' },
            { last_name: 'Smith' }
        ]);
    });

    it('should handle an empty array', () => {
        const emptyPatients: Patient[] = [];

        const sortedPatients = sortPatients([...emptyPatients]);

        expect(sortedPatients).toEqual([]);
    });

    it('should handle a single patient', () => {
        const singlePatient = [{ last_name: 'Doe' }] as Patient[];

        const sortedPatients = sortPatients([...singlePatient]);

        expect(sortedPatients).toEqual(singlePatient);
    });

    it('should not modify the original array', () => {
        const unsortedPatients = [
            { last_name: 'Smith' },
            { last_name: 'Doe' },
            { last_name: 'Johnson' }
        ] as Patient[];
        const originalPatients = [...unsortedPatients];

        const sortedPatients = sortPatients([...unsortedPatients]);

        expect(sortedPatients).toEqual([
            { last_name: 'Doe' },
            { last_name: 'Johnson' },
            { last_name: 'Smith' }
        ]);

        expect(unsortedPatients).toEqual(originalPatients);
    });
});
