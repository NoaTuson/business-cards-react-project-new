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
import { useContext, useState, useMemo} from "react";
import { GeneralContext } from "../App";
import { RoleTypes } from "../components/Navbar";
import Joi from "joi";
import "../index.css";





export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);
	const navigate = useNavigate();
	const { setUser , setUserRoleType } = useContext(GeneralContext);

	const schema = Joi.object({
		email: Joi.string().email({ tlds: false }).required(),
		password: Joi.string().min(3).max(32).required().messages({
			"string.min": "Password must be at least 3 characters long",
			"string.max": "Password must be less than or equal to 32 characters long",
			"any.required": "Password is required",
		}),
	});

	const handelChange = (ev) => {
		const { name, value } = ev.target;
		const obj = { ...formData, [name]: value };
		setFormData(obj);

		const validate = schema.validate(obj, { abortEarly: false });
		const tempErrors = { ...errors };
		delete tempErrors[name];

		if (validate.error) {
			const item = validate.error.details.find((e) => e.context.key === name);

			if (item) {
				tempErrors[name] = item.message;
			}
		}

		setIsFormValid(!validate.error);
		setErrors(tempErrors);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		

		fetch(
			`https://api.shipap.co.il/clients/login?token=7cddfc3e-a309-11ee-beec-14dda9d4a5f0`,
			{
				credentials: "include",
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					email: data.get("email"),
					password: data.get("password"),
				}),
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
			.then((data) => {
				setUser(data);
				setUserRoleType(RoleTypes.user);

				if (data.business) {
					setUserRoleType(RoleTypes.business);
				} else if (data.admin) {
					setUserRoleType(RoleTypes.admin);
				}

				navigate("/");
			})
			.catch((err) => {
				alert(err.message);
			})
			
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
			<Container style={{ backgroundColor: "var(--navbar-background-color)", color: "var(--navbar-text-color)" , fontFamily: "var(--font-family)", fontSize: "var(--font-size-large)" }} component="main" maxWidth="xs">
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
						Login
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							error={Boolean(errors.email)}
							helperText={errors.email}
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={handelChange}
							value={formData.email}
						/>
						<TextField
							error={Boolean(errors.password)}
							helperText={errors.password}
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handelChange}
							value={formData.password}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={!isFormValid}
							sx={{ mt: 3, mb: 2 }}
						>
							Login
						</Button>
						<Grid container justifyContent="center">
							<Grid item>
								<Link to="/signup">Don't have an account? Sign Up</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
