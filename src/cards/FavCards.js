import React, { useState, useEffect } from 'react';
import Card from './Card'; // Assuming you have a Card component to display each card

export default function FavCards() {
  const [favCards, setFavCards] = useState([]);

  useEffect(() => {
    const fetchFavCards = async () => {
      try {
        const response = await fetch('https://api.shipap.co.il/cards/favorite?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0', {
          credentials: 'include',
        });
        const data = await response.json();
        setFavCards(data);
      } catch (error) {
        console.error('Error fetching favorite cards:', error);
      }
    };

    fetchFavCards();
  }, []);

  const addFavorite = async (cardId) => {
    // Implementation for adding a favorite card
  };

  const removeFavorite = async (cardId) => {
    // Implementation for removing a favorite card
  };

  return (
    <div>
      <h3 className="tempTitle">Favorite Cards</h3>
      <div>
        {favCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onAddFavorite={() => addFavorite(card.id)}
            onRemoveFavorite={() => removeFavorite(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
