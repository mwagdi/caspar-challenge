import { useEffect, useRef, useState } from 'react';
import { FetchPatientsArgs, FilterType, Patient } from 'types';

export const usePatientQuery = ({ id }: { id?: number }) => {
    const [patient, setPatient] = useState<Patient|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query =
                    `query GetPatient($id: Int!) {
                        patient(id: $id) {
                            patient_id
                            first_name
                            last_name
                            email
                            gender
                            age
                            avatar
                        }
                    }`;

                const response = await fetch('/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query, variables: { id } })
                });
                const { data: { patient: singlePatient } } = await response.json();

                setPatient(singlePatient);
                setLoading(false);
            }
            catch (e) {
                if(e instanceof Error) {
                    setError(e);
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { patient, loading, error };
};