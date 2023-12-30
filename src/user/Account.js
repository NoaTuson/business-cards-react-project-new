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
import { useNavigate } from "react-router-dom";
import { useContext,useMemo } from "react";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { clientStructure } from "./Signup";
import "../index.css";


export default function Account() {
	const navigate = useNavigate();
	const { user, setUser, setLoader } = useContext(GeneralContext);

	const handleSubmit = (ev) => {
		ev.preventDefault();
		const obj = {};
		const elements = ev.target.elements;

		clientStructure
			.filter((s) => !s.initialOnly)
			.forEach((s) => {
				if (s.type === "boolean") {
					obj[s.name] = elements[s.name].checked;
				} else {
					obj[s.name] = elements[s.name].value;
				}
			});

		setLoader(true);

		fetch(
			`https://api.shipap.co.il/clients/update?token=d2960d76-3431-11ee-b3e9-14dda9d4a5f0`,
			{
				credentials: "include",
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(obj),
			}
		).then(() => {
			setLoader(false);
		});
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
			{user ? (
				<Container  style={{ backgroundColor: "var(--navbar-background-color)", color: "var(--navbar-text-color)" , fontFamily: "var(--font-family)", fontSize: "var(--font-size-large)" }} component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1,backgroundColor: "var(--navbar-background-color)"}}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Edit user
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<Grid container spacing={2}>
								{clientStructure
									.filter((s) => !s.initialOnly)
									.map((s) => (
										<Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
											{s.type === "boolean" ? (
												<FormControlLabel
													control={
														<Switch
															color="primary"
															name={s.name}
															checked={user[s.name]}
														/>
													}
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
													value={user[s.name]}
													onChange={(ev) =>
														setUser({ ...user, [s.name]: ev.target.value })
													}
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
			) : (
				""
			)}
			<br /> <br /> <br /> <br />
		</ThemeProvider>
	);
}