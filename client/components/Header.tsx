import {Box, Flex, Text, Button, Img, HStack, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2'
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

const Header = () => {
  const [selectedNav, setSelectedNav] = useState('swap')
  const [userName, setUserName] = useState('')
  const [currentAccount, setCurrentAccount] = useState(false)
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  
  useEffect(()=>{
    try{
      activateBrowserWallet();  
      // setCurrentAccount(account[0])
      // setUserName(account[0])
    }catch(err){
      console.error(err)
    }
  }, []) 

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
      } else{
        // const account = await window.ethereum.request({method: 'eth_requestAccounts'})
        // setCurrentAccount(account[0])
        // setUserName(account[0])
        await activateBrowserWallet();
      } 
    }catch(err){
      console.error(err)
    }
  }

  return (
    <>
      <Flex py={2} px={4} bgColor="#191B1F" align={'center'} justify={'space-between'}>
        <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}} align="center">
          {/* <Img src={'/uniswap.png'} w={'50px'} h={'50px'}/> */}
          <Text>SENDS</Text>
        </Flex>
        <Flex flex={{base: 1}} justify={'center'} display={{base: 'none', md: 'inline-flex'}} align="center">
          <HStack spacing={3} bgColor="blackAlpha.200" borderRadius={40}>
            {/* <Button colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5}>Swap</Button> */}
            {/* <Button colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5}>Pool</Button>
            <Button colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5}>Vote</Button> */}
            <Link href="https://www.coingecko.com/"><Button colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5}>Charts</Button></Link>
          </HStack>
        </Flex>
        <Flex flex={{base: 1}} justify={'center'} display={{base: 'none', md: 'inline-flex'}} align='center'>
          <HStack spacing={3}>
            <Menu>
              <MenuButton colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5} as={Button} rightIcon={<ChevronDownIcon />}>
                {account ? 
                <Flex>{etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)}<Img ml={2} src={'/eth.png'} w={'20px'}/></Flex>
                :
                <Flex>Ethereum<Img ml={2} src={'/eth.png'} w={'20px'}/></Flex>
                }
              </MenuButton>
            </Menu>
            {account || currentAccount ? 
              <Button colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5}>{account}</Button>
            :
              <Button onClick={connectWallet} colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={2} py={5}><Text p={2} borderRadius={40} bgColor="#172A42" textColor={'#4F90EA'}>Connect Wallet</Text></Button>
            }
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}
 
export default Header;