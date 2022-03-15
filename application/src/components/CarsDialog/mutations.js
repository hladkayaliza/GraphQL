import { gql } from '@apollo/client';

export const deleteCarMutation = gql`
    mutation deleteCar($id: ID) {
        deleteCar(id: $id) {
            id
        }
    }
`;