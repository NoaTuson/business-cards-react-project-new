    import React, { useState, useEffect } from 'react';
    import "../index.css";

    const clientStructure = [
    { label: 'First Name', name: 'firstName', required: true },
    { label: 'Middle Name', name: 'middleName', required: false },
    { label: 'Last Name', name: 'lastName', required: true },
    { label: 'Phone', name: 'phone', required: true },
    { label: 'Email', name: 'email', required: true },
    { label: 'Img Url', name: 'imgUrl', required: false },
    { label: 'Img Alt', name: 'imgAlt', required: false },
    { label: 'State', name: 'state', required: false },
    { label: 'Country', name: 'country', required: true },
    { label: 'City', name: 'city', required: true },
    { label: 'Street', name: 'street', required: false },
    { label: 'House Number', name: 'houseNumber', required: false },
    { label: 'Zip', name: 'zip', required: false },
    { label: 'Business', name: 'business', type: 'boolean', required: false },
    ];

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

    const UsersManagement = () => {
    // State hooks for users, cards, selected user, etc.
    const [users, setUsers] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [editingCard, setEditingCard] = useState(null);
    const [ setNewCard] = useState(initialCardState); // Make sure to define 'newCard'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ setSelectedUserCards] = useState([]);


    useEffect(() => {

    let isSubscribed = true;

    (async () => {
        if (isSubscribed) {
            await fetchAllUsers();
            await fetchAllCards();
        }
    })();

    // Cleanup function
    return () => {
        isSubscribed = false;
    };
    }, []);




        // Function to fetch all users
        const fetchAllUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.shipap.co.il/admin/clients?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
            credentials: 'include',
            });
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
        };

            // Handle selection of a client from the list
    const handleClientSelect = (client) => {
        setSelectedUser(client);
    };

    // Handle initiation of client edit
    const handleEditClient = (client) => {
        setEditUser(client); 
    };

    const handleDeleteClient = async (clientId) => {
        setIsLoading(true);
        setError(null);
        try {
        const response = await fetch(`https://api.shipap.co.il/admin/clients/${clientId}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Assuming the API response is an array of remaining users after deletion
        const updatedUsers = await response.json();
        setUsers(updatedUsers);
        } catch (error) {
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    // View details of a specific user
    const viewUser = (userId) => {
        setIsLoading(true);
        setError(null);
        try {
        const userToView = users.find(user => user.id === userId);
        if (userToView) {
            setSelectedUser(userToView);
        } else {
            throw new Error('User not found');
        }
        } catch (error) {
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };



        // Function to fetch all cards
        const fetchAllCards = async () => {
        try {
            const response = await fetch(`https://api.shipap.co.il/cards?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
            credentials: 'include',
            });
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCards(data);
        } catch (error) {
            setError(error.message);
        }
        };


    // View cards associated with a specific user
    const viewUserCards = async (userId) => {
        setIsLoading(true);
        setError(null);
        try {
        const response = await fetch(`https://api.shipap.co.il/cards?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedUserCards(data); // Assuming setSelectedUserCards is a state setter
        } catch (error) {
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    const editCard = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
        const response = await fetch(`https://api.shipap.co.il/business/cards/${editingCard.id}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingCard), 
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updateCardsState = (updatedCard) => {
    setCards((prevCards) => {
        return prevCards.map((card) => {
            if (card.id === updatedCard.id) {
                return updatedCard;
            }
            return card;
        });
    });
    };

        const updatedCard = await response.json();
        updateCardsState(updatedCard);
        } catch (error) {
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    // Function to handle input changes for both new and editing cards
    const handleInputChange = (event, isEditing = false) => {
        const { name, value } = event.target;
        if (isEditing) {
        // Update editingCard state for edits
        setEditingCard(prevCard => ({
            ...prevCard,
            [name]: value
        }));
        } else {
        // Update newCard state for new entries
        setNewCard(prevCard => ({
            ...prevCard,
            [name]: value
        }));
        }
    };

    const deleteCard = async (cardId) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch(`https://api.shipap.co.il/admin/cards/${cardId}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
        method: 'DELETE',
        credentials: 'include',
        });
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Remove the deleted card from the local state
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
    };

    const renderFormFields = () => {
        return clientStructure.map((field) => (
            <label key={field.name}>
                {field.label}:
                <input
                    type={field.type === 'boolean' ? 'checkbox' : 'text'}
                    name={field.name}
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                />
            </label>
        ));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const renderUsersList = ({ clients, onSelectClient, onEditClient, onDeleteClient, onViewUserCards }) => {
        return (
            <div className="share-panel">
                {clients.map(client => (
                    <div key={client.id} className="user-item">
                        <span>{client.firstName} {client.lastName}</span>
                        <div className="user-actions">
                            <button onClick={() => onSelectClient(client)}>view</button>
                            <button onClick={() => onEditClient(client)}>Edit</button>
                            <button onClick={() => onDeleteClient(client.id)}>Delete</button>

                        </div>
                    </div>
                ))}
            </div>
        );
    };


    const renderUserDetails = ({ client }) => {
    return client && (
        <div className="user-details">
        <h2>User Details</h2>
        <p>Name: {client.firstName} {client.lastName}</p>
        <p>Email: {client.email}</p>
        <p>Phone: {client.phone}</p>
        <p>Country: {client.country}</p>
        <p>City: {client.city}</p>
        <p>Business: {client.business? 'yes' : 'no'}</p>
        </div>
    );
    };

    const EditClientForm = ({ onClientUpdated }) => {
        const formFields = renderFormFields();

    return (
            <form onSubmit={handleSubmit} className="card-edit-form">
                {formFields}
                <button type="submit">Update Client</button>
            </form>
        );
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.shipap.co.il/admin/clients/${editUser.id}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const updatedClient = await response.json();
            // Update the users state or perform other actions after client update
            setUsers((prevUsers) => 
            prevUsers.map((user) => (user.id === updatedClient.id ? updatedClient : user))
            );
            setEditUser(null); // Reset the editUser state if needed
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    const [formData, setFormData] = useState({ ...editUser });



    const renderCardsList = () => {
    return (
        <div className="cards-list">
        {cards.map(card => (
            <div key={card.id} className="card-item">
            <span>{card.title}</span>
            <div className="share-panel">
                <button onClick={() => renderEditForm(card)}>Edit</button>
                <button onClick={() => deleteCard(card.id)}>Delete</button>
            </div>
            </div>
        ))}
        </div>
    );
    };


    const renderEditForm = (card) => {
    setEditingCard(card); // Set the currently editing card
    if (!card) {
        // Handle the null case appropriately, e.g., by returning null or a message
        return <p>No card selected for editing.</p>;
    }

    // Proceed as before since card is not null
    return (
        <form onSubmit={(event) => editCard(event, card.id)} className="card-edit-form">
            <label>
                Title:
                <input 
                    type="text" 
                    name="title" 
                    value={card.title} 
                    onChange={(event) => handleInputChange(event, true)}
                />
            </label>
            <label>
                Description:
                <textarea 
                    name="description" 
                    value={card.description} 
                    onChange={(event) => handleInputChange(event, true)}
                ></textarea>
            </label>
            {/* Add more fields as needed */}
            <button type="submit">Save Changes</button>
        </form>
    );
    };

    const renderEditFormUI = () => {
    // Check if there is a card currently being edited
    if (!editingCard) return null;

    return (
        <div className="edit-form-container-admin">
        <h2>Edit Card</h2>
        <form onSubmit={editCard} className="card-edit-form">
            {Object.entries(initialCardState).map(([key, value]) => (
            <div key={key} className="form-field">
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input
                type={key === 'email' ? 'email' : 'text'}
                id={key}
                name={key}
                value={editingCard[key] || ''}
                onChange={(event) => handleInputChange(event, true)}
                required={key !== 'imgUrl' && key !== 'imgAlt'}
                />
            </div>
            ))}
            <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingCard(null)}>Cancel</button>
            </div>
        </form>
        </div>
    );
    };

    return (
        <div className="users-management">
        <h2>User Management</h2>
        {isLoading ? <p>Loading...</p> : renderUsersList({
                clients: users,
                onSelectClient: handleClientSelect,
                onEditClient: handleEditClient,
                onDeleteClient: handleDeleteClient,
                onViewUser: viewUser,
                onViewUserCards: viewUserCards  // Pass the function as a prop
        })}

        {/* Displaying errors if any */}
        {error && <p className="error-message">{error}</p>}

        {/* User Details */}
        {selectedUser && renderUserDetails({ client: selectedUser })}

        {/* Edit Client Form - shown when a client is being edited */}
        {editUser && <EditClientForm onClientUpdated={setUsers} />}

        <h2>User Cards</h2>

        {/* Cards List */}
        {cards.length > 0 ? renderCardsList() : <p>No cards available.</p>}

        {/* Edit Card Form UI */}
        {editingCard && renderEditFormUI()}
        </div>
    );
    };

    export default UsersManagement;