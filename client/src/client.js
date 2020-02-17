import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";

const typeDefs = gql`
	extend type User {
		age: Int
	}

	extend type Pet {
		vaccinated: Bool!
	}
`;

const resolvers = {
	User: {
		age() {
			return 35;
		}
	},

	Pet: {
		vaccinated() {
			return Math.random() < 0.5 ? true : false;
		}
	}
};

/**
 * Create a new apollo client and export as default
 */

const http = new HttpLink({ uri: "http://localhost:4000/" });
const delay = setContext(
	request =>
		new Promise((success, fail) => {
			setTimeout(() => {
				success();
			}, 800);
		})
);

// Links are like middleware. So in this example, first the delay will run, then the http connection.
const link = ApolloLink.from([delay, http]);

const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
	cache,
	resolvers,
	typeDefs
});

export default client;
