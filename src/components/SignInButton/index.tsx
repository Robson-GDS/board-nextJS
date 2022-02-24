import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss'

export function SignInButton() {
  const session = false;

  return session ? (
    <button
      type='button'
      className={styles.signInButton}
      onClick={() => {}}
    >
      <img src='https://avatars.githubusercontent.com/u/77689659?v=4' alt='avatar' />
      Olá Robson
      <FiX 
        color='#737380'
        className={styles.closeIcon} 
      />
    </button>
  ) : (
    <button
      type='button'
      className={styles.signInButton}
      onClick={() => {}}
    >
      <FaGithub 
        color='#ffb800'
      />
      Entrar com github
    </button>
  )
}