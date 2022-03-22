import {Box, Flex, Text, Button, Img, HStack} from '@chakra-ui/react'
import Link from 'next/link'
import {useConnect, useAccount, chain, useBalance, InjectedConnector} from 'wagmi'

const Header = () => {
  const [connectData, connect] = useConnect()
  const [accountData, disconnect] = useAccount();
  const [ethersBalance] = useBalance({
    addressOrName: accountData.data?.address
  })
  return (
    <Flex py={2} px={4} bgColor="#191B1F" align={'center'} justify={'space-between'} w={'100%'}>
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
          {!connectData.data?.connected ? 
            <Button
              colorScheme={'blackAlpha'} 
              textColor="white" 
              borderRadius={40} 
              size={'sm'} 
              px={2} 
              py={5}
              onClick={()=>{connect(connectData.data?.connectors[0])}}
            >
              <Text p={2} borderRadius={40} bgColor="#172A42" textColor={'#4F90EA'}>{!connectData.data?.connectors[0].ready ? 'Please Install Metamask' : 'Connect Wallet'}</Text>
            </Button>
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
                <Text p={2} borderRadius={40}>{`${accountData.data?.address.slice(0, 7)}...${accountData.data?.address.slice(35)}`}</Text>
              </Button>
              <Button textColor="white" colorScheme={'blackAlpha'} borderRadius={40} size={'sm'} px={5} py={5} disabled _disabled={{textColor: 'white'}}>
                <Flex>{ethersBalance.data?.formatted.slice(0, 7)}<Img ml={2} src={'/eth.png'} w={'20px'}/></Flex>
              </Button> 
            </>
          }
        </HStack>
      </Flex>
    </Flex>
  );
}
 
export default Header;