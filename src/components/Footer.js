import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../index.css";
function Footer() {
	return (
		<AppBar  style={{ backgroundColor: "var(--navbar-background-color)", color: "var(--navbar-text-color)", top: 'auto', bottom: 0, fontFamily: "Roboto-Light", fontSize: "var(--font-size-normal)"  }}
			position="fixed"
            
            maxWidth="200px"
            sx={{ boxShadow: "none" }}
		>
			<div
				class="container p-4"
				maxWidth="xl"
				style={{
					display: "flex",
					mr: 2,
					flexDirection: "column",
					alignItems: "center",
					fontFamily: "Roboto-Light",
					fontSize: 15
					
				}}
			>
				For any technical difficultie, Please contact us via our Email Address
				at
				<Link color="inherit" href="https://mail.google.com/">
					Bcards@gmail.com
				</Link>
				{"  "}
			</div>

			<Container 
				maxWidth="xl"
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					fontFamily: "Roboto-Light",
					fontSize: 15
				}}
			>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="#app-bar-with-responsive-menu"
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						letterSpacing: ".1rem",
						color: "inherit",
						fontFamily: "Roboto-Light",
						textDecoration: "none",
						justifyContent: "center",
						alignItems: "center",
						fontSize: 15
					}}
				>
					{"© 2023 Copyright: "}
					<Link color="inherit" href="https://Bcards.com/">
						Bcards.com
					</Link>
					{"  "}
				</Typography>

				<Typography
					variant="h5"
					noWrap
					component="a"
					href="#app-bar-with-responsive-menu"
					sx={{
						mr: 2,
						display: { xs: "flex", md: "none" },
						flexGrow: 1,
						letterSpacing: ".1rem",
						color: "inherit",
						textDecoration: "none",
						justifyContent: "center",
						fontFamily: "Roboto-Light",
						alignItems: "center",
						fontSize: 15
					}}
				>
					{"Copyright ©-  "}
					<Link color="inherit" href="https://mui.com/">
						Bcards.com
					</Link>
					{"  "}
					{new Date().getFullYear()}
					{"."}
				</Typography>
			</Container>
		</AppBar>
	);
}
export default Footer;
