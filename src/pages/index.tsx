import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import firebase from '../services/firebaseConnection';

import styles from '../styles/styles.module.scss';

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
}

interface HomeProps {
  data: string;
}

export default function Home({ data }: HomeProps) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data))

  return (
    <>
      <Head>
        <title>Board - Organizando sua tarefas.</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src='/images/board-user.svg' alt='Ferramenta board' />

        <section className={styles.callToAction}>
          <h1>Uma ferramenta para seu dia a dia Escreva, planeje e organize-se...</h1>
          <p>
            <span>100% Gratuita </span>
            e online.
          </p>
        </section>

        <div className={styles.donaters}>
          {donaters.map(item => (
            <img key={item.image} src={item.image} alt='Usuario Doador' />
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const donaters = await firebase.firestore().collection('users').get();

  const data = JSON.stringify(donaters.docs.map(item => {
    return {
      id: item.id,
      ...item.data(),
    }
  }))

  return {
    props: {
      data
    },
    revalidate: 60 * 60 // atauliza a cada 60 minutos
  }
}