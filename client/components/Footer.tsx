import {
  Flex, 
  Text, 
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useContext, useState } from 'react'
import { useConnect } from 'wagmi'
import { TransactionContext } from '../context/TransactionContext'

const Footer = () => {
  const {transactionEvent} = useContext(TransactionContext) 
  const [connectData, connect] = useConnect()
  const [data, setData] = useState<any[]>([]) 
  
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
    <Flex justifyContent={'center'} align={'center'}>
      <Flex 
        flexDirection={'column'} 
        justifyContent={'space-between'} 
        overflow={'auto'} 
        h={'250px'}
        sx={{
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
            borderRadius: '5px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
            bgColor: 'gray.700'
          },
          '&::-webkit-scrollbar-corner':{
            display: 'none'
          }
        }}
      >
        <Table variant={'simple'}>
          <Thead>
            <Tr>
              <Th textAlign={'center'}>Amount (ETH)</Th>
              <Th textAlign={'center'}>Receiver</Th>
              <Th textAlign={'center'}>Timestamp</Th>
              <Th textAlign={'center'}>EtherScan</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((tx, index)=>(
              <Tr>
                <Td textAlign={'center'}>
                  <Text>{ethers.utils.formatEther(tx.amount)}</Text>
                </Td>
                <Td textAlign={'center'} textColor={'#f48706'}>
                  {`${tx.receiver.slice(0, 7)}...${tx.receiver.slice(35)}`}
                </Td>
                <Td textAlign={'center'}>
                  {tx.timestamp}
                </Td>
                <Td textAlign={'center'}>
                  <Link href={`https://ropsten.etherscan.io/tx/${tx.hash}`} target={'_blank'} flexDirection={'column'} textColor={'#2172e5'} style={{ textDecoration: 'none' }}>
                    <Text>View on</Text>
                    <Text>EtherScan</Text>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
}
 
export default Footer;