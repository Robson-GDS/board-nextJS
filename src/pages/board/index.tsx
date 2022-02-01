import Head from 'next/head';
import { FiPlus } from 'react-icons/fi';

import styles from './styles.module.scss';

export default function Board() {
  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        <form>
          <input 
            type="text"
            placeholder='Digite sua tarefa...'
          />
          <button type="submit">
            <FiPlus 
              size={25}
              color='#17181f'
            />
          </button>
        </form>
      </main>
    </>
  )
}