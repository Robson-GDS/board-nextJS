import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';

import Head from 'next/head';
import { SupportButton } from '../../components/SupportButton';
import firebase from '../../services/firebaseConnection';

import styles from './styles.module.scss';

interface TaskList {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userID: string;
  nome: string; 
}

interface BoardProps {
  user: {
    id: string;
    name: string;
  }
  data: string;
}

export default function Board({ user, data }: BoardProps) {
  const [input, setInput] = useState('');
  const [tasklist, setTasklist] = useState<TaskList[]>(JSON.parse(data));

  async function handleAddTask(event: FormEvent) {
    event.preventDefault();

    if(input === '') {
      alert("Preencha alguma tarefa!")
      return;
    }

    await firebase.firestore().collection('tarefas')
    .add({
      created: new Date(),
      tarefa: input,
      userId: user.id,
      name: user.name
    })
    .then((doc) => {
      console.log("Cadastrado Com Sucesso!");
      let data = {
        id: doc.id,
        created: new Date(),
        createdFormated: format(new Date(), 'dd MMMM yyyy'),
        tarefa: input,
        userId: user.id,
        name: user.name
      };

      setTasklist([...tasklist, data]);
      setInput('');

    })
    .catch((err) => {
      console.log("Erro ao cadastrar: ",err)
    })
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

        <h1>Você tem {tasklist.length} tarefas!</h1>

        <section>
          {tasklist.map( task => (
            <article className={styles.taskList}>
              <Link href={`/board/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#ffb800" />
                    <time>{task.createdFormated}</time>
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
          ))}
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

  const tasks = await firebase.firestore().collection('tarefas')
    .where('userId', '==', session?.id)
    .orderBy('created', 'asc').get();

  const data = JSON.stringify(tasks.docs.map( u => {
    return {
      id: u.id,
      createdFormated: format(u.data().created.toDate(), 'dd MMMM yyyy'),
      ...u.data(),
    }
  }))

  const user = {
    name: session?.user.name,
    id: session?.id
  }

  return {
    props: {
      user,
      data
    }
  }
}