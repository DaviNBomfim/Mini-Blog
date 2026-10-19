import React from "react";

//Styles
import styles from "./Posts.module.css";

//hooks
import { useParams } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";

const Posts = () => {
  const { id } = useParams();
  const { document: post, error, loading } = useFetch("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {error && <p>{error}</p>}
      {post && (
        <>
          <h1>{post.titulo}</h1>
          <img src={post.img} alt={post.titulo} />
          <p>{post.body}</p>
          <h3>Este Post é sobre:</h3>
          <div className={styles.tag}>
            {post.tag.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
