import {Box, Flex, Text, Button, Img, HStack} from '@chakra-ui/react'
import {useState} from 'react'
import Link from 'next/link'
import {useConnect, useAccount, useBalance} from 'wagmi'

const Header = () => {
  const [{data:connectData, error:connectError}, connect] = useConnect()
  const [{data: accountData}, disconnect] = useAccount({
    fetchEns: true,
  })
  
  return (
    <>
      <Flex py={2} px={4} bgColor="#191B1F" align={'center'} justify={'space-between'}>
        <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}} align="center">
          <Text>SENDS</Text>
        </Flex>
        <Flex flex={{base: 1}} justify={'center'} display={{base: 'none', md: 'inline-flex'}} align="center">
          <HStack spacing={3} bgColor="blackAlpha.200" borderRadius={40}>
            <Link href="https://www.coingecko.com/"><Button colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5}>Charts</Button></Link>
          </HStack>
        </Flex>
        <Flex flex={{base: 1}} justify={'center'} display={{base: 'none', md: 'inline-flex'}} align='center'>
          <HStack spacing={3}>
            {!accountData ? 
            <>
              {/* <Button textColor="white" colorScheme={'blackAlpha'} borderRadius={40} size={'sm'} px={5} py={5} disabled _disabled={{textColor: 'white'}}>
                <Flex>Ethereum<Img ml={2} src={'/eth.png'} w={'20px'}/></Flex>
              </Button>  */}
              {!connectData.connectors[0].ready ? 
              <Button 
                colorScheme={'blackAlpha'} 
                textColor="white" 
                borderRadius={40} 
                size={'sm'} 
                px={2} 
                py={5}
                disabled
              >
                <Text p={2} borderRadius={40} bgColor="#172A42" textColor={'#4F90EA'}>{'Please Install Metamask'}</Text>
              </Button>
              :
              <Button 
                colorScheme={'blackAlpha'} 
                textColor="white" 
                borderRadius={40} 
                size={'sm'} 
                px={2} 
                py={5}
                key={connectData.connectors[0].id}
                onClick={() => connect(connectData.connectors[0])}
              >
                <Text p={2} borderRadius={40} bgColor="#172A42" textColor={'#4F90EA'}>Connect Wallet</Text>
              </Button>
              }
            </>
            :
            <>
              <Button textColor="white" colorScheme={'blackAlpha'} borderRadius={40} size={'sm'} px={5} py={5} onClick={disconnect}>
                Disconnect
              </Button>
              <Button 
                colorScheme={'blackAlpha'} 
                textColor="white" 
                borderRadius={40} 
                size={'sm'} 
                px={2} 
                py={5}
                disabled
                _disabled={{textColor: 'white'}}
              >
                <Text p={2} borderRadius={40}>{`${accountData.address.slice(0, 7)}...${accountData.address.slice(35)}`}</Text>
              </Button>
            </>
            }
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}
 
export default Header;