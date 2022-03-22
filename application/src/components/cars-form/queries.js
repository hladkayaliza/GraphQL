import { gql } from '@apollo/client';

export const modelsQuery = gql`
    query models{
        models{
            id
            model 
            brand {
                id
                name
            }
        }
    }
`;


export const modelsByBrandQuery = gql`
    query modelsByBrand($brandId: ID) {
      modelsByBrand(brandId: $brandId) {
            id
            model
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

