import { createContext, FC, ReactNode, useState } from 'react';
import { AgeOptions, FilterType, SexOptions } from 'types';

interface FilterContextType {
    filter?: FilterType;
    setFilter?: (value: FilterType) => void;
}

export const FilterContext = createContext<FilterContextType>({
    filter: {
        search: '',
        age: 'A',
        sex: 'ALL'
    }
});

export const FilterProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [filter, setFilter] = useState<FilterType>({
        search: '',
        age: 'A',
        sex: 'ALL'
    });

    const contextValue = {
        filter,
        setFilter
    };

    return (
        <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
    );
};
