import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signup from './user/Signup';
import Account from './user/Account';
import Cards from './cards/Cards';
import MyCards from './cards/MyCards';
import FavCards from './cards/FavCards';
import UsersMenagment from './admin/UsersMenagment';
import MainPage from './pages/MainPage';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/my-cards" element={<MyCards />} />
            <Route path="/favorite" element={<FavCards />} />
            <Route path="/admin" element={<UsersMenagment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    )
}
