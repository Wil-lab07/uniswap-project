import React, { useEffect, useState } from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Swal from 'sweetalert2'

export const TransactionContext = React.createContext()

export const TransactionProvider = ({children}) =>{
  const [userName, setUserName] = useState('')
  const [currentAccount, setCurrentAccount] = useState(false)
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  const connectWallet = async ()=>{
    try{
      if(!window.ethereum){
        return Swal.fire({
          icon: 'error',
          background: '#191B1F',
          title: "<h5 style='color:white'>" + "You haven't install Metamask" + "</h5>",
          confirmButtonText: "Please install Metamask",
          confirmButtonColor: '#172A42'
        })
      }
      activateBrowserWallet()
    } catch(err){
      console.log(err)
    }
  }
  
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        account,
        etherBalance
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}



