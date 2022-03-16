import { useState, FormEvent } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Head from 'next/head';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi';
import { SupportButton } from '../../components/SupportButton';

import styles from './styles.module.scss';

interface BoardProps {
  user: {
    id: string;
    name: string;
  }
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = useState('');

  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    
    alert('TESTE')
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask}>
          <input 
            type="text"
            placeholder='Digite sua tarefa...'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit">
            <FiPlus 
              size={25}
              color='#17181f'
            />
          </button>
        </form>

        <h1>Você tem 2 tarefas!</h1>

        <section>
          <article className={styles.taskList}>
            <p>Aprender criar projetos usando Next JS e aplicando firebase como back.</p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#ffb800" />
                  <time>04 Fevereiro 2022</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#fff" />
                  <span>Editar</span>
                </button>
              </div>

              <button>
                <FiTrash size={20} color="#ff3636" />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto.</h3>
        <div>
          <FiClock size={28} color="#fff"/>
          <time>
            Última doação foi a 3 dias.
          </time>
        </div>
      </div>

      <SupportButton />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(!session?.id){
    // quando o usuario nao estiver logado direcionar para home
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  const user = {
    name: session?.user.name,
    id: session?.id
  }

  return {
    props: {
      user
    }
  }
}