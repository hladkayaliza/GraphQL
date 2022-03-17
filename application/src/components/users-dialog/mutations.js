import { gql } from '@apollo/client';

export const deleteUserMutation = gql`
    mutation deleteUser($id: ID) {
        deleteUser(id: $id) {
            id
        }
    }
`;