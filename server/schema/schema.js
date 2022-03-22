const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLBoolean, GraphQLInt  } = graphql;

const Users = require('../models/user');
const Cars = require('../models/car');
const Models = require('../models/model');
const Brands = require('../models/brand');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString)},
        email: { type: new  GraphQLNonNull(GraphQLString)},
        status: { type: GraphQLBoolean },
    }),
});

const BrandType = new GraphQLObjectType({
    name: 'Brand',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
    }),
});

const ModelType = new GraphQLObjectType({
    name: 'Model',
    fields: () => ({
        id: { type: GraphQLID },
        model: { type: new GraphQLNonNull(GraphQLString)},
        brand: {
            type: BrandType,
            resolve({brandId}, args ) {
                return Brands.findById(brandId);
            }
        },
    }),
});

const CarType = new GraphQLObjectType({
    name: 'Car',
    fields: () => ({
        id: { type: GraphQLID },
        type: { type: new GraphQLNonNull(GraphQLString) },
        model: {
            type: ModelType,
            resolve({modelId}, args) {
                return Models.findById(modelId);
            }
        },
        color: { type: GraphQLString },
        year: { type: new GraphQLNonNull(GraphQLInt)},
        owner: {
            type: UserType,
            resolve( {ownerId}, args ) {
                return Users.findById(ownerId);
            }
        }
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
        },
        car: {
            type: CarType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Cars.findById(args.id);
            },
        },
        cars: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return Cars.find({});
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return Brands.find({});
            }
        },
        modelsByBrand: {
            type: new GraphQLList(ModelType),
            args: { brandId: { type: GraphQLID } },
            resolve(parent, {brandId}) {
                return Models.find({brandId: {$regex: brandId}, $options: "i"});
            },
        },
        models: {
            type: new GraphQLList(ModelType),
            resolve(parent, args) {
                return Models.find({});
            }
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
                return Users.findByIdAndRemove(
                    id,
                    { useFindAndModify: false }
                );
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
            resolve(parent, { id, name, email, status }) {
                return Users.findByIdAndUpdate(
                    id,
                    { $set: { name: name, email: email, status: status }},
                    { new: true },
                    )
            }

        },
        addCar: {
            type: CarType,
            args: {
                type: { type: new GraphQLNonNull(GraphQLString) },
                modelId: { type: new GraphQLNonNull(GraphQLID) },
                color: { type: GraphQLString },
                year: { type: GraphQLInt },
                ownerId: { type: GraphQLID },
            },
            resolve(parent, { type, modelId, year, ownerId }) {
                const car = new Cars({
                    type: type,
                    modelId: modelId,
                    year: year,
                    ownerId: ownerId,
                });
                return car.save();
            },
        },
        deleteCar: {
            type: CarType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Cars.findByIdAndRemove(
                    id,
                    { useFindAndModify: false }
                );
            },
        },
        updateCar: {
            type: CarType,
            args: {
                id: { type: GraphQLID },
                type: { type: new GraphQLNonNull(GraphQLString) },
                modelId: { type: new  GraphQLNonNull(GraphQLID)},
                color: { type: GraphQLString },
                year: { type: GraphQLInt },
                ownerId: { type: GraphQLID },
            },
            resolve(parent, { id, type, brand, modelId, color, year, ownerId }) {
                return Cars.findByIdAndUpdate(
                    id,
                    { $set: { type: type, brand: brand, modelId: modelId, color: color, year: year, ownerId:ownerId } },
                )
            }
        },
    }
});

const Subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        carUpdated: {
            
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});