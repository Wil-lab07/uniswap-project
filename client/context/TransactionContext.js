import React, { useEffect, useState } from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import Swal from 'sweetalert2'
import abi from '../../smart_contract/artifacts/contracts/Transaction.sol/Transaction.json'

import { ethers } from 'ethers'

export const TransactionContext = React.createContext()

export const TransactionProvider = ({children}) =>{
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const contractABI = abi.abi
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const [isLoading, setLoading] = useState(false)

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

  const getEthereumContract = async ()=>{
    // const provider = ethers.providers.getDefaultProvider(
    //   'https://eth-ropsten.alchemyapi.io/v2/BrQmcgpiHTXIZiGSRvgaLdVm6jUgmsDc', 
    //   'ropsten'
    // )
    // const address = contractAddress
    // const abi = contractABI
    // const privateKey = 'a61642fd40b7b9450ca16ca141a3dfc695fcaa3e32550297addb5e1741f7f08a'
    // const wallet = new ethers.Wallet(privateKey, provider)
    // const contract = new ethers.Contract(address, abi, wallet) 
    // return contract
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    )
    return transactionContract
  }

  const sendTransaction = async (data)=>{
    try{
      setLoading(true)

      if(account === undefined){
        setLoading(false)
        return Swal.fire({
          icon: 'error',
          background: '#191B1F',
          title: "<h5 style='color:white'>" + "Your wallet hasn't connected" + "</h5>",
          confirmButtonText: "<h5>" + "Please connect your Wallet" + "</h5>",
          confirmButtonColor: '#172A42'
        })
      }

      const parsedAmount = ethers.utils.parseEther(data.amount)
      const addressTo = data.toAddress

      await (window.ethereum).request({
        method: "eth_sendTransaction",
        params:[{
          from: account,
          to: addressTo,
          gas: '0x7EF40',
          value: parsedAmount._hex
        }]
      })

      const contract = await getEthereumContract()

      const sendTransaction = await (contract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        'TRANSFER'
      ))

      await sendTransaction.wait()

      console.log(sendTransaction)

      setLoading(false)
    } catch(err){
      setLoading(false)
      console.log(err)
    }
  }
  
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        sendTransaction,
        account,
        etherBalance,
        isLoading
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}



