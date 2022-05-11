import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { format } from "date-fns";
import { FiCalendar } from 'react-icons/fi';

import firebase from "../../services/firebaseConnection";

import styles from './task.module.scss';

type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string;
}

interface TaskListProps {
  data: string;
}

export default function Task({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task;

  return (
    <>
      <Head>
        <title>Detalhes da sua tarefa</title>
      </Head>
      <article>
        <div>
          <div>
            <FiCalendar size={30} color="#fff" />
            <span>Tarefa criada:</span>
            <time>{task.createdFormated}</time>
          </div>
        </div>
        <p>{task.tarefa}</p>
      </article>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { id } = params;
  const session = await getSession({ req });

  if(!session?.id){
    return {
      redirect:{
        destination: '/board',
        permanent: false,
      }
    }
  }

  const data = await firebase.firestore().collection('tarefas')
  .doc(String(id))
  .get()
  .then((snapshot) => {
    const data = {
      id: snapshot.id,
      created: snapshot.data().created,
      createdFormated: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
      tarefa: snapshot.data().tarefa,
      userId: snapshot.data().userId,
      nome: snapshot.data().nome
    }

    return JSON.stringify(data);
  })

  return {
    props: {
      data
    }
  }
}