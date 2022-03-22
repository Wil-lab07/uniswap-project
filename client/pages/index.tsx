import type { NextPage } from 'next'
import {Flex} from '@chakra-ui/react'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home: NextPage = () => {  
  return (
    <>
      <Header/>
      <Flex direction={'column'} justifyContent={'center'}>
        <Main/>
        <Footer/>
      </Flex>
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
    </>
  )
}

export default Home
