import { useEffect, useRef, useState } from 'react';
import { FetchPatientsArgs, Patient } from 'types';

export const usePatientQuery = ({ id, filter }: FetchPatientsArgs) => {
    const [patients, setPatients] = useState<Patient[]|undefined>(undefined);
    const [patient, setPatient] = useState<Patient|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error|null>(null);

    const searchRef = useRef(filter?.search);

    useEffect(() => {
        let timeoutId;
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
                    body: JSON.stringify({ query, variables: { id, filter } })
                });
                const { data: { patient: singlePatient, patients: patientList } } = await response.json();

                setPatients(patientList);
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

        if(filter?.search !== searchRef.current) {
            searchRef.current = search;
            timeoutId = setTimeout(() => {
                fetchData();
            }, 500);
        }
        else {
            fetchData();
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [id, filter]);

    return { patient, patients, loading, error };
};