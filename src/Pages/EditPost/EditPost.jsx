//STYLES
import styles from "./EditPost.module.css";

// HOOKS
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import {useUpdateDocument} from "../../Hooks/useUpdate"
import { useFetch } from "../../Hooks/useFetch";

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { document: posts } = useFetch("posts", id);

  const [titulo, setTitulo] = useState("");
  const [img, setImg] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formErro, setFormErro] = useState("");

  useEffect(() => {
    if (posts) {
      setBody(posts.body);
      setImg(posts.img);
      setTitulo(posts.titulo);

      const textTag = posts.tag.join(", ");
      setTag(textTag);
    }
  }, [posts]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErro("");

    //VALIDAR IMG URL

    //CRIAR UM ARRAY DE TAGS
    const tagsArray = tag.split(",").map((item) => item.trim().toLowerCase());

    if (formErro) return;

    const data = {titulo,
      img,
      body,
      tag: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }
    await updateDocument(id, data);

    //CHECAR TODOS OS VALORES

    //REDIRECT TO HOMEPAGE
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {posts && (
        <>
          <h2>Editar post: {posts.titulo} </h2>
          <p>Altere os dados do post como desejar</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Título: </span>
              <input
                type="text"
                name="title"
                required
                placeholder="Pense em um título"
                onChange={(e) => setTitulo(e.target.value)}
                value={titulo}
              />
            </label>

            <label>
              <span>URL da Imagem: </span>
              <input
                type="text"
                name="img"
                required
                placeholder="Insira uma Imagem"
                onChange={(e) => setImg(e.target.value)}
                value={img}
              />
            </label>

            <p className={styles.previewTitle}>Preview da imagem</p>
            <img className={styles.previewImg} src={posts.img} alt={posts.titulo}/>

            <label>
              <span>Conteúdo: </span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do Post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>

            <label>
              <span>Tags: </span>
              <input
                type="text"
                name="tag"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTag(e.target.value)}
                value={tag}
              />
            </label>

            {!response.loading && (
              <button className="btn" type="submit">
                Salvar
              </button>
            )}

            {response.loading && (
              <button className="btn" disabled type="submit">
                Aguarde...
              </button>
            )}

            {response.erro && <p className="error">{response.erro}</p>}
          </form>
        </>
      )}
    </div>
  );
}

export default EditPost;
