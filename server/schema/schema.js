const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLBoolean  } = graphql;

const Users = require('../models/user');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString)},
        email: { type: new  GraphQLNonNull(GraphQLString)},
        status: { type: GraphQLBoolean }
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Users.findById(args.id)
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return Users.find({});
            },
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: GraphQLBoolean },
            },

            resolve(parent, { name, email, status}) {
                const user = new Users({
                    name: name,
                    email: email,
                    status: status,
                });
                return user.save();
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Users.findByIdAndRemove(id);
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: GraphQLBoolean },
            },

        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});