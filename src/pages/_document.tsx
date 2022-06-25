import Document, { Head, Html, Main, NextScript } from "next/document";
import { ColorModeScript } from '@chakra-ui/react'
import {theme} from '../styles/theme'
export default class myDocument extends Document {
  render() {
    return (
      <Html  lang="pt-BR">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,600&display=swap" rel="stylesheet" />
        </Head>
        <body >
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
