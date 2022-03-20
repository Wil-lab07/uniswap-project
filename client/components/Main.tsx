import {Box, Flex, Text, Button, Img, HStack, Stack, InputGroup, Input, Select} from '@chakra-ui/react'
import { useContext } from 'react'
import {useForm} from 'react-hook-form'
import { TransactionContext } from '../context/TransactionContext'

const Main = () => {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const {sendTransaction} = useContext(TransactionContext)  
  return (
    <Flex justify={'center'} align={'center'} border='solid' pt={10} pb={10}>
      <Flex
        borderRadius={30}
        bgColor="#191B1F"
        w="30rem"
        py={4}
        pb={8}
        px={6}
        direction={'column'}
      >
        <Stack spacing={5}>
          <Flex flex={{base: 1}} justify={'space-between'} align={'center'}>
            <Text>Sending Currency</Text>
          </Flex>
          <form onSubmit={handleSubmit(sendTransaction)} autoComplete="off">
            <Stack spacing={5}>
              <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                <InputGroup>
                  <Input {...register('amount', {required: true})} textColor="#B2B9D2" type="number" border={'none'} step={'any'} focusBorderColor={'none'} placeholder="Amount (ETH)" min={0}></Input>
                </InputGroup>
                <Flex align={'center'} bgColor="#2D2F36" borderRadius={20} justify='space-around' w={'80px'}>
                  <Img src="/eth.png" boxSize='15px'/> 
                  <Text>ETH</Text>       
                </Flex>
              </Flex>
              <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                <InputGroup>
                  <Input {...register('addressTo', {required: true})} textColor="#B2B9D2" type="text" border={'none'} focusBorderColor={'none'} placeholder="Address To"></Input>
                </InputGroup>
              </Flex>
              <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                <InputGroup>
                  <Input {...register('message')} textColor="#B2B9D2" type="text" border={'none'} focusBorderColor={'none'} placeholder={'Enter Message'}></Input>
                </InputGroup>
              </Flex>
              <Button colorScheme={'blue'} type="submit" borderRadius={20}>Confirm</Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Flex>
  );
}
 
export default Main;