import React, { useState, useEffect } from "react";
import MyCard from "./Card"; // Importing the Card component
import "../index.css";

const Cards = () => {
	const [cards, setCards] = useState([]);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch(
					`https://api.shipap.co.il/cards?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`,
					{
						credentials: "include",
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setCards(data);
			} catch (error) {
				console.error("Error fetching cards:", error);
			}
		};

		fetchCards();
	}, []);

	return (
		<div>
			<h2 className="tempTitle">All Business Cards</h2>
			 <div className="cards-container">
			{cards.map((card) => (
				<MyCard key={card.id} card={card} />
			))}
		</div>
		</div>
	);
};

export default Cards;
