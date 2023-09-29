import { createContext, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { usePatientQuery } from 'hooks';
import { FilterType, Patient } from 'types';

interface PatientsContextType {
    filter: FilterType;
    setFilter?: (value: FilterType) => void;
    patients?: Patient[];
    setPatients?: (patients: Patient[]) => void;
    patient?: undefined;
    loading: boolean;
    error: Error | null;
}

export const PatientsContext = createContext<PatientsContextType>({
    filter: {
        search: '',
        age: 'A',
        sex: 'ALL'
    },
    patients: [],
    loading: true,
    error: null
});

export const PatientsProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [filter, setFilter] = useState<FilterType>({
        search: '',
        age: 'A',
        sex: 'ALL'
    });
    const [patients, setPatients] = useState<Patient[]|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error|null>(null);

    const searchRef = useRef(filter?.search);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        const fetchData = async () => {
            try {
                const query =
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
                    body: JSON.stringify({ query, variables: { filter } })
                });
                const { data: { patient: singlePatient, patients: patientList } } = await response.json();

                setPatients(patientList);
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
            searchRef.current = filter?.search;
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
    }, [filter]);
    // const { patients, patient, loading, error } = usePatientQuery({ filter });

    const contextValue = {
        filter,
        setFilter,
        patients,
        setPatients,
        loading,
        error
    };

    return (
        <PatientsContext.Provider value={contextValue}>{children}</PatientsContext.Provider>
    );
};
