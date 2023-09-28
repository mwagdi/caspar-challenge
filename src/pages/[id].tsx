import { useRouter } from 'next/router';

const PatientDetails = () => {
    const router = useRouter();
    return (
        <>
            <button onClick={() => router.back()}>Back</button>
            <p>{router.query.id}</p>
        </>
    );
};

export default PatientDetails;