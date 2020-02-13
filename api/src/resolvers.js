/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
	Query: {
		// The first argument to a resolver is called the "initial value".
		// It's the value (resolver) that came before it.
		// The secnond argument is an object called "argument" -- this allows users to send arguments to the query.
		// The third argument is the context object. This is the shared context amongst all of your resolvers.
		// You can define the context in the apollo server configuration.
		// The fourth argument is the AST of the incoming query. (This is an advanced technique for optimizing
		// your db queries, and is not commonly used.)
		pets(_, { input }, { models }) {
			return input ? models.Pet.findMany(input) : models.Pet.findMany();
		},

		pet(_, { input }, { models }) {
			return input ? models.Pet.findOne(input) : models.Pet.findOne();
		}
	},

	Mutation: {
		newPet(_, { input }, { models }) {
			return models.Pet.create(input);
		}
	},
	Pet: {
		owner(_, __, { models }) {
			// There's only one user in the database.
			const user = models.User.findOne();
			return user;
		}
	},
	User: {
		pets(_, __, { models }) {
			const allPets = models.Pet.findMany();
			return allPets;
		}
	}
};
