import { usePatientQuery } from 'hooks';

const Home = () => {
    const { data, loading, error } = usePatientQuery({});
    return (
        <>
            <h1>Patients</h1>
            <div>Patient list here</div>
        </>
    );
};

export default Home;