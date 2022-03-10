import { GetStaticProps } from 'next';
import Head from 'next/head';

import styles from '../styles/styles.module.scss';

export default function Home() {
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
          <img src='https://avatars.githubusercontent.com/u/77689659?v=4' alt='Usuario 1' />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    },
    revalidate: 60 * 60 // atauliza a cada 60 minutos
  }
}