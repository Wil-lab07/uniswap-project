import {Box, Flex, Text, Button, Img, HStack} from '@chakra-ui/react'
import {useState} from 'react'
import Link from 'next/link'

const Header = () => {
  const [selectedNav, setSelectedNav] = useState('swap')
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
            <Box colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={5} py={5} as={Button}>
              <Flex>Ethereum<Img ml={2} src={'/eth.png'} w={'20px'}/></Flex>
            </Box>
              <Button colorScheme={'blackAlpha'} textColor="white" borderRadius={40} size={'sm'} px={2} py={5}><Text p={2} borderRadius={40} bgColor="#172A42" textColor={'#4F90EA'}>Connect Wallet</Text></Button>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}
 
export default Header;