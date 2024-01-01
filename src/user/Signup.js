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
import { Link, useNavigate } from "react-router-dom";
import {  useMemo} from "react";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import "../index.css";



export const clientStructure = [
	{
		name: "firstName",
		type: "text",
		label: "First Name",
		required: true,
		block: false,
	},
	{
		name: "middleName",
		type: "text",
		label: "Middle Name",
		required: false,
		block: false,
	},
	{
		name: "lastName",
		type: "text",
		label: "Last Name",
		required: true,
		block: false,
	},
	{ name: "phone", type: "tel", label: "Phone", required: true, block: false },
	{
		name: "email",
		type: "email",
		label: "Email",
		required: true,
		block: false,
	},
	{
		name: "password",
		type: "password",
		label: "Password",
		required: true,
		block: false,
		initialOnly: true,
	},
	{
		name: "imgUrl",
		type: "text",
		label: "Img Url",
		required: false,
		block: true,
	},
	{
		name: "imgAlt",
		type: "text",
		label: "Img Alt",
		required: false,
		block: false,
	},
	{
		name: "state",
		type: "text",
		label: "State",
		required: false,
		block: false,
	},
	{
		name: "country",
		type: "text",
		label: "Country",
		required: true,
		block: false,
	},
	{ name: "city", type: "text", label: "City", required: true, block: false },
	{
		name: "street",
		type: "text",
		label: "Street",
		required: false,
		block: false,
	},
	{
		name: "houseNumber",
		type: "number",
		label: "House Number",
		required: false,
		block: false,
	},
	{ name: "zip", type: "number", label: "Zip", required: false, block: false },
	{
		name: "business",
		type: "boolean",
		label: "Business",
		required: true,
		block: false,
	},
];

export default function Signup() {
	const navigate = useNavigate();
	

	const handleSubmit = (ev) => {
		ev.preventDefault();
		const obj = {};
		const elements = ev.target.elements;

		clientStructure.forEach((s) => {
			if (s.type === "boolean") {
				obj[s.name] = elements[s.name].checked;
			} else {
				obj[s.name] = elements[s.name].value;
			}
		});

		

		fetch(
			`https://api.shipap.co.il/clients/signup?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`,
			{
				credentials: "include",
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(obj),
			}
		)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return res.text().then((x) => {
						throw new Error(x);
					});
				}
			})
			.then(() => navigate("/login"))
			.catch((err) => alert(err.message))
			
	};




	const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Create a theme instance.
const theme = useMemo(
() => createTheme({
	palette: {
		mode: prefersDarkMode ? 'dark' : 'light',
		primary: {
		main: prefersDarkMode ? '#473f57' : '#8080a0',
		},
		secondary: {
		main: prefersDarkMode ? '#68607a' : '#a9a9d3',
		},
		error: {
		main: prefersDarkMode ? '#ff6b81' : '#e57373',
		},
		background: {
		default: prefersDarkMode ? '#68607a' : '#d7d7eb',
		paper: prefersDarkMode ? '#473f57' : '#a9a9d3',
		},
		text: {
		primary: prefersDarkMode ? '#ffffff' : '#000000',
		secondary: prefersDarkMode ? '#ffffff' : '#000000',
		},
	},
	components: {
		// Override styles for components here
		MuiButton: {
		styleOverrides: {
			root: {
			// Apply CSS variable here
			backgroundColor: 'var(--button-background-color)',
			color: 'var(--button-text-color)',
			'&:hover': {
				backgroundColor: 'var(--button-background-color)',
				// Increase the specificity for the pseudo class
				'@media (hover: none)': {
				backgroundColor: 'var(--button-background-color)',
				},
			},
			},
		},
		},
		MuiTextField: {
		styleOverrides: {
			root: {
			'& label.Mui-focused': {
				color: 'var(--text-color)',
			},
			'& .MuiInput-underline:after': {
				borderBottomColor: 'var(--text-color)',
			},
			'& .MuiOutlinedInput-root': {
				'& fieldset': {
				borderColor: 'var(--text-color)',
				},
				'&:hover fieldset': {
				borderColor: 'var(--text-color)',
				},
				'&.Mui-focused fieldset': {
				borderColor: 'var(--text-color)',
				},
			},
			},
		},
		},
	},
	}),
[prefersDarkMode]
);

	return (
		<ThemeProvider theme={theme}>
			<Container style={{ backgroundColor: "var(--navbar-background-color)", color: "var(--navbar-text-color)" , fontFamily: "var(--font-family)", fontSize: "var(--font-size-large)" }}  component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						
					}}
				>
					<Avatar sx={{ m: 1,backgroundColor: "var(--navbar-background-color)" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<Grid container spacing={2}>
							{clientStructure.map((s) => (
								<Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
									{s.type === "boolean" ? (
										<FormControlLabel
											control={<Switch color="primary" name={s.name} />}
											label={s.label}
											labelPlacement="start"
										/>
									) : (
										<TextField
											margin="normal"
											required={s.required}
											fullWidth
											id={s.name}
											label={s.label}
											name={s.name}
											type={s.type}
											autoComplete={s.name}
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
							Signup
						</Button>
						<Grid container justifyContent="center">
							<Grid item>
								<Link to="/login">Already have an account? Login</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
			<br /> <br /> <br /> <br />
		</ThemeProvider>
	);
}
