import {Flex, Text, Img, HStack, Stack, Link} from '@chakra-ui/react'
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
        height={'250px'}
        sx={{
          '&::-webkit-scrollbar': {
            width: '10px',
            borderRadius: '5px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
            bgColor: 'gray.700'
          },
        }}
      >
        <Stack>
          {data?.map((tx, index)=>(
          <Flex border={'solid'} borderRadius={'10px'} pr={5} pl={5}>
            <HStack spacing={3}>
              <Flex flexDirection={'column'}>
                <Flex>
                  <Text>{ethers.utils.formatEther(tx.amount)}</Text>
                  <Img src={'./ethCurrency.png'} width={'45px'}/>
                  <Text>Sent</Text>
                </Flex>
                <Flex>
                  <Text>To</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex>
                  <Text textColor={'#f48706'} mr={2}>{`${tx.receiver.slice(0, 7)}...${tx.receiver.slice(35)}`}</Text>
                  <Text>on</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex>
                  <Text>{tx.timestamp}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex>
                  <Link href={`https://ropsten.etherscan.io/tx/${tx.hash}`} target={'_blank'} flexDirection={'column'} textColor={'#2172e5'} style={{ textDecoration: 'none' }}>
                    <Text>View on</Text>
                    <Text>EtherScan</Text>
                  </Link>
                </Flex>
              </Flex>
            </HStack>
          </Flex>
          ))}  
        </Stack>
      </Flex>
    </Flex>
  );
}
 
export default Footer;