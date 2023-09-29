import { getSortedPatients } from './getSortedPatients';

describe('getSortedPatients', () => {
    it('should return the same array when shouldSort is false', () => {
        const patients = [
            { last_name: 'Doe' },
            { last_name: 'Smith' },
            { last_name: 'Johnson' }
        ];

        const sortedPatients = getSortedPatients(patients, false);

        expect(sortedPatients).toEqual(patients);
    });

    it('should sort patients by last_name when shouldSort is true', () => {
        const unsortedPatients = [
            { last_name: 'Smith' },
            { last_name: 'Doe' },
            { last_name: 'Johnson' }
        ];

        const sortedPatients = getSortedPatients(unsortedPatients, true);

        expect(sortedPatients).toEqual([
            { last_name: 'Doe' },
            { last_name: 'Johnson' },
            { last_name: 'Smith' }
        ]);
    });

    it('should handle empty patient array', () => {
        const emptyPatients = [];

        const sortedPatients = getSortedPatients(emptyPatients, true);

        expect(sortedPatients).toEqual([]);
    });

    it('should handle a single patient', () => {
        const singlePatient = [{ last_name: 'Doe' }];

        const sortedPatients = getSortedPatients(singlePatient, true);

        expect(sortedPatients).toEqual(singlePatient);
    });
});
