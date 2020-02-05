const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const Products = require('../models/product');

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Products.find({})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,

    products: {
        type: new GraphQLList(ProductType),
        resolve(parent, args) {
            return Products.find({})
        }
    }

});
