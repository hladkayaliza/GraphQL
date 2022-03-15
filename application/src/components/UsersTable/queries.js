import { gql } from '@apollo/client';

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
