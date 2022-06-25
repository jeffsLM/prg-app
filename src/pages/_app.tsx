import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import Head from 'next/head'
import { ChakraProvider, Box,ColorModeScript } from '@chakra-ui/react';
import { Footer } from '../components/Footer'

import { AuthProvider } from '../contexts/AuthContext'

import { theme } from '../styles/theme';

import "swiper/css";
import "swiper/css/pagination"
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}  >
      <AuthProvider>
        <Head>
          <title>
            PRG | Table Master
          </title>
          <link rel="shortcut icon" href="/images/iconPage.png" type="image/png" />
        </Head>
        <ToastContainer theme="dark" />
        <ColorModeScript initialColorMode="light" />
          <Component {...pageProps} />
        
      </AuthProvider>
    </ChakraProvider>)
}

export default MyApp
