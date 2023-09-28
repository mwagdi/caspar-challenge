import { createContext, FC, ReactNode, useState } from 'react';
import { AgeOptions } from 'types';

interface FilterContextType {
    search?: string;
    age: AgeOptions;
    setSearch?: (value: string) => void;
    setAge?: (value: AgeOptions) => void;
}

export const FilterContext = createContext<FilterContextType>({
    search: '',
    age: 'A'
});

export const FilterProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [search, setSearch] = useState<string | undefined>('');
    const [age, setAge] = useState<AgeOptions>('A');

    const contextValue = {
        search,
        age,
        setSearch,
        setAge
    };

    return (
        <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
    );
};
