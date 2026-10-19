//CSS
import styles from './About.module.css'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Sobre o <span>MiniBlog</span></h1>
      <p>O MiniBlog é um projeto desenvolvido 
        com o objetivo de criar uma plataforma de blog simples e
        funcional, permitindo que os usuários compartilhem suas ideias, 
        pensamentos e experiências com o mundo. A aplicação foi construída 
        utilizando tecnologias modernas, como React para a interface do usuário e 
        Firebase para autenticação e armazenamento de dados.</p>

        <Link to="/Posts/Create" className="btn">Criar Poste</Link>
    </div>
  )
}

export default About
