import React, {useEffect, useState} from 'react'
import {ethers} from 'ethers'
import abi from '../../smart_contract/artifacts/contracts/Transactions.sol/Transactions.json'
import {useConnect, useAccount, useContractWrite} from 'wagmi'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TransactionContext = React.createContext()

let eth

if(typeof window !== 'undefined'){
  eth = window.ethereum
}

let contractAddress = ""

if(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS){
  contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
}

export const TransactionProvider = ({children})=>{
  const contractAddress = '0xfF030AC5D7535529B15A2F1B2b8B0c6c577B6D2D'
  const contractABI = abi.abi
  const [{data:connectData, error:connectError}, connect] = useConnect()
  const [{data:accountData}, disconnect] = useAccount({
    fetchEns: true,
  })
  const [txData, setTxData] = useState([])
  const [addressTo, setAddressTo] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [txResult, sendTx] = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: abi.abi
  }, 'addToBlockchain', {
    args: [
      addressTo,
      amount,
      message
    ]
  })
  const [isLoading, setLoading] = useState(false)
  
  const getEthereumContract = ()=>{
    const provider = new ethers.providers.Web3Provider(eth)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer) 
    return transactionContract
  }

  const transactionEvent = async ()=>{
    const transactionContract = await getEthereumContract()
    const filter = await transactionContract.filters.Transfer()
    const eventsData = await transactionContract.queryFilter(filter)
    const data = []
    eventsData.map((item)=>{
      data.push({
        sender: item.args[0],
        receiver: item.args[1],
        amount: item.args[2],
        message: item.args[3],
        timestamp: item.args[4],
        keyword: item.args[5]
      })
    })
    return data
  }

  const sendTransaction = async (data)=>{
    try{
      if(!accountData){
        return Swal.fire({
          icon: "error",
          title: "Your Wallet's Not Connected!",
          color: 'white',
          confirmButtonText: 'Please Connect Your Wallet!',
          confirmButtonColor: '#172a42',
          background: '#171c26'
        })
      }
      setLoading(true)
      const {amount, addressTo, message} = data
      const amountTx = ethers.utils.parseEther(amount)

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: accountData.address,
          to: addressTo,
          gas: '0x5208', //2100 GWEI
          value: ethers.utils.parseEther(amount)._hex
        }]
      })

      setAddressTo(addressTo)
      setAmount(amountTx)
      setMessage(message)

      await sendTx()
      console.log(txResult)

      setLoading(txResult.loading)

      if(txResult.loading === false){
        toast.success(`${`${accountData.address.slice(0, 7)}...${accountData.address.slice(35)}`} sending ${amount} ETH to ${`${addressTo.slice(0, 7)}...${addressTo.slice(35)}`}`)
      }
    } catch(err){
      setLoading(false)
      console.log(err)
    }
  }

  return(
    <TransactionContext.Provider
      value={{
        sendTransaction,
        transactionEvent,
        isLoading
    }}
    >
      {children}
    </TransactionContext.Provider>
  )
}