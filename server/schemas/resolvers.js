const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id });
        return data;
      }
      throw new AuthenticationError("Must log in");
    },
  },

  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email");
      }

      const validPw = await user.isCorrectPassword(password);

      if (!validPw) {
        throw new AuthenticationError(
          "Password does not match with this email"
        );
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (_, { input }, { user }) => {
      const data = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: input } },
        { new: true }
      );
      return data;
    },

    removeBook: async (_, { bookId }, { user }) => {
        const data = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId} } },
            { new: true } 
        );
        return data;
    }
  },
};
module.exports = resolvers;
