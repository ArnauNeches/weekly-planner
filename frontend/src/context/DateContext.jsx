import { createContext, useContext } from 'react';
import useDateLogic from "../hooks/useDateLogic";

const DateContext = createContext();

export function DateProvider({ children }) {
  const dateValues = useDateLogic(); 

  return (
    <DateContext.Provider value={dateValues}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
    return useContext(DateContext);
} 