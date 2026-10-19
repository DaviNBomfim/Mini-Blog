
import styles from './Register.module.css'

//HOOKS
import { useState, useEffect } from 'react'
import { useAuthenticator } from '../../Hooks/useAuthenticator';

const Register = () => {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirm, setConfirm] = useState("");
  const [erro, setErro] = useState("");

  const {createUser, error: authError, loading} = useAuthenticator();


  const handleSubmit = async (e) => {
    e.preventDefault()

    setErro("")

    const user = {
      nome,
      email,
      senha,
    }


    if(senha !== confirm) {
      setErro("As senhas não coincidem!")

      return
    } 

    const res = await createUser(user)
    console.log(res)
  }

  useEffect(() => {

    if(authError){
      setErro(authError)
    }
  }, [authError])


  return (
    <div className={styles.register}>
      <h1>Cadastra-se</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>

      <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input 
             type="text"
             name="nome"
             required
             placeholder="Digite seu nome"
             value={nome}
             onChange={(e) => setNome(e.target.value)} />
          </label>

          <label>
            <span>Email:</span>
            <input 
             type="email"
             name="email"
             required
             placeholder="Digite seu email" 
             value={email}
             onChange={(e) => setEmail(e.target.value)}/>
          </label>

          <label>
            <span>Senha:</span>
            <input 
             type="password"
             name="password"
             required
             placeholder="Digite sua senha" 
             value={senha}
             onChange={(e) => setSenha(e.target.value)}/>
          </label>

          <label>
            <span>Confirme a Senha:</span>
            <input 
             type="password"
             name="confirmPassword"
             required
             placeholder="Confirme sua senha"
             value={confirm}
             onChange={(e) => setConfirm(e.target.value)} />
          </label>
          
          {!loading && <button className="btn" onClick={handleSubmit}>Cadastrar</button>}
          {loading && (<button className="btn" disabled onClick={handleSubmit}>Aguarde...</button>)}
          {erro && <p className="error">{erro}</p>} 
      </form> 
    </div>
  )
}

export default Register
