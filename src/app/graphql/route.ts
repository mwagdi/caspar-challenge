import { GraphQLError } from 'graphql/error';
import { createSchema, createYoga } from 'graphql-yoga';
import { FetchPatientsArgs, Patient } from 'types';

const fetchPatients = async ({ id, filter }: FetchPatientsArgs) => {
    const response = await fetch('http://localhost:3001/patients');
    const responseJson = await response.json();

    if (id) return responseJson.find((item: Patient) => item.patient_id === id);

    let searchResult = responseJson;
    if (filter) {
        const { search, age, sex } = filter;

        if (search) {
            searchResult = responseJson
                .filter((item: Patient) =>
                    item.patient_id.toString().includes(search)
                    || item.first_name.toLowerCase().includes(search)
                    || item.last_name.toLowerCase().includes(search) || item.email.includes(search));
        }

        switch (age) {
            case 'B':
                searchResult = searchResult.filter((item: Patient) => item.age >= 18 && item.age <= 30);
                break;
            case 'C':
                searchResult = searchResult.filter((item: Patient) => item.age >= 31 && item.age <= 45);
                break;
            case 'D':
                searchResult = searchResult.filter((item: Patient) => item.age > 45);
                break;
            default:
                break;
        }

        switch (sex) {
            case 'MALE':
                searchResult = searchResult.filter((item: Patient) => item.gender === 'Male');
                break;
            case 'FEMALE':
                searchResult = searchResult.filter((item: Patient) => item.gender === 'Female');
                break;
            default:
                break;
        }
    }
    return searchResult;
};

const schema = createSchema({
    typeDefs: `
        type Query {
            patients(filter: FilterInput): [Patient!]
            patient(id: Int!): Patient!
        }
        
        type Mutation {
            deletePatient(id: Int!): [Patient!]
        }
        
        enum AgeRange {
            A
            B
            C
            D
        }
        
        enum Sex {
            ALL
            MALE
            FEMALE
        }
        
        input FilterInput {
            search: String
            age: AgeRange
            sex: Sex
        }
        
        type Patient {
            patient_id: Int!
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            age: Int!
            avatar: String!
        }
    `,
    resolvers: {
        Query: {
            patients: async (_, { filter }) => {
                try {
                    return await fetchPatients({ filter });
                } catch (e) {
                    return new GraphQLError('An error has occurred');
                }
            },
            patient: async (_, { id }) => {
                try {
                    const patient = await fetchPatients({ id });

                    if (patient) return patient;
                    return new GraphQLError('Patient not found');
                } catch (e) {
                    return new GraphQLError('An error has occurred');
                }
            }
        },
        Mutation: {
            deletePatient: async (_, { id }) => {
                try {
                    const patients: Patient[] = await fetchPatients({});
                    if(patients.some(({ patient_id }) => patient_id === id)) {
                        return patients.filter(({ patient_id }) => patient_id !== id);
                    }
                    return new GraphQLError('Patient not found');
                } catch (e) {
                    return new GraphQLError('An error has occurred');
                }
            }
        }
    }
});

const { handleRequest } = createYoga({
    graphqlEndpoint: '/graphql',
    schema,
    fetchAPI: {
        Request: Request,
        Response: Response
    }
});

export { handleRequest as GET, handleRequest as POST };