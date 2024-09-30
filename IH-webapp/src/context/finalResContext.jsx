import { createContext, useState } from "react";

export const FinalResContext = createContext();

export const FinalResProvider = ({ children }) => {

    const [resultStore, setResultStore] = useState([]);
    const [allQuestionsData, setAllQuestionsData] = useState([]);
    const [sourceAndTargetStep1, setSourceAndTargetStep1] = useState([]);


    return (
        <FinalResContext.Provider
            value={{
                resultStore, setResultStore,
                allQuestionsData, setAllQuestionsData,
                sourceAndTargetStep1, setSourceAndTargetStep1
            }}>
            {children}
        </FinalResContext.Provider>
    )
}