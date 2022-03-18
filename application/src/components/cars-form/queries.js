import { gql } from '@apollo/client';

export const modelsQuery = gql`
    query models{
        models{
            id
            model 
            brand {
                name
            }
        }
    }
`;

export const brandsQuery = gql`
    query brands{
        brands{
            id
            name
        }
    }
`;