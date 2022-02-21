import { useEffect, useState } from 'react'
import {Box, Flex, Text, Button, Img, HStack, Stack, InputGroup, Input, Select} from '@chakra-ui/react'
import {SettingsIcon} from '@chakra-ui/icons'
const Main = () => {
  return (
    <Flex justify={'center'} align={'center'}>
      <Flex
        borderRadius={30}
        bgColor="#191B1F"
        w="40rem"
        py={4}
        pb={8}
        px={6}
        direction={'column'}
      >
        <Stack spacing={5}>
          <Flex flex={{base: 1}} justify={'space-between'} align={'center'}>
            <Text>Swap</Text>
            {/* <SettingsIcon/> */}
          </Flex>
          <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
            <InputGroup>
              <Input textColor="#B2B9D2" type="number" border={'none'} focusBorderColor={'none'} min={0}></Input>
            </InputGroup>
            <Flex align={'center'} bgColor="#2D2F36" borderRadius={20} justify='space-around' w={'80px'}>
              <Img src="/eth.png" boxSize='15px'/> 
              <Text>ETH</Text>       
            </Flex>
          </Flex>
          <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
            <InputGroup>
              <Input textColor="#B2B9D2" type="text" border={'none'} focusBorderColor={'none'} min={0} placeholder="0x......"></Input>
            </InputGroup>
          </Flex>
          <Button colorScheme={'blue'} borderRadius={20}>Confirm</Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
 
export default Main;