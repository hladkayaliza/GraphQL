import { gql } from '@apollo/client';

export const carsQuery = gql`
    query cars{
        cars{
            id
            type
            year
            color
            model {
                id
                brand {
                    id
                    name
                }
                model
            }
            owner {
                id
                name
            }
        }
    }
`;