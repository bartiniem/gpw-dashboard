import React from 'react';
import Logout from "./LogoutButton";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto">
            <header className="text-white p-4">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition duration-200">
                        Strona Główna
                    </button>
                    <Logout/>
                </div>
            </header>
        </div>
    );
}

export default Header;
