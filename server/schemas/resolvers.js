// require models
const { AuthenticationError } = require("apollo-server-errors");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        // .select('-__v -password')
        // .populate('books')

        return userData;
      }
      console.log("context.user is undefinded");
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // console.log(username, email, password);
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveMovie: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedMovies: args.input } },
          { new: true }
        );
        return updatedUser;
      } else {
        console.error("no user in context");
      }
    },
    removeMovie: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedMovies: { movieId: args.movieId } } },
          { new: true }
        );
        return updatedUser;
      } else {
        console.error("Couldn't remove movie!");
      }
    },
  },
};

module.exports = resolvers;
