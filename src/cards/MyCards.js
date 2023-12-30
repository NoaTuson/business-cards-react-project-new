	import React, { useState, useEffect } from 'react';
	import "../index.css";

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

