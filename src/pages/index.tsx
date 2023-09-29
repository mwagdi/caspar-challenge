import { ChangeEvent, useContext } from 'react';
import { PatientsContext } from 'contexts';
import { Patient } from 'types';
import { sortPatients } from 'utils';

import { PatientList } from 'components';

const Home = () => {
    const { filter, setFilter, patients, setPatients, loading, error } = useContext(PatientsContext);
    const { search, age, sex } = filter;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (setFilter) {
            setFilter({
                ...filter,
                [event.target.name]: event.target.value
            });
        }
    };

    const handleClick = () => {
        if (setPatients) {
            setPatients(sortPatients(patients as Patient[]));
        }
    };

    return (
        <>
            <h1>Patients</h1>
            <form>
                <input
                    placeholder="Search for a patient..."
                    onChange={handleChange}
                    value={search}
                    type="text"
                    name="search"
                    id="search"/>
                <select onChange={handleChange} value={age} name="age" id="age">
                    <option value="A">Select Age Range</option>
                    <option value="B">18 - 30</option>
                    <option value="C">31 - 45</option>
                    <option value="D">&gt; 45</option>
                </select>
                <select onChange={handleChange} value={sex} name="sex" id="sex">
                    <option value="ALL">Select Sex</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>
            </form>
            <button className="button" onClick={handleClick}>Sort Alphabetically</button>
            <PatientList patients={patients} />
        </>
    );
};

export default Home;