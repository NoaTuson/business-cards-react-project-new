import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/material";
import "../index.css";


export default function MyCard({ card, onFavoriteChange, isAdmin }) {
	const [isFavorite, setIsFavorite] = useState(card.favorite);
	const [showSharePanel, setShowSharePanel] = useState(false);

	const toggleSharePanel = () => {
        setShowSharePanel(!showSharePanel);
    };

	const shareOnWhatsApp = `https://wa.me/?text=${encodeURIComponent(card.title + ' ' + card.imgUrl)}`;
    const shareOnMail = `https://mail.google.com/?subject=${encodeURIComponent(card.title)}&body=${encodeURIComponent(card.description + ' ' + card.imgUrl)}`;
    const shareTextMessage = `sms:?&body=${encodeURIComponent(card.title + ' ' + card.imgUrl)}`;

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(card.imgUrl).then(() => {
            alert('Link copied to clipboard');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };
	const addFavorite = () => {
		fetch(
			`https://api.shipap.co.il/cards/${card.id}/favorite?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					// Include other headers as necessary
				},
				credentials: "include",
			}
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				setIsFavorite(true);
				onFavoriteChange(card.id, true); // Notify the parent component
			})
			.catch((error) => {
				console.error("There has been a problem with adding favorite:", error);
			});
	};

	// Function to remove the card from favorites
	const removeFavorite = () => {
		fetch(
			`https://api.shipap.co.il/cards/${card.id}/unfavorite?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					// Include other headers as necessary
				},
				credentials: "include",
			}
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				setIsFavorite(false);
				onFavoriteChange(card.id, false); // Notify the parent component
			})
			.catch((error) => {
				console.error(
					"There has been a problem with removing favorite:",
					error
				);
			});
	};

	// Function to handle favorite toggle
	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavorite();
		} else {
			addFavorite();
		}
	};



	return (
		<Card  className="card-root" sx={{ maxWidth: 345 }}>
			<CardHeader  className="card-header" 
				avatar={
					<Avatar className="card-avatar" aria-label="recipe">
						{card.title[0]}
					</Avatar>
				}
				title={card.title}
				subheader={card.createdTime}
			/>
			<CardMedia className="card-media"
				component="img"
				height="194"
				image={card.imgUrl}
				alt={card.imgAlt}
			/>
			<CardContent className="card-content">
				<Typography variant="body2" color="text.secondary">
					{card.description}
				</Typography>
			</CardContent>
			<CardActions  className="card-actions" disableSpacing>
				<IconButton aria-label="add to favorites" onClick={toggleFavorite}>
					<FavoriteIcon color={isFavorite ? "error" : "action"} />
				</IconButton>
				<IconButton aria-label="share" onClick={toggleSharePanel}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
            {showSharePanel && (
                <Box className="share-panel">
                    <button href={shareOnWhatsApp} target="_blank" rel="noopener noreferrer">Share on WhatsApp</button><br />
                    <button href={shareOnMail}>Share via Email</button><br />
                    <button href={shareTextMessage}>Share via SMS</button><br />
                    <button onClick={copyLinkToClipboard}>Copy Link</button>
                </Box>
            )}
        </Card>
	);
}
