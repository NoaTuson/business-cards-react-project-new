import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './MyCardsForm.css'; 

// Define the initial state for the card form
const initialCardState = {
  title: '',
  description: '',
  subtitle: '',
  phone: '',
  email: '',
  web: '',
  imgUrl: '',
  imgAlt: '',
  state: '',
  country: '',
  city: '',
  street: '',
  houseNumber: 0,
  zip: '',
};

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState(initialCardState);
  const [editingCard, setEditingCard] = useState(null);

  // Function to fetch all cards
  const fetchCards = () => {
    fetch('https://api.shipap.co.il/cards?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => setCards(data))
    .catch(err => console.error('Error fetching cards:', err));
  };

  // Fetch cards on component mount
  useEffect(() => {
    fetchCards();
  }, []);

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditingCard({ ...editingCard, [name]: value });
  };

  // Function to submit new card
  const submitNewCard = (event) => {
    event.preventDefault();
    fetch('https://api.shipap.co.il/business/cards?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard),
    })
    .then(res => res.json())
    .then(data => {
      setCards([...cards, data]);
      setNewCard(initialCardState);
    })
    .catch(err => console.error('Error creating card:', err));
  };

  // Function to update a card
  const submitEdit = (event) => {
    event.preventDefault();
    fetch(`https://api.shipap.co.il/business/cards/${editingCard.id}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingCard),
    })
    .then(() => {
      fetchCards(); // Refresh the list of cards
      setEditingCard(null); // Clear the editing state
    })
    .catch(err => console.error('Error updating card:', err));
  };

  // Function to delete a card
  const deleteCard = (cardId) => {
    fetch(`https://api.shipap.co.il/business/cards/${cardId}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(() => fetchCards())
    .catch(err => console.error('Error deleting card:', err));
  };

 const renderCardForm = () => (
  <form onSubmit={submitNewCard} className="card-form">
    {/* Iterate over each property in initialCardState to create form inputs */}
    {Object.keys(initialCardState).map(key => (
      <TextField
        key={key}
        name={key}
        value={newCard[key]}
        onChange={handleInputChange}
        placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the placeholder
        required={key !== 'imgUrl' && key !== 'imgAlt' && key !== 'state' && key !== 'zip'} // These fields are not marked as required
        type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
        multiline={key === 'description'}
        rows={key === 'description' ? 3 : 1}
        margin="normal"
        variant="outlined"
        fullWidth
      />
    ))}

    <Button type="submit" variant="contained" color="primary">Create Card</Button>
  </form>
);

// Function to render the edit form
const renderEditForm = () => {
  if (!editingCard) return null;

  return (
    <form onSubmit={submitEdit} className="card-edit-form">
      {Object.keys(initialCardState).map(key => (
        <TextField
          key={key}
          name={key}
          value={editingCard[key]}
          onChange={handleEditChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          required={key !== 'imgUrl' && key !== 'imgAlt' && key !== 'state' && key !== 'zip'}
          type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
          multiline={key === 'description'}
          rows={key === 'description' ? 3 : 1}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      ))}

      <Button type="submit" variant="contained" color="primary">Save Changes</Button>
      <Button onClick={() => setEditingCard(null)}>Cancel</Button>
    </form>
  );
};

// Function to render the list of cards with edit and delete buttons
const renderCardList = () => (
  <div>
    {cards.map(card => (
      <div key={card.id} className="card-item">
        <h3>{card.title}</h3>
        {/* Display other details as needed */}
        <Button onClick={() => setEditingCard(card)}>Edit</Button>
        <Button onClick={() => deleteCard(card.id)}>Delete</Button>
      </div>
    ))}
  </div>
);

  // Main render return
  return (
    <div>
      <h2>My Cards</h2>
      {editingCard ? renderEditForm() : renderCardForm()}
      {renderCardList()}
    </div>
  );
};

export default MyCards;