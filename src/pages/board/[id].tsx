import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { format } from "date-fns";

import firebase from "../../services/firebaseConnection";

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
  return (
    <div>
      <h1>Pagina detalhes</h1>
    </div>
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
      createdFormated: format(snapshot.data().created.toDate, 'dd MMMM yyyy'),
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