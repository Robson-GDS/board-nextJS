import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import styles from "./styles.module.scss";

export default function Donate() {
  return (
    <>
      <Head>
        <title>Ajude a plataforma board ficar online!</title>
      </Head>
      <main className={styles.container}>
        <img src="/images/rocket.svg" alt="Seja Apoiador" />

        <div className={styles.vip}>
          <img src="https://avatars.githubusercontent.com/u/77689659?v=4" alt="" />
          <span>Parabéns você é um novo apoiador!</span>
        </div>

        <h1>Seja um apoiador desete projeto</h1>
        <h3>Contribua com apenas <span>R$ 1,00</span></h3>
        <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>
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

  return {
    props: {

    }
  }
}