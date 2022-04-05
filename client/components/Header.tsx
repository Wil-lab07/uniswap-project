import {Flex, Text, Button, Img, HStack, IconButton, useDisclosure, Collapse, Stack} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import {useConnect, useAccount, useBalance} from 'wagmi'

const Header = () => {
  const [connectData, connect] = useConnect()
  const [accountData, disconnect] = useAccount();
  const [ethersBalance] = useBalance({
    addressOrName: accountData.data?.address
  })
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex py={2} px={4} bgColor="#191B1F" align={'center'} justify={'space-between'}>
        <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}} align="center">
          <Text>SENDS</Text>
        </Flex>
        <Flex flex={{base: 1}} justifyContent={'center'} align="center" display={{base: 'flex', md: 'none'}}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{base: 1}} justify={'center'} display={{base: 'none', md: 'inline-flex'}} align="center">
          <HStack spacing={3} bgColor="blackAlpha.200" borderRadius={40}>
            <Link href="https://www.coingecko.com/"><Button colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5}>Charts</Button></Link>
          </HStack>
        </Flex>
        <Flex flex={{base: 1}} justify={'center'} align='center' display={{base: 'none', md: 'inline-flex'}}>
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
      <Flex 
        position={'fixed'}
        w={'100%'}
        top={'50px'}
        backgroundColor={'#191B1F'}
        justifyContent= {'center'}
        alignItems= {'center'}
        zIndex={1}
        display={{base: 'flex', md: 'none'}}
      >
        <Collapse 
          in={isOpen} 
          animateOpacity
        >
          <Stack padding={3}>
            <Button textColor="white" colorScheme={'blackAlpha'} borderRadius={40} size={'sm'} px={5} py={5}>
              <Link href="https://www.coingecko.com/">Charts</Link>
            </Button>
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
          </Stack>     
        </Collapse> 
      </Flex>
    </>
  );
}
 
export default Header; 