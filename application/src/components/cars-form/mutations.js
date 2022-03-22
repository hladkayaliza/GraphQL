import { gql } from '@apollo/client';

export const addCarMutation = gql`
    mutation addCar($modelId: ID!, $color: String, $type: String!, $year: Int, $ownerId: ID) {
        addCar(modelId: $modelId, color: $color, type: $type, year: $year, ownerId: $ownerId) {
            model {
              id
              model
              brand {
                id
                name
              }
            }
            color
            type
            year
            owner {
              id
              name
            }
        }
    }
`;

export const updateCarMutation = gql`
    mutation updateCar($id:ID, $modelId: ID!, $type: String!, $color: String, $year: Int, $ownerId: ID ) {
        updateCar(id: $id, modelId: $modelId, type: $type, color: $color, year:$year, ownerId: $ownerId) {
            id
            type
            model {
                id
                brand {
                    id
                    name
                }
            }
            owner {
              id
              name
            }
            color
            year    
      }
    }
`;