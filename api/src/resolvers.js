/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
	Query: {
		// The first argument to a resolver is called the "initial value".
		// It's the value of the resolver that came before it. Queries and mutations are top level resolvers.
		// These always come first. The first argument is mainly used by field-level resolvers. Again, the first
		// argument is the resolved value of the top level resolvers.
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
		// The first argument is the Pet object. That is because in order for this resolver to run, the query
		// for pet or pets had to have run first. The return type of those queries is of type Pet, so the first argument
		// references the resolved value of that pet (all the fields that are stored for it in the database).
		owner(pet, __, { models }) {
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
