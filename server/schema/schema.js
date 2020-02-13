const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const Food = require('../models/product');

//
// ────────────────────────────────────────────── DESCRIBE DATA FROM DATABASE ─────
//

const ProductType = new GraphQLObjectType({
    name: 'Food',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

//
// ────────────────────────────────────── MAIN QUERY THAT CONTAINS SUB-QUERIES ─────
//

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        food: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Food.find({})
            }
        }
    }
});

//
// ───────────────────────────────────────────────────────────────── MUTATION ─────
//

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addFood: {
            type: ProductType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Food.create({ name: args.name });
            }
        },
        deleteFood: {
            type: ProductType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Food.findOneAndDelete({ name: args.name });
            }
        },
        updateFood: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                change: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Food.findOneAndUpdate({ name: args.name }, { name: args.change })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
