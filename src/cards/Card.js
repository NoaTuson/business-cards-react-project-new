import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function MyCard({ card, toggleFavorite }) {
    // Local state to handle favorite status
    const [isFavorite, setIsFavorite] = useState(card.favorite);

    // This function is called when the favorite icon is clicked
    const handleFavoriteClick = () => {
        // Update the local UI immediately for a responsive feel
        setIsFavorite(!isFavorite);

        // Call the parent function to handle the API update
        toggleFavorite(card.id, !isFavorite);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {card.title[0]}
                    </Avatar>
                }
                title={card.title}
                subheader={card.createdTime}
            />
            <CardMedia
                component="img"
                height="194"
                image={card.imgUrl}
                alt={card.imgAlt}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {card.subtitle}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                    <FavoriteIcon color={isFavorite ? 'error' : 'action'} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

// Function that would be in the parent component of MyCard

const toggleFavorite = (cardId, newFavoriteStatus) => {
  // Here you'd make an API call to update the favorite status
  fetch(`https://api.shipap.co.il/cards/${cardId}/favorite?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers as necessary, such as authorization headers
    },
    body: JSON.stringify({ favorite: newFavoriteStatus }),
    credentials: 'include',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Handle the successful update here, possibly refreshing the list of cards or updating state
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    // Revert the favorite status in the UI if the server update fails
    setIsFavorite(!newFavoriteStatus);
  });
};
