import React, {useState} from 'react'
import {ethers} from 'ethers'
import abi from '../../smart_contract/artifacts/contracts/Transactions.sol/Transactions.json'
import {useConnect, useAccount, useContractWrite} from 'wagmi'
import Swal from 'sweetalert2'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TransactionContext = React.createContext()

let eth

if(typeof window !== 'undefined'){
  eth = window.ethereum
}

let contractAdd = ""

if(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS){
  contractAdd = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
}

export const TransactionProvider = ({children})=>{
  const contractAddress = contractAdd
  const contractABI = abi.abi
  const [connectData, connect] = useConnect()
  const [{data:accountData}, disconnect] = useAccount({
    fetchEns: true,
  })
  const [isLoading, setLoading] = useState(false)
  const [sendResult, sendTx] = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: contractABI
  }, 'addToBlockchain')
  
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
      const date = new Date(item.args[4].toNumber() * 1000)
      const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "short", year: "numeric", minute: "numeric" }).format(date);
      data.push({
        hash: item.transactionHash,
        sender: item.args[0],
        receiver: item.args[1],
        amount: item.args[2],
        message: item.args[3],
        timestamp: formattedDate,
        keyword: item.args[5]
      })
    })
    return data.reverse()
  }

  const sendTransaction = async (data)=>{
    try{
      if(!connectData.data.connected){
        return Swal.fire({
          icon: "error",
          title: "Your Wallet's Not Connected!",
          color: 'white',
          confirmButtonText: 'Please Connect Your Wallet!',
          confirmButtonColor: '#172a42',
          background: '#171c26'
        })
      }
      const {amount, addressTo, message} = data
      const amountTx = ethers.utils.parseEther(amount)

      setLoading(true)
      await sendTx({
        args:[
          addressTo,
          amountTx,
          message
        ],
        overrides:{
          value: ethers.utils.parseEther(amount)
        }
      })

      console.log(sendResult)

      if(sendResult.error){
        throw sendResult.error
      }
      setLoading(false)
      toast.success(`${`${accountData.address.slice(0, 7)}...${accountData.address.slice(35)}`} sending ${amount} ETH to ${`${addressTo.slice(0, 7)}...${addressTo.slice(35)}`}`)
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