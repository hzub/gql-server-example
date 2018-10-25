var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const USERS = [
  { id: 1, name: 'Janusz', active: false },
  { id: 2, name: 'Ambroży', active: true },
  { id: 3, name: 'Janek', active: false },
];

var schema = buildSchema(`
  type User {
    id: Int,
    name: String,
    active: Boolean
  }

  type Query {
    users: [User],
    user(id: Int): User
  }

  type Mutation {
    addUser(name: String): User
  }
`);

var resolvers = {
  users: () => {
    return USERS;
  },
  addUser: ({name}) => {
    const newUser = {
      id: USERS.length + 1,
      name,
      active: false,
    };

    USERS.push(newUser);

    return newUser;
  },
};

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

