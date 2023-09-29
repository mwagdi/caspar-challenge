import { useContext, useState } from 'react';
import { PatientsContext } from 'contexts';
import { usePatientQuery } from 'hooks';
import { useRouter } from 'next/router';

import { Modal } from 'components';

const PatientDetails = (): JSX.Element | null => {
    const router = useRouter();
    const id = typeof router.query.id === 'string'
        ? parseInt(router.query.id)
        : undefined;

   const { deletePatient } = useContext(PatientsContext);

    const [modalVisible, setModalVisible] = useState(false);

    const {
        patient, loading, error
    } = usePatientQuery({ id });

    if(!patient) return null;

    const { patient_id, first_name, last_name, age, gender, email, avatar } = patient;

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const onDeleteClick = () => {
        if (deletePatient) {
            deletePatient(patient_id);
        }
        router.push('/');
    };

    return (
        <>
            <button className="button" onClick={() => router.back()}>Back</button>
            <div>
                <p>ID: {patient_id}</p>
                <h1>{last_name}, {first_name}</h1>
                <div>
                    <img src={avatar} alt="avatar"/>
                    <p>Age: {age}</p>
                    <p>Sex: {gender}</p>
                    <p>Email: {email}</p>
                    <button className="button button--danger" onClick={toggleModal}>Delete Patient</button>
                </div>
            </div>
            {modalVisible && <Modal id={patient_id} onDeleteClick={onDeleteClick} toggleModal={toggleModal} />}
        </>
    );
};

export default PatientDetails;