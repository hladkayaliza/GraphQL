import { gql } from 'apollo-boost';

export const deleteUserMutation = gql`
    mutation deleteUser($id: ID) {
        deleteUser(id: $id) {
            id
        }
    }
`;