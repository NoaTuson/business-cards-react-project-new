import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { GeneralContext } from "../App";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import "../index.css";

export const RoleTypes = {
	none: 0,
	user: 1,
	business: 2,
	admin: 3,
};

export const checkPermissions = (permissions, userRoleType) => {
	return permissions.includes(userRoleType);
};

const pages = [
	{ route: "/main", title: "Main Page" },
	{ route: "/about", title: "About" },
	{ route: "/login", title: "Login", permissions: [RoleTypes.none] },
	{ route: "/signup", title: "Signup", permissions: [RoleTypes.none] },
	{
		route: "/favorite",
		title: "Fav cards",
		permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
	},
	{
		route: "/my-cards",
		title: "My cards",
		permissions: [RoleTypes.business, RoleTypes.admin],
	},
	{ route: "/admin", title: "User management", permissions: [RoleTypes.admin] },
];

function Navbar() {
	const [anchorElNav, setAnchorElNav] = useState(null);
		const [theme, setTheme] = useState('light');
	const [anchorElUser, setAnchorElUser] = useState(null);
	const { user, setUser, userRoleType, setUserRoleType } =
		useContext(GeneralContext);
	const navigate = useNavigate();
	const path = useResolvedPath().pathname;

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
};


	const logout = () => {
	

		fetch(`https://api.shipap.co.il/clients/logout`, {
			credentials: "include",
		}).then(() => {
			setUser();
			setUserRoleType(RoleTypes.none);
			
			navigate("/");
		});

		handleCloseUserMenu();
	};

	return (
		<AppBar  style={{ backgroundColor: "var(--navbar-background-color)", color: "var(--navbar-text-color)" , fontFamily: "var(--font-family)", fontSize: "var(--font-size-large)" }}position="static" sx={{ boxShadow: "none" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<RecentActorsIcon
						sx={{
							display: { xs: "none", md: "flex" },
							mr: 1,
							fontSize: "3rem",
						}}
					/>
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
							textDecoration: "none",
							fontWeight: "bold",
						}}
					>
						Bcards
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages
								.filter(
									(p) =>
										!p.permissions ||
										checkPermissions(p.permissions, userRoleType)
								)
								.map((p) => (
									<Link
										key={p.route}
										to={p.route}
										style={{ textDecoration: "none", color: "black" }}
									>
										<MenuItem onClick={handleCloseNavMenu}>
											<Typography textAlign="center">{p.title}</Typography>
										</MenuItem>
									</Link>
								))}
						</Menu>
					</Box>
					<RecentActorsIcon
						sx={{
							display: { xs: "flex", md: "none" },
							mr: 1,
							fontSize: "3rem",
						}}
					/>
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
						}}
					>
						Bcards
					</Typography>
<Brightness4Icon  onClick={toggleTheme} ></Brightness4Icon>
					
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages
							.filter(
								(p) =>
									!p.permissions ||
									checkPermissions(p.permissions, userRoleType)
							)
							.map((p) => (
								<Link
									key={p.route}
									to={p.route}
									style={{ textDecoration: "none", color: "white" }}
								>
								
									<Button
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: "white",
											display: "block",
											backgroundColor: p.route === path ? "cornflowerblue" : "",
										}}
									>
										{p.title}
									</Button>
									
								</Link>
							))}
					</Box>
					
					{user ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										alt={user.fullName}
										src="/static/images/avatar/2.jpg"
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<Link
									to="/account"
									style={{ textDecoration: "none", color: "black" }}
								>
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign="center">{user.fullName}</Typography>
									</MenuItem>
								</Link>

								<MenuItem onClick={logout}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							</Menu>
						</Box>
					) : (
						""
					)}

				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
