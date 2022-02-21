import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {Box, Flex, Text, Button} from '@chakra-ui/react'
import Header from '../components/Header'

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#171c26] text-white select-none flex flex-col justify-between`,
}

const Home: NextPage = () => {  
  return (
    <div className={style.wrapper}>
      <Header/>
      <Text>Main</Text>
      <Text>Transaction History</Text>
    </div>
  )
}

export default Home
