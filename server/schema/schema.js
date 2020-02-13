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

module.exports = new GraphQLSchema({
    query: Query,
});
