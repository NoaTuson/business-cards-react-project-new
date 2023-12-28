import { useState, createContext, useEffect } from "react";
import "./App.css";
import Router from "./Router";
import Navbar, { RoleTypes } from "./components/Navbar";
import Loader from "./components/Loader";
import Footer from "./components/Footer";


export const GeneralContext = createContext();
export const ThemeContext = createContext();


function App() {
	const [user, setUser] = useState();
	const [loader, setLoader] = useState(true);
	const [userRoleType, setUserRoleType] = useState(RoleTypes.none);
	const [theme, setTheme] = useState('dark');



	useEffect(() => {
		fetch(`https://api.shipap.co.il/clients/login`, {
			credentials: "include",
		})
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
			})
			.catch((err) => {
				setUserRoleType(RoleTypes.none);
			})
			.finally(() => setLoader(false));
	}, []);

	return (
		<GeneralContext.Provider
			value={{ user, setUser, setLoader, userRoleType, setUserRoleType }}
		>
			<ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={theme}></div>
			<Navbar />
			<Router />
			{loader && <Loader />}
			<Footer />
			</ThemeContext.Provider>
		</GeneralContext.Provider>
	);
}

export default App;
