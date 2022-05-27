import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { PayPalButtons } from '@paypal/react-paypal-js';

import styles from "./styles.module.scss";

// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface DonateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  }
}

export default function Donate({ user }: DonateProps) {
  return (
    <>
      <Head>
        <title>Ajude a plataforma board ficar online!</title>
      </Head>
      <main className={styles.container}>
        <img src="/images/rocket.svg" alt="Seja Apoiador" />

        <div className={styles.vip}>
          <img src={user.image} alt="Foto de perfil do usuario apoiador" />
          <span>Parabéns você é um novo apoiador!</span>
        </div>

        <h1>Seja um apoiador desete projeto</h1>
        <h3>Contribua com apenas <span>R$ 1,00</span></h3>
        <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>

        <PayPalButtons 
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '1'
                }
              }]
            })
          }}

          onApprove = {(data, actions) => {
            return actions.order.capture().then(function(details) {
              console.log('Compra aprovada: ' + details.payer.name.given_name);
            })
          }}
        />

      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if(!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const user = {
    nome: session?.user.name,
    id: session?.id,
    image: session?.user.image
  }

  return {
    props: {
      user
    }
  }
}