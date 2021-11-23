const { User } = require('../models');

const resolvers = {
  Query: {
    // DELETE BEFORE FINALIZING
    // thoughts: async () => {
    //   return Thought.find().sort({ createdAt: -1 });
    // },

    // thought: async (parent, { thoughtId }) => {
    //   return Thought.findOne({ _id: thoughtId });
    // },
    // DELETE BEFORE FINALIZING


    // get a single user by either their id
    getMe: async (parent, {userId}) => {
        const user = await User.findOne({_id:userId});
        return (user);
    }

  },

  Mutation: {
    // DELETE BEFORE FINALIZING
    // addThought: async (parent, { thoughtText, thoughtAuthor }) => {
    //   return Thought.create({ thoughtText, thoughtAuthor });
    // },
    // addComment: async (parent, { thoughtId, commentText }) => {
    //   return Thought.findOneAndUpdate(
    //     { _id: thoughtId },
    //     {
    //       $addToSet: { comments: { commentText } },
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );
    // },
    // removeThought: async (parent, { thoughtId }) => {
    //   return Thought.findOneAndDelete({ _id: thoughtId });
    // },
    // removeComment: async (parent, { thoughtId, commentId }) => {
    //   return Thought.findOneAndUpdate(
    //     { _id: thoughtId },
    //     { $pull: { comments: { _id: commentId } } },
    //     { new: true }
    //   );
    // },
    // DELETE BEFORE FINALIZING

    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, {email, password}) => {
        const user = await User.findOne({email:email})

        if (!user) {
            return(console.error("Can't find this user" ));
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            return(console.error("Wrong password" ));
        }

        const token = signToken(user);

        return (user, token)
    },

    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, {email, username, password}) => {
        return (
            User.create({
                email: email,
                username: username,
                // bcrypt?
                password: password,
            })
        )
    },

    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (parent, {bookId, userId}) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { savedBooks: bookId } },
        );
        return (updatedUser);
    },

    // remove a book from `savedBooks`
    removeBook: async (parent, {bookId, userId}) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: args._id },
            { $pull: { savedBooks: { savedBooks: bookId } } },
        );
        return (updatedUser);
    },
  },
};

module.exports = resolvers;
