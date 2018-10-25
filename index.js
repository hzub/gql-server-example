var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    jakisEndpoint: String,
    parametryzowanyEndpoint(liczba: Int): String
  }
`);

var resolvers = {
  jakisEndpoint: () => {
    return 'Hello world from graphql!';
  },
  parametryzowanyEndpoint: (params) => {
    var wynik = parseInt(params.liczba) * 2;
    return 'Zwracam: ' + wynik;
  }
};

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

