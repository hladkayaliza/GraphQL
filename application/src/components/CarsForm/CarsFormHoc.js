import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

import { addCarMutation, updateCarMutation } from './mutations';
import { usersQuery } from './queries';
import { carsQuery } from '../CarsTable/queires';
import { styles } from './styles';
//
// const withGraphQL = compose(
//     graphql(addCarMutation, {
//         props: ({mutate}) => ({
//             addCar: car => mutate({
//                 variables: car,
//                 refetchQueries: [{ query: carsQuery}],
//             }),
//         }),
//     }),
//     graphql(updateCarMutation, {
//         props: ({mutate}) => ({
//             updateCar: car => mutate({
//                 variables: car,
//                 refetchQueries: [{ query: carsQuery }],
//             }),
//         }),
//     }),
// );

// export default compose(withStyles(styles), withGraphQL, graphql(usersQuery))
export default compose(withStyles(styles))