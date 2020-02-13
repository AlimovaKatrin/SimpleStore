const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://katrin:123@simplestoreproducts-po6sv.mongodb.net/Products?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true })

mongoose.connection.on('error', err => console.log(`Connction error: ${err}`));
mongoose.connection.once('open', () => console.log('Conncected to DB'));


const app = express();
const PORT = 3001;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, err => {
    err ? console.log(error) : console.log(`Server on port : ${PORT}`);
})