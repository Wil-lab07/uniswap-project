import {Box, Flex, Text, Button, Img, HStack, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@chakra-ui/icons'
const Header = () => {
  const [selectedNav, setSelectedNav] = useState('swap')
  const [userName, setUserName] = useState('')
  const [currentAccount, setCurrentAccount] = useState(false)
  
  
  
  return (
    <>
      <Flex py={2} px={4} bgColor="blackAlpha.400" align={'center'} justify={'space-between'}>
        <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}} align="center">
          <Img src={'/uniswap.png'} w={'50px'} h={'50px'}/>
        </Flex>
        <Flex flex={{base: 1}} justify={'center'} display={{base: 'none', md: 'inline-flex'}} align="center">
          <HStack spacing={3} bgColor="blackAlpha.200" borderRadius={40}>
            <Button borderRadius={40} size={'sm'} px={5} py={5}>Swap</Button>
            <Button borderRadius={40} size={'sm'} px={5} py={5}>Pool</Button>
            <Button borderRadius={40} size={'sm'} px={5} py={5}>Vote</Button>
            <Link href="https://info.uniswap.org/#/"><Button borderRadius={40} size={'sm'} px={5} py={5}>Charts</Button></Link>
          </HStack>
        </Flex>
        <Flex flex={{base: 1}} justify={'center'} display={{base: 'none', md: 'inline-flex'}} align='center'>
          <HStack spacing={3}>
            <Menu>
              <MenuButton borderRadius={40} size={'sm'} px={5} py={5} as={Button} rightIcon={<ChevronDownIcon />}>
                <Flex>Ethereum <Img ml={2} src={'/eth.png'} w={'20px'}/></Flex>
              </MenuButton>
            </Menu>
            {currentAccount ? 
              <Button borderRadius={40} size={'sm'} px={5} py={5}>{userName}</Button>
            :
              <Button borderRadius={10} size={'sm'} px={2} py={5}><Text p={2} borderRadius={10} bgColor="#172A42" textColor={'#4F90EA'}>Connect Wallet</Text></Button>
            }
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}
 
export default Header;