import { gql } from 'apollo-boost';

export const usersQuery = gql`
    query users {
        users {
            id
            name
            email
            status
        }
    }
`;
