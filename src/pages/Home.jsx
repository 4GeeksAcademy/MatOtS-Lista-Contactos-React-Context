import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	console.log("Esto es store.contacts ", store.contacts)

	async function getContacts() {
		try {
			console.log(`${store.urlAPI}${store.user}/contacts`);
			
			const response = await fetch(`${store.urlAPI}${store.user}/contacts`)
			if (!response.ok) {
				throw new Error("Request failed with: ", response.status)
			}
			const data = await response.json();
			data.contacts.map((contact) => {
				dispatch({ type: "ADD_CONTACT", payload: contact })
			})
		}
		catch(error) {
			console.log("Error on fetch: ", error.message)
		}
	}

	useEffect(() => {
		if (store.contacts.length === 0) {
			getContacts()
		}
	}, [])


	return (
		<div className="container d-flex flex-column">
			<div className="text-center mt-5">
				<Link to="/contactForm">
					<button className="btn btn-success mb-2 float-end">Add New Contact</button>
				</Link>
			</div>
			<div className="">
				{store.contacts.map((contact) => {
					return (
						<ContactCard className="" key={contact.id} {...contact} img={rigoImageUrl}/>
					)
				})}
			</div>
		</div>
	);
}; 