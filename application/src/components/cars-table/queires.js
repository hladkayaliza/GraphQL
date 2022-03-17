import { gql } from '@apollo/client';

export const carsQuery = gql`
    query cars{
        cars{
            id
            model {
                model
                brand
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