import { gql } from '@apollo/client';

export const usersQuery = gql`
    query users {
        users {
            id
            name
        }
    }
`;

// export const carsQuery = gql`
//     query carsQuery {
//         cars {
//             id
//             model
//             brand
//             color
//             type
//             year
//             owner {
//               name
//             }
//         }
//     }
// `;