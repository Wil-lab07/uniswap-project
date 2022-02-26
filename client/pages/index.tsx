import type { NextPage } from 'next'
import {Flex} from '@chakra-ui/react'
import Header from '../components/Header'
import Main from '../components/Main'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TransactionContext } from '../context/TransactionContext'
import { useContext } from 'react';

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#171c26] text-white select-none flex flex-col justify-between`,
}

const Home: NextPage = () => {  
  const {isLoading} = useContext(TransactionContext)  
  return (
    <div className={style.wrapper}>
      <Header/>
      <Main/>
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
    </div>
  )
}

export default Home
