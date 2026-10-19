//STYLES
import styles from './CreatePost.module.css'

// HOOKS
import { useState } from 'react'
import { useNavigate} from "react-router-dom"
import { useAuthValue} from "../../Context/AuthContext"
import {useInsertDocument} from "../../Hooks/useInsertDocument"

function CreatePost() {
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("");
  const [img, setImg] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formErro, setFormErro] = useState("");

  const {user} = useAuthValue()

  const { insertDocument, response } = useInsertDocument("posts")

  const handleSubmit = async(e) => {
    e.preventDefault()
    setFormErro("")

    //VALIDAR IMG URL

    //CRIAR UM ARRAY DE TAGS
    const tagsArray = tag.split(',').map(item => item.trim().toLowerCase());

    if(formErro) return;

    await insertDocument({
      titulo,
      img,
      body,
      tag: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //CHECAR TODOS OS VALORES

    //REDIRECT TO HOMEPAGE
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título: </span>
          <input type="text"
          name='title'
          required
          placeholder='Pense em um título'
          onChange={(e) => setTitulo(e.target.value)} 
          value = {titulo}/>
        </label>

        <label>
          <span>URL da Imagem: </span>
          <input type="text"
          name='img'
          required
          placeholder='Insira uma Imagem'
          onChange={(e) => setImg(e.target.value)} 
          value = {img}/>
        </label>

        <label>
          <span>Conteúdo: </span>
          <textarea
          name='body'
          required
          placeholder='Insira o conteúdo do Post'
          onChange={(e) => setBody(e.target.value)} 
          value = {body}/>
        </label>

        <label>
          <span>Tags: </span>
          <input type="text"
          name='tag'
          required
          placeholder='Insira as tags separadas por vírgula'
          onChange={(e) => setTag(e.target.value)}  
          value = {tag}/>
        </label>

        {!response.loading && <button className="btn" type="submit">Enviar</button>}

        {response.loading && (<button className="btn" disabled type="submit">Aguarde...</button>)}

        {response.erro && <p className="error">{response.erro}</p>}


      </form>
    </div>
  )
}

export default CreatePost
