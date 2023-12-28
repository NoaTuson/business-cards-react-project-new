    import React, { useState, useEffect } from 'react';

    const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserCards, setSelectedUserCards] = useState([]);
    const apiToken = '7cddfc3e-a309-11ee-beec-14dda9d4a5f0';

    useEffect(() => {
    // Call fetch functions when the component mounts
    fetchAllUsers();
    fetchAllCards();
    }, []);

    const fetchAllUsers = () => {
        fetch(`https://api.shipap.co.il/admin/clients?token=${apiToken}`, {
        credentials: 'include',
        })
        .then(res => res.json())
        .then(setUsers)
        .catch(error => console.error('Error fetching users:', error));
    };


    const editUser = (userId, userData) => {
        fetch(`https://api.shipap.co.il/admin/clients/${userId}?token=${apiToken}`, {
        credentials: 'include',
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userData),
        })
        .then(() => fetchAllUsers())
        .catch(error => console.error('Error editing user:', error));
    };

    const deleteUser = (userId) => {
        fetch(`https://api.shipap.co.il/admin/clients/${userId}?token=${apiToken}`, {
        credentials: 'include',
        method: 'DELETE',
        })
        .then(() => fetchAllUsers())
        .catch(error => console.error('Error deleting user:', error));
    };

const viewUser = (userId) => {
    fetch(`https://api.shipap.co.il/admin/clients?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const userToView = data.find(user => user.id === userId);
        setSelectedUser(userToView);
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    });
};


    const fetchAllCards = () => {
    fetch(`https://api.shipap.co.il/cards?token=${apiToken}`, {
        credentials: 'include',
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
        setCards(data);
        } else {
        throw new Error('Data is not an array');
        }
    })
    .catch(error => {
        console.error('Error fetching all cards:', error);
    });
    };

    const viewUserCards = (userId) => {
    fetch(`https://api.shipap.co.il/admin/cards/${userId}?token=${apiToken}`, {
        credentials: 'include',
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        setSelectedUserCards(data); // Assuming 'data' is an array of card objects
    })
    .catch(error => {
        console.error('Error fetching cards for user:', error);
        setSelectedUserCards([]); // Reset to an empty array on error
    });
};

const editCard = (cardId, cardData) => {
    fetch(`https://api.shipap.co.il/admin/cards/${cardId}?token=${apiToken}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(() => {
        if (selectedUser) {
        viewUserCards(selectedUser.id);
    }
    })
    .catch(error => {
        console.error('Error updating card:', error);
    });
};

const deleteCard = (cardId) => {
    fetch(`https://api.shipap.co.il/admin/cards/${cardId}?token=${apiToken}`, {
        method: 'DELETE',
        credentials: 'include',
    })
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); 
})
.then(() => {
        if (selectedUser) {
        viewUserCards(selectedUser.id);
    }
    fetchAllCards(); 
})
    .catch(error => {
        console.error('Error deleting card:', error);
    });
};

    const renderUsersList = () => (
        <div className="users-list">
        {users.map(user => (
            <div key={user.id} className="user-item">
            <span>{user.fullName}</span>
            <span>{user.email}</span>
            <div className="user-actions">
                <button onClick={() => viewUser(user.id)}>View</button>
                <button onClick={() => setSelectedUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
            </div>
        ))}
        </div>
    );

    const renderUserDetails = () => (
        selectedUser && (
        <div className="user-details">
            {/* Render the details of the selectedUser */}
            <h3>{selectedUser.fullName}</h3>
            {/* Include other details you want to display */}
        </div>
        )
    );

    const renderUserCards = () => (
        <div className="user-cards">
        {selectedUserCards.map(card => (
            <div key={card.id} className="card-item">
            <h4>{card.title}</h4>
            {/* Render other card details */}
            <button onClick={() => editCard(card.id)}>Edit</button>
            <button onClick={() => deleteCard(card.id)}>Delete</button>
            </div>
        ))}
        </div>
    );

        const renderCardsList = () => (
    <div className="cards-list">
        {cards.map(card => (
        <div key={card.id} className="card-item">
            <span>{card.title}</span> {/* Assuming 'title' is the correct property for card title */}
            {/* Include other card details here if needed */}
            <div className="card-actions">
            <button onClick={() => renderUserCards(card.id)}>View</button>
            <button onClick={() => editCard(card)}>Edit</button>
            <button onClick={() => deleteCard(card.id)}>Delete</button>
            </div>
        </div>
        ))}
    </div>
    );

    return (
        <div className="users-management">
        <h2>User Management</h2>
        {renderUsersList()}
        {renderUserDetails()}

        <div>
        <h2>User Cards</h2>
        {renderCardsList()}
        </div>
        </div>

    );
    };

    export default UsersManagement;