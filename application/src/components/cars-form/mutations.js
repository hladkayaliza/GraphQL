import { gql } from '@apollo/client';

export const addCarMutation = gql`
    mutation addCar($model: String!, $brand: String!, $color: String, $type: String!, $year: Int, $owner: ID) {
        addCar(model: $model, brand: $brand, color: $color, type: $type, year: $year, ownerId: $owner) {
            model
            brand
            color
            type
            year
            owner {
              name
            }
        }
    }
`;

export const updateCarMutation = gql`
    mutation updateCar($id:ID, $model: String!, $brand: String!, $color: String, $type: String!, $year: Int, $owner: ID) {
        updateCar(id: $id, model: $model, brand: $brand, color: $color, type: $type, year: $year, ownerId: $owner) {
            model
            brand
            color
            type
            year
            owner {
              name
            }
        }
    }
`;