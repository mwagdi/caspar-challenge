import { useState } from 'react';
import { usePatientQuery } from 'hooks';

import { PatientList } from 'components';

const Home = () => {
    const [search, setSearch] = useState<string | undefined>('');
    const [age, setAge] = useState<'A' | 'B' | 'C' | 'D'>('A');
    const { patients, loading, error } = usePatientQuery({ filter: { search, age } });

    const handleChange = event => {
        if(event.target.name === 'age') {
            setAge(event.target.value);
        }
        else {
            setSearch(event.target.value);
        }
    };

    return (
        <>
            <h1>Patients</h1>
            <input onChange={handleChange} type="text" name="search" id="search"/>
            <select onChange={handleChange} name="age" id="age">
                <option value="A">Select Age Range</option>
                <option value="B">18 - 30</option>
                <option value="C">31 - 45</option>
                <option value="D">&gt; 45</option>
            </select>
            <PatientList patients={patients} />
        </>
    );
};

export default Home;