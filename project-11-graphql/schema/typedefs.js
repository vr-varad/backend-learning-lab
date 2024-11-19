export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
        favoutiteMovies: [Movie!]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfRelease: Int!
        hollywood: Boolean!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        movies: [Movie!]!
        movie(name: String!): Movie
    }

    input CreateUserInput {
        name: String!
        username: String!
        age: Int = 18
        nationality: Nationality = American
    }

    type Mutation {
        createUser(input: CreateUserInput): User!
        updateUserName(id: ID!, name: String!): User!
        deleteUser(id: ID!): User!
    }

    enum Nationality {
        American
        Canadian
        Mexican
        Pakistani
        German
        Japanese
        Egyptian
        Irish
        Indian
        Chinese
    }
`;
