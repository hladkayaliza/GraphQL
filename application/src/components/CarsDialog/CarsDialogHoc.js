import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteCarMutation } from './mutations';
import { carsQuery } from '../CarsTable/queires';

const withGraphQLDelete = graphql(deleteCarMutation, {
    props: ({ mutate }) => ({
        deleteCar: id => mutate({
            variables: id,
            refetchQueries: [{ query: carsQuery }]
        }),
    }),
});

export default compose(withGraphQLDelete);