import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteUserMutation } from './mutations';
import { usersQuery } from '../UsersTable/queries';

const withGraphQLDelete = graphql(deleteUserMutation, {
    props: ({ mutate }) => ({
        deleteUser: id => mutate({
            variables: id,
            refetchQueries: [{ query: usersQuery }],
        }),
    }),
});

export default compose(withGraphQLDelete)