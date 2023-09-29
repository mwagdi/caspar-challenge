import { ChangeEvent, useContext, useState } from 'react';
import { FilterContext } from 'contexts';
import { usePatientQuery } from 'hooks';
import { getSortedPatients } from 'utils';

import { PatientList } from 'components';

const Home = () => {
    const { filter, setFilter } = useContext(FilterContext);
    const { patients, loading, error } = usePatientQuery({ filter });

    const [sorted, setSorted] = useState(false);

    const { search, age, sex } = filter;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    };

    const handleClick = () => {
        setSorted(true);
    };

    return (
        <>
            <h1>Patients</h1>
            <input onChange={handleChange} value={search} type="text" name="search" id="search"/>
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
            <button onClick={handleClick}>Sort Alphabetically</button>
            <PatientList patients={getSortedPatients(patients, sorted)} />
        </>
    );
};

export default Home;