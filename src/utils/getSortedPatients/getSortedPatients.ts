export const getSortedPatients = (patients, shouldSort) => {
    if(shouldSort) {
        return patients.sort((a, b) => {
            const nameA = a.last_name.toUpperCase();
            const nameB = b.last_name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });
    }

    return patients;
};