import React, { createContext, useContext, useEffect, useState } from 'react'


const UserContext = createContext()
function CryptoContext({ children }) {


  const [currency, setCurrency] = useState("INR")
  const [symbol, setSymbol] = useState('rupee')

  useEffect(() => {
    if(currency === "INR") setSymbol("ruppee")
    else if(currency === "USD") setSymbol('$')
  }, [currency]);

  return (
    <UserContext.Provider value={{currency, symbol, setCurrency}}>{ children }</UserContext.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
  return useContext(UserContext)
}