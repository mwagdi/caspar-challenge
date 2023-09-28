import { useEffect, useState } from 'react';
import { FetchPatientsArgs, Patient } from 'types';

export const usePatientQuery = ({ id, filter }: FetchPatientsArgs) => {
    const [data, setData] = useState<Patient|Patient[]|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = id ?
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
                    }` :
                    `query GetPatients($filter: FilterInput) {
                        patients(filter: $filter) {
                            patient_id
                            first_name
                            last_name
                        }
                    }`;

                const response = await fetch('/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query, variables: { id,filter } })
                });
                const { data: { patient, patients } } = await response.json();

                setData(patient || patients);
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
    }, [id, filter]);

    return { data, loading, error };
};