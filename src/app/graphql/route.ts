import { GraphQLError } from 'graphql/error';
import { createSchema, createYoga } from 'graphql-yoga';
import { Patient } from 'types';

const fetchPatients = async (id?: number) => {
    const response = await fetch('http://localhost:3001/patients');
    const responseJson = await response.json();

    if(id) return responseJson.find((item: Patient) => item.patient_id === id);
    return responseJson;
};

const schema = createSchema({
    typeDefs: `
        type Query {
            patients: [Patient!]
            patient(id: Int!): Patient!
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
            patients: async (_, { id }) => {
                try {
                    return await fetchPatients(id);
                }
                catch (e) {
                    return new GraphQLError('An error has occurred');
                }
            },
            patient: async (_, { id }) => {
                try {
                    const patient = await fetchPatients(id);

                    if(patient) return patient;
                    return new GraphQLError('Patient not found');
                }
                catch (e) {
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