import type { NextPage } from 'next'
import {Flex, Box, Text} from '@chakra-ui/react'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TransactionContext } from '../context/TransactionContext'
import { useContext } from 'react';

const Home: NextPage = () => {  
  const {isLoading} = useContext(TransactionContext)  
  return (
    <>
      <Header/>
      <Flex direction={'column'} justifyContent={'center'}>
        <Main/>
        <Footer/>
      </Flex>
      {/* <Main/>
      <Footer/> */}
      <Flex w={'100%'}>
        <ToastContainer
          style={{width: "550px"}}
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Flex>
      {isLoading && 
        <Flex
          position={'absolute'}
          w={'100%'}
          h={'100%'}
          bgColor={'blackAlpha.800'}
        >
        </Flex>
      }
    </>
  )
}

export default Home
