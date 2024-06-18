import { createContext } from "react";
import runChat from "./openai";

export const Context = createContext();

const ContextProvider = (props) => {

    const onSent = async (prompt) =>{
        await runChat(prompt)
    }

    const contextValue = {};

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;