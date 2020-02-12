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
	}
	// Mutation: {

	// },
	// Pet: {
	//   img(pet) {
	//     return pet.type === 'DOG'
	//       ? 'https://placedog.net/300/300'
	//       : 'http://placekitten.com/300/300'
	//   }
	// },
	// User: {

	// }
};
