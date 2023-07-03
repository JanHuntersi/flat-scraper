import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchData } from "./estateService";
import Estate from "./estateInterface";

export interface EstateServiceContextValue {
    fetchData: () => Promise<void>;
    estates: Estate[];
}

//Starting state
const defaultState = {
    fetchData: async () => { },
    estates: [],
}

export const EstateServiceContext = createContext<EstateServiceContextValue>(defaultState);

export const useEstateService = (): EstateServiceContextValue =>
    useContext(EstateServiceContext);

export const EstateServiceProvider = ({ children, }: { children: React.ReactNode; }) => {
    const [estates, setEstates] = useState<Estate[]>([]);

    //Onload try and fetch all estates
    useEffect(() => {
        console.log("Trying to fetch data...");
        fetchData()
            .then((data) => {
                setEstates(data);
                console.log("Data fetched size is: ", data.length);
            })
            .catch((err) => {
                console.log("Caught error in EstateServiceProvider: ", err);
            });
    }, []);

    //Manually call to fetch and set data
    const fetchAndUpdate = async () => {
        try {
            const data = await fetchData();
            setEstates(data);
        } catch (err) {
            console.log("Caught error in EstateServiceProvider: ", err);
        }
    };

    const contextValue: EstateServiceContextValue = {
        fetchData: fetchAndUpdate,
        estates,
    };

    return (
       <EstateServiceContext.Provider value={contextValue}>
        {children}
       </EstateServiceContext.Provider>
  );
}

export default EstateServiceProvider;
