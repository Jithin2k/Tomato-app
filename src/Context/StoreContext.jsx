import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = () => {
  const contextValue = {};
  return (
    <StoreContext.Provider value={contextValue}>
      {prop.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
