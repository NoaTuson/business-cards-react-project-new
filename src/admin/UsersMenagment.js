import React, { useState, useEffect, useContext } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { GeneralContext } from "../App"; 

const defaultTheme = createTheme();

// Define your client structure with the fields you need
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

const ClientTable = ({ clients, onSelectClient, onEditClient, onDeleteClient }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.firstName} {client.middleName} {client.lastName}</td>
                        <td>{client.email}</td>
                        <td>
                            <button onClick={() => onSelectClient(client)}>View</button>
                            <button onClick={() => onEditClient(client)}>Edit</button>
                            <button onClick={() => onDeleteClient(client.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const ClientDetails = ({ client }) => {
    return (
        <div>
            <h4>Client Details</h4>
            <p>Name: {client.firstName} {client.middleName} {client.lastName}</p>
            <p>Email: {client.email}</p>
            <p>Phone: {client.phone}</p>
            <p>Address: {client.street}, {client.city}, {client.state}, {client.country}, {client.zip}</p>
            <p>Business: {client.business ? 'Yes' : 'No'}</p>
            {/* Add more details as needed */}
        </div>
    );
};


const EditClientForm = ({ client, onClientUpdated }) => {
    const { setUser, setLoader } = useContext(GeneralContext);
    const [formData, setFormData] = useState(client);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoader(true);
        
        const updatedClient = clientStructure.reduce((acc, field) => {
            acc[field.name] = formData[field.name];
            return acc;
        }, {});

        const response = await fetch(`https://api.shipap.co.il/admin/clients/${client.id}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedClient),
        });

        if (!response.ok) {
            throw new Error('Server responded with an error');
        }

        const data = await response.json(); // Assuming the server sends a response
        setUser(data); // Update the user context with the response data
        onClientUpdated(); // Notify parent component to refresh data
    } catch (error) {
        console.error('Error saving the client:', error);
        // Handle error state here, e.g., showing an error message to the user
    } finally {
        setLoader(false);
    }
};


    const handleChange = (e, field) => {
        setFormData({ ...formData, [field.name]: field.type === 'boolean' ? e.target.checked : e.target.value });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit user
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            {clientStructure.map((field) => (
                                <Grid item xs={12} sm={field.block ? 12 : 6} key={field.name}>
                                    {field.type === 'boolean' ? (
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    color="primary"
                                                    name={field.name}
                                                    checked={formData[field.name]}
                                                    onChange={(e) => handleChange(e, field)}
                                                />
                                            }
                                            label={field.label}
                                            labelPlacement="start"
                                        />
                                    ) : (
                                        <TextField
                                            required={field.required}
                                            fullWidth
                                            id={field.name}
                                            label={field.label}
                                            name={field.name}
                                            autoComplete={field.name}
                                            value={formData[field.name]}
                                            onChange={(e) => handleChange(e, field)}
                                        />
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default function UsersManagement() {
  const [clients, setClients] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editClient, setEditClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Define the error state variable

    // Define fetchClients inside the useEffect hook
    const fetchClients = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://api.shipap.co.il/admin/clients?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0', { credentials: 'include' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setClients(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };


 useEffect(() => {
        const fetchClients = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('https://api.shipap.co.il/admin/clients?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0', { credentials: 'include' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setClients(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCards = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://api.shipap.co.il/cards?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0', { credentials: 'include' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCards(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
        fetchCards();
    }, []);

    const handleClientSelect = (client) => {
        setSelectedClient(client);
    };

    const handleEditClient = (client) => {
        setEditClient(client);
    };

    const handleDeleteClient = async (clientId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.shipap.co.il/admin/clients/${clientId}?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`, {
                credentials: 'include',
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setClients(clients.filter(client => client.id !== clientId));
            setSelectedClient(null); // Clear selection if the deleted client was selected
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    // ... rest of your UsersManagement component

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h3 className="tempTitle">Users Management</h3>
            <ClientTable 
                clients={clients} 
                onSelectClient={handleClientSelect} 
                onEditClient={handleEditClient}
                onDeleteClient={handleDeleteClient}
            />
            {selectedClient && <ClientDetails client={selectedClient} />}
            {editClient && <EditClientForm client={editClient} onClientUpdated={() => fetchClients()} />}
        </div>
    );
}

