import { SessionProvider as NextAuthProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

const initialOptions = {
  "client-id": "Abjs6rJayJMIL1mV41JnQ4NHIhK4tkjgKc1Wfihs5bEHY646EWM8D5Ufb9CB8jGSs0QwvkmevGYdMIve",
  currency: "BRL",
  intent: "capture"
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp
