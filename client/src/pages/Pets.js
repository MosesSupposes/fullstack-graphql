import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";

const PETS_FIELDS = gql`
	fragment PetsFields on Pet {
		id
		img
		name
		type
		owner {
			id
			age @client
		}
	}
`;

const ALL_PETS = gql`
	query AllPets {
		pets {
			...PetsFields
		}
	}
	${PETS_FIELDS}
`;

const NEW_PET = gql`
	mutation CreateAPet($newPet: PetCreationInput!) {
		newPet(input: $newPet) {
			id
			img
			name
			type
		}
	}
`;

export default function Pets() {
	const [modal, setModal] = useState(false);
	const { data, loading, error } = useQuery(ALL_PETS);
	// The first index is the function used to actually run the mutation.
	// The second index is the same object you get with the useQuery hook.
	const [createPet, { data: d, loading: l, error: e }] = useMutation(NEW_PET, {
		update(cache, { data: { newPet } }) {
			// Read the pets from the cache (corresponds with the query field on line 10)
			const { pets: allPets } = cache.readQuery({ query: ALL_PETS });
			// Update the cache to include the newly created pet. This will trigger a re-render
			// anywhere that uses the ALL_PETS query.
			cache.writeQuery({
				query: ALL_PETS,
				data: { pets: [newPet, ...allPets] }
			});
		}
	});

	const onSubmit = input => {
		setModal(false);
		createPet({
			variables: { newPet: input },
			// You can specify an optimistic response to match what's returned from the server.
			// This will preload the response data from the server in your UI before the response
			// comes back from the server. You must specify all the data that comes back from the
			// server, including the "__typename" field (which doesn't show up in tools like graphql playground).
			// If you opt in to the optimistic response, you have to opt out to a loading state.
			optimisticResponse: {
				__typename: "Mutation",
				newPet: {
					__typename: "Pet",
					id: "whatever, it doesn't matter as long as the types match (string)",
					img: "https://via.placeholder.com/300",
					name: input.name,
					type: input.type
				}
			}
		});
	};

	// The app wil break if you leave off the loading handler.
	// You will get the error: "Can not read pets of undefined".
	if (loading) {
		return <Loader />;
	}

	if (error || e) {
		return <p>Whoops. There was an error.</p>;
	}

	if (modal) {
		return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
	}

	return (
		<div className="page pets-page">
			<section>
				<div className="row betwee-xs middle-xs">
					<div className="col-xs-10">
						<h1>Pets</h1>
					</div>

					<div className="col-xs-2">
						<button onClick={() => setModal(true)}>new pet</button>
					</div>
				</div>
			</section>
			<section>
				<PetsList pets={data.pets} />
			</section>
		</div>
	);
}
