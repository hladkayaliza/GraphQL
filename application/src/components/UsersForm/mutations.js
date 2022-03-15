import { gql } from '@apollo/client';

export const addUserMutation = gql`
    mutation addUser($name: String!, $email: String!, $status: Boolean) {
        addUser(name: $name, email: $email, status: $status) {
            name
        }
    }
`;

export const  updateUserMutation = gql`
    mutation updateUser($id: ID!, $name: String!, $email: String!, $status: Boolean) {
        updateUser(id: $id, name: $name, email: $email, status: $status) {
            name
        }
    }
`;