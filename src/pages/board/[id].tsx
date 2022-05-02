import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";

export default function Task() {
  return (
    <div>
      <h1>Pagina detalhes</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(!session?.id){
    return {
      redirect:{
        destination: '/board',
        permanent: false,
      }
    }
  }

  return {
    props: {

    }
  }
}