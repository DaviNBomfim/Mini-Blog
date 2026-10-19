import styles from './Login.module.css'

//HOOKS
import { useAuthenticator } from '../../Hooks/useAuthenticator';
import { useState, useEffect } from 'react'

const Login = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const {login, error: authError, loading} = useAuthenticator();


  const handleSubmit = async (e) => {
    e.preventDefault()

    setErro("")

    const user = {
      email,
      senha,
    }

    const res = await login(user)
    console.log(res)
  }

  useEffect(() => {

    if(authError){
      setErro(authError)
    }
  }, [authError])



  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>Entre com seu usuário e senha</p>

      <form onSubmit={handleSubmit}>

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
          
          {!loading && <button className="btn" onClick={handleSubmit}>Entrar</button>}
          {loading && (<button className="btn" disabled onClick={handleSubmit}>Aguarde...</button>)}
          {erro && <p className="error">{erro}</p>}
      </form>
    </div>
  )
}

export default Login
