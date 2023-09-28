import { ChangeEvent, useContext, useState } from 'react';
import { FilterContext } from 'contexts';
import { usePatientQuery } from 'hooks';
import { AgeOptions } from 'types';

import { PatientList } from 'components';

const Home = () => {
    const { search, setSearch, age, setAge } = useContext(FilterContext);
    // const [search, setSearch] = useState<string | undefined>('');
    // const [age, setAge] = useState<'A' | 'B' | 'C' | 'D'>('A');
    console.log({ search, age });
    const { patients, loading, error } = usePatientQuery({ filter: { search, age } });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if(event.target.name === 'age') {
            if (setAge) {
                setAge(event.target.value as AgeOptions);
            }
        }
        else {
            if (setSearch) {
                setSearch(event.target.value);
            }
        }
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
            <PatientList patients={patients} />
        </>
    );
};

export default Home;