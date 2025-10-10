import React from 'react';
import Footer from '../components/Footer';
import Header from "../components/Header";
import {usePersistedWalletCode} from "../hooks/usePersistedWalledCode";

const Main = () => {
    const [walletCode, setWalletCode] = usePersistedWalletCode();

    return (
        <div className="w-full gap-6 p-4 bg-white dark:bg-gray-800">
            <Header/>
            <h1 className="text-3xl text-center text-gray-800 dark:text-white font-semibold mb-4 border-b pb-2">
                📊 GPW Dashboard
            </h1>
            <div className="container mx-auto px-4">
                <div className="bg-indigo-500 text-white p-4 rounded">
                    <p className="text-center">
                        Dodaj spółki giełdowe notowane na GPW, aby śledzić ich ceny w czasie rzeczywistym!
                    </p>
                </div>
                <div className="flex justify-center"></div>
            </div>
            <Footer/>
        </div>
    );
};

export default Main;