import {Box, Flex, Text, Button, Img, HStack, Stack, InputGroup, Input, Select} from '@chakra-ui/react'
import {ethers, Event} from 'ethers'
import { useEffect, useContext, useState } from 'react'
import { useConnect } from 'wagmi'
import abi from '../../smart_contract/artifacts/contracts/Transactions.sol/Transactions.json'
import { TransactionContext } from '../context/TransactionContext'

const Footer = () => {
  const {transactionEvent} = useContext(TransactionContext) 
  const [connectData, connect] = useConnect()
  const [data, setData] = useState([]) 
  
  const event = async ()=>{
    const result = await transactionEvent()
    setData(result)
  }

  useEffect(()=>{
    if(connectData.data.connectors[0].ready){
      event()
    }
  }, [])
  
  return (
    <Flex>
     
    </Flex>
  );
}
 
export default Footer;