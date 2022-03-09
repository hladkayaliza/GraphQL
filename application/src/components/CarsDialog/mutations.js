import { gql } from 'apollo-boost';

export const deleteCarMutation = gql`
    mutation deleteCar($id: ID) {
        deleteCar(id: $id) {
            id
        }
    }
`;