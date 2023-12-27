	import React, { useState, useEffect } from 'react';
	import './MyCards.css';

	const initialCardState = {
	title: "",
	description: "",
	subtitle: "",
	phone: "",
	email: "",
	web: "",
	imgUrl: "",
	imgAlt: "",
	state: "",
	country: "",
	city: "",
	street: "",
	houseNumber: 0,
	zip: "",
	};

	const MyCards = () => {
	const [cards, setCards] = useState([]);
	const [newCard, setNewCard] = useState(initialCardState);
	const [editingCard, setEditingCard] = useState(null);
	const apiToken = '7cddfc3e-a309-11ee-beec-14dda9d4a5f0';
	useEffect(() => {
		fetchCards();
	}, []);

	const fetchCards = () => {
		fetch(`https://api.shipap.co.il/business/cards?token=${apiToken}`, {
		credentials: 'include',
		})
		.then(res => res.json())
		.then(setCards);
	};

	const handleInputChange = (event, isEditing = false) => {
	const { name, value } = event.target;
	if (isEditing) {
		// Update editingCard state for edits
		setEditingCard((prevCard) => ({
		...prevCard,
		[name]: value
		}));
	} else {
		// Update newCard state for new entries
		setNewCard((prevCard) => ({
		...prevCard,
		[name]: value
		}));
	}
	};

	const submitNewCard = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const newCard = Object.fromEntries(formData.entries());
		
		fetch(`https://api.shipap.co.il/business/cards?token=${apiToken}`, {
		credentials: 'include',
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(newCard),
		})
		.then(() => fetchCards());
	};

	const submitEdit = (event) => {
		event.preventDefault();
		fetch(`https://api.shipap.co.il/business/cards/${editingCard.id}?token=${apiToken}`, {
		credentials: 'include',
		method: 'PUT',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(editingCard),
		})
		.then(() => {
		fetchCards();
		setEditingCard(null);
		});
	};

	const deleteCard = (cardId) => {
		fetch(`https://api.shipap.co.il/business/cards/${cardId}?token=${apiToken}`, {
		credentials: 'include',
		method: 'DELETE',
		})
		.then(() => fetchCards());
	};

	const renderCardForm = () => (
	<div className="card-form-container">
		<form onSubmit={submitNewCard} className="card-form">
		{Object.keys(initialCardState).map((key) => (
			<input
			key={key}
			className="form-input"
			type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
			name={key}
			value={newCard[key]} // This ensures the input is editable and reflects the state
			onChange={(event) => handleInputChange(event, false)} // Pass false to indicate it's for a new card
			placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
			required={key !== 'imgUrl' && key !== 'imgAlt' && key !== 'state' && key !== 'zip'}
			/>
		))}
		<div className="form-actions">
			<button type="button" onClick={() => setNewCard(initialCardState)} className="cancel-button">Cancel</button>
			<button type="submit" className="submit-button">Submit</button>
		</div>
		</form>
	</div>
	);

	
	const renderCards = () => (
		<div className="cards-display">
		{cards.map((card) => (
			<div key={card.id} className="card-item">
			<div className="card-details">
				<h3>{card.title}</h3>
				<p>{card.description}</p>
				{/* Display other card details as needed */}
			</div>
			<div className="card-actions">
				<button onClick={() => setEditingCard(card)}>Edit</button>
				<button onClick={() => deleteCard(card.id)}>Delete</button>
			</div>
			</div>
		))}
		</div>
	);
	const renderEditForm = () => {
	if (!editingCard) return null;
	return (
		<form onSubmit={submitEdit} className="card-edit-form">
		{Object.entries(initialCardState).map(([key]) => (
			<input
			key={key}
			type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
			name={key}
			value={editingCard[key]}
				onChange={(event) => handleInputChange(event, true)}
			placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
			required={key !== 'imgUrl' && key !== 'imgAlt' && key !== 'state' && key !== 'zip'}
			/>
		))}
		<button type="submit">Save Changes</button>
		<button type="button" onClick={() => setEditingCard(null)}>Cancel</button>
		</form>
	);
	};

	return (
		<div>
			<h2>Create Card</h2>
			{renderCardForm()}
		<h2>My Cards</h2>
		{/* {renderCards()} */}
		
		{editingCard ? renderEditForm() : null}
		{cards.map(card => (
			<div key={card.id}>
			<h3>{card.title}</h3>
			<button onClick={() => setEditingCard(card)}>Edit</button>
			<button onClick={() => deleteCard(card.id)}>Delete</button>
			</div>
		))}
		</div>
	);
	};
	export default MyCards;


	// import React, { useState, useEffect } from "react";
	// import { TextField, Button } from "@mui/material";
	// import { useNavigate } from 'react-router-dom';

	// import "./MyCardsForm.css";

	// // Define the initial state for the card form
	// const initialCardState = {
	// 	title: "",
	// 	description: "",
	// 	subtitle: "",
	// 	phone: "",
	// 	email: "",
	// 	web: "",
	// 	imgUrl: "",
	// 	imgAlt: "",
	// 	state: "",
	// 	country: "",
	// 	city: "",
	// 	street: "",
	// 	houseNumber: 0,
	// 	zip: "",
	// };
	// export default function MyCards(){
	// //const MyCards = () => {
	// 	const [cards, setCards] = useState([]);
	// 	const [newCard, setNewCard] = useState(initialCardState);
	// 	const [editingCard, setEditingCard] = useState(null);
	//     const navigate = useNavigate();


	// 	// Function to fetch all cards
	// 	const fetchCards = () => {
	// 		fetch(
	// 			"https://api.shipap.co.il/cards?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0",
	// 			{
	// 				method: "GET",
	// 				credentials: "include",
	// 			}
	// 		)
	// 			.then((res) => res.json())
	// 			.then((data) => setCards(data))
	// 			.catch((err) => console.error("Error fetching cards:", err));
	// 	};

	// 	// Fetch cards on component mount
	// 	useEffect(() => {
	// 		fetchCards();
	// 	}, []);

	// 	// Function to handle form input changes
	// 	const handleInputChange = (event) => {
	// 		const { name, value } = event.target;
	// 		setNewCard({ ...newCard, [name]: value });
	// 	};

	// 	const handleEditChange = (event) => {
	// 		const { name, value } = event.target;
	// 		setEditingCard({ ...editingCard, [name]: value });
	// 	};

	// 	// Function to submit new card
	// 	const submitNewCard = (event) => {
	// 		event.preventDefault();
	// 		fetch(
	// 			"https://api.shipap.co.il/business/cards?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0",
	// 			{
	// 				method: "POST",
	// 				credentials: "include",
	// 				headers: { "Content-Type": "application/json" },
	// 				body: JSON.stringify(newCard),
	// 			}
	// 		)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				setCards([...cards, data]);
	// 				setNewCard(initialCardState);
	// 			})
	// 			.catch((err) => console.error("Error creating card:", err));
	// 	};

	// // Function to update a card
	// const submitEdit = (event) => {
	//     event.preventDefault();
	//     const updatedCard = { ...editingCard };
	//     const url = `https://api.shipap.co.il/business/cards/${updatedCard.id}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`;

	//     fetch(url, {
	//         method: 'PUT',
	//         credentials: 'include',
	//         headers: { 'Content-Type': 'application/json' },
	//         body: JSON.stringify(updatedCard),
	//     })
	//     .then((response) => {
	//         if (!response.ok) {
	//             throw new Error(`HTTP error! status: ${response.status}`);
	//         }
	//         // Check if response is empty
	//         return response.text().then((text) => text ? JSON.parse(text) : {});
	//     })
	//     .then((data) => {
	//         if (Object.keys(data).length !== 0) {
	//             console.log('Response data:', data);
	//         } else {
	//             console.log('No content in response, but request was successful');
	//         }
	//         fetchCards();
	//         setEditingCard(null);
	//     })
	//     .catch((err) => {
	//         console.error("Error updating card:", err);
	//         // Here you can handle any further UI updates or error messages
	//     });
	// };

	// 	// Function to delete a card
	// 	const deleteCard = (cardId) => {
	// 		console.log("Deleting card with ID:", cardId)
	// 		fetch(
	// 			`https://api.shipap.co.il/business/cards/${cardId}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`,
	// 			{
	// 				method: "DELETE",
	// 				credentials: "include",
	// 			}
	// 		)
	// 	.then((response) => {
	//         if (!response.ok) {
	//             throw new Error(`HTTP error! status: ${response.status}`);
	//         }
	//         return response.json(); // Assuming the server sends a JSON response
	//     })
	//     .then(() => {
	//         console.log("Card deleted successfully, refreshing list...");
	//         fetchCards();
	//     })
	//     .catch((err) => console.error("Error deleting card:", err));
	// };

	// 	const renderCardForm = () => (
	// 		<form onSubmit={submitNewCard} className="card-form">
	// 			{/* Iterate over each property in initialCardState to create form inputs */}
	// 			{Object.keys(initialCardState).map((key) => (
	// 				<TextField
	// 					key={key}
	// 					name={key}
	// 					value={newCard[key]}
	// 					onChange={handleInputChange}
	// 					placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the placeholder
	// 					required={
	// 						key !== "imgUrl" &&
	// 						key !== "imgAlt" &&
	// 						key !== "state" &&
	// 						key !== "zip"
	// 					} // These fields are not marked as required
	// 					type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
	// 					multiline={key === "description"}
	// 					rows={key === "description" ? 3 : 1}
	// 					margin="normal"
	// 					variant="outlined"
	// 					fullWidth
	// 				/>
	// 			))}

	// 			<Button type="submit" variant="contained" color="primary">
	// 				Create Card
	// 			</Button>
	// 		</form>
	// 	);

	// 	// Function to render the edit form
	// 	const renderEditForm = () => {
	// 		if (!editingCard) return null;

	// 		return (
	// 			<form onSubmit={submitEdit} className="card-edit-form">
	// 				<TextField
	// 					name="title"
	// 					value={editingCard.title}
	// 					onChange={handleEditChange}
	// 					placeholder="Title"
	// 					required
	// 				/>
	// 				<TextField
	// 					name="description"
	// 					value={editingCard.description}
	// 					onChange={handleEditChange}
	// 					placeholder="Description"
	// 					required
	// 					multiline
	// 				/>
	// 				<TextField
	// 					name="subtitle"
	// 					value={editingCard.subtitle}
	// 					onChange={handleEditChange}
	// 					placeholder="Subtitle"
	// 				/>
	// 				<TextField
	// 					name="phone"
	// 					value={editingCard.phone}
	// 					onChange={handleEditChange}
	// 					placeholder="Phone"
	// 					required
	// 					type="tel"
	// 				/>
	// 				<TextField
	// 					name="email"
	// 					value={editingCard.email}
	// 					onChange={handleEditChange}
	// 					placeholder="Email"
	// 					required
	// 					type="email"
	// 				/>
	// 				<TextField
	// 					name="web"
	// 					value={editingCard.web}
	// 					onChange={handleEditChange}
	// 					placeholder="Website"
	// 				/>
	// 				<TextField
	// 					name="imgUrl"
	// 					value={editingCard.imgUrl}
	// 					onChange={handleEditChange}
	// 					placeholder="Image URL"
	// 				/>
	// 				<TextField
	// 					name="imgAlt"
	// 					value={editingCard.imgAlt}
	// 					onChange={handleEditChange}
	// 					placeholder="Image Description"
	// 				/>
	// 				<TextField
	// 					name="state"
	// 					value={editingCard.state}
	// 					onChange={handleEditChange}
	// 					placeholder="State"
	// 				/>
	// 				<TextField
	// 					name="country"
	// 					value={editingCard.country}
	// 					onChange={handleEditChange}
	// 					placeholder="Country"
	// 					required
	// 				/>
	// 				<TextField
	// 					name="city"
	// 					value={editingCard.city}
	// 					onChange={handleEditChange}
	// 					placeholder="City"
	// 					required
	// 				/>
	// 				<TextField
	// 					name="street"
	// 					value={editingCard.street}
	// 					onChange={handleEditChange}
	// 					placeholder="Street"
	// 					required
	// 				/>
	// 				<TextField
	// 					name="houseNumber"
	// 					value={editingCard.houseNumber}
	// 					onChange={handleEditChange}
	// 					placeholder="House Number"
	// 					required
	// 					type="number"
	// 				/>
	// 				<TextField
	// 					name="zip"
	// 					value={editingCard.zip}
	// 					onChange={handleEditChange}
	// 					placeholder="ZIP Code"
	// 				/>
	// 				<Button type="submit" variant="contained" color="primary">
	// 					Save Changes
	// 				</Button>
	// 				<Button onClick={() => setEditingCard(null)} variant="contained">
	// 					Cancel
	// 				</Button>
	// 				</form>

	// 		);
	// 	};

	// 	// Function to render the list of cards with edit and delete buttons
	// 	const renderCardList = () => (
	// 		<div>
	// 			{cards.map((card) => (
	// 				<div key={card.id} className="card-item">
	// 					<h3>{card.title}</h3>
	// 					<Button onClick={() => setEditingCard(card)}>Edit</Button>
	// 					<Button onClick={() => deleteCard(card.id)}>Delete</Button>
	// 				</div>
	// 			))}
	// 		</div>
	// 	);

	// 	// Main render return
	// 	return (
	// 		<div>
	// 			<h2>My Cards</h2>
	// 			{editingCard ? renderEditForm() : renderCardForm()}
	// 			{renderCardList()}
	// 		</div>
	// 	);
	// };

