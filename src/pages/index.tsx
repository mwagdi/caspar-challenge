import { usePatientQuery } from 'hooks';

import { PatientList } from 'components';

const Home = () => {
    const { patients, loading, error } = usePatientQuery({});
    return (
        <>
            <h1>Patients</h1>
            <PatientList patients={patients} />
        </>
    );
};

export default Home;