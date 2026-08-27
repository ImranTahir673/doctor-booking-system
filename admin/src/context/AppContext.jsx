import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currency = '$';
    const backendUrl = "http://localhost:4000";

    const calculateAge = (dob) => {
        if (!dob || dob === 'Not Selected') return 'N/A';
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };

    const value = {
        currency,
        backendUrl,
        calculateAge
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
