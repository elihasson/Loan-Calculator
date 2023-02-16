import { useContext } from "react";
import { createContext, useState } from "react";

const StateContext = createContext({
    loan: null,
    setLoan: () => { }
})

export const ContextProvider = ({ children }) => {

    const [loan, setLoan] = useState({})

    return (
        <StateContext.Provider value={{
            loan,
            setLoan,
        }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)