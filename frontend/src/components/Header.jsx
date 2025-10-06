import React, {useMemo} from 'react';
import Logout from "./LogoutButton";
import {useNavigate} from "react-router-dom";


const getUserFromToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Flask-JWT-Extended domyślnie zapisuje identity pod kluczem "sub"
        return payload.sub; // to będzie email
    } catch {
        return null;
    }
};


const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const hasToken = Boolean(localStorage.getItem('token'));

    const userEmail = useMemo(() => (token ? getUserFromToken(token) : null), [token]);

    return (
        <div className="container mx-auto">
            <header className="text-white p-4">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition duration-200">
                        Strona Główna
                    </button>
                    <div className="flex items-center gap-3">
                        {userEmail && (
                            <span className="text-sm text-gray-200">
                                User: {userEmail}
                            </span>
                        )}
                        {hasToken ? (
                            <Logout/>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition duration-200">
                                Zaloguj
                            </button>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
