const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
	# This is how you comment in GraphQL
	type User {
		id: ID!
		username: String!
	}

	"""
	This is how you add documentation to your definitions.
	"""
	type Pet {
		id: ID!
		createdAt: String!
		name: String!
		type: String!
	}

	input PetInput {
		name: String
		type: String
	}

	input PetCreationInput {
		name: String!
		type: String!
	}

	type Query {
		pets(input: PetInput): [Pet]!
		pet(input: PetInput): Pet
	}

	type Mutation {
		newPet(input: PetCreationInput!): Pet!
	}
`;

module.exports = typeDefs;
