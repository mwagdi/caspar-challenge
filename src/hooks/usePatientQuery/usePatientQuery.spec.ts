import { renderHook, waitFor } from '@testing-library/react';

import { usePatientQuery } from './usePatientQuery';

jest.mock('node-fetch');
const fetch = require('node-fetch');

describe('usePatientQuery', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should fetch patient data when id is provided', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: {
                    patient: {
                        patient_id: 1,
                        first_name: 'John',
                        last_name: 'Doe',
                        email: 'john@example.com',
                        gender: 'Male',
                        age: 30,
                        avatar: 'avatar-url'
                    }
                }
            })
        });

        const { result } = renderHook(() =>
            usePatientQuery({ id: 1 })
        );

        await waitFor(() => {
            expect(result.current.patient).toEqual({
                patient_id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
                gender: 'Male',
                age: 30,
                avatar: 'avatar-url'
            });
        });
        
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('should handle an error response', async () => {
        fetch.mockRejectedValueOnce(new Error('Network Error'));

        const { result } = renderHook(() =>
            usePatientQuery({ id: 2 })
        );

        await waitFor(() => {
            expect(result.current.patient).toBe(undefined);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
    });
});
