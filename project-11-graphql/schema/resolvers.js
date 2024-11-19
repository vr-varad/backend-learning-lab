import { userData, movies } from "../data.js";

export const resolvers = {
  Query: {
    users() {
      return userData;
    },
    user(_, { id }) {
      console.log(id);
      return userData.find((user) => user.id === parseInt(id));
    },
    movies: () => movies,
    movie: (_, { name }) => movies.find((movie) => movie.name === name),
  },
  User: {
    favoutiteMovies(user) {
      return movies.filter((movie) => user.favoutiteMovies.includes(movie.id));
    }
  },
  Mutation: {
    createUser(_, { input }) {
      const newUser = {
        id: userData.length + 1,
        ...input,
        friends: [],
        favoutiteMovies: []
      };
      userData.push(newUser);
      return newUser;
    },
    updateUserName(_, { id, name }) {
      const user = userData.find((user) => user.id === parseInt(id));
      user.name = name;
      return user;
    },
    deleteUser(_, { id }) {
      const userIndex = userData.findIndex((user) => user.id === parseInt(id));
      const deletedUser = userData[userIndex];
      userData.splice(userIndex, 1);
      return deletedUser;
    }
  }
};
