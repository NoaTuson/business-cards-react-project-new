import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Footer() {
	return (
		<AppBar
			position="static"
			maxWidth="200px"
			sx={{ bgcolor: "#3e374d", boxShadow: "none" }}
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
						fontFamily: "Roboto-Light",
						fontWeight: 20,
						fontSize: 16,
						letterSpacing: ".1rem",
						color: "inherit",
						textDecoration: "none",
						justifyContent: "center",
						alignItems: "center",
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
						fontFamily: "Roboto-Light",
						fontWeight: 20,
						fontSize: 16,
						letterSpacing: ".1rem",
						color: "inherit",
						textDecoration: "none",
						justifyContent: "center",
						alignItems: "center",
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
